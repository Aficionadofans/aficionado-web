'use client'

import MuxPlayer from '@mux/mux-player-react'
import { Pause, Play, Video, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { Card, CardContent } from '@/shared/ui/core/card'

export interface CreatorSpotlightData {
  id: string
  role: string
  description: string
  gradient: string
  color: string
  video_url: string
}

interface CreatorSpotlightProps {
  spotlights: CreatorSpotlightData[]
}

/**
 * Extracts the Mux playback ID from a Mux stream URL.
 * e.g. "https://stream.mux.com/VZtzUzOWRow00ggfda02302.m3u8" → "VZtzUzOWRow00ggfda02302"
 * Returns null if the URL is not a recognizable Mux stream URL.
 */
function extractMuxPlaybackId(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'stream.mux.com') {
      // pathname is like /VZtzUzOWRow00ggfda02302.m3u8
      const segments = parsed.pathname.split('/')
      const last = segments[segments.length - 1]
      if (last) {
        return last.replace(/\.m3u8$/, '')
      }
    }
  } catch {
    // not a valid URL
  }
  return null
}

export function CreatorSpotlight({ spotlights }: CreatorSpotlightProps) {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const muxPlayerRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const togglePlay = useCallback(
    (id: string) => {
      const player = muxPlayerRefs.current[id] as
        | (HTMLElement & { play?: () => void; pause?: () => void })
        | null
      if (!player) return

      if (playingId === id) {
        player.pause?.()
        setPlayingId(null)
      } else {
        // Pause the previously playing spotlight
        if (playingId && muxPlayerRefs.current[playingId]) {
          const prev = muxPlayerRefs.current[playingId] as HTMLElement & { pause?: () => void }
          prev?.pause?.()
        }
        player.play?.()
        setPlayingId(id)
      }
    },
    [playingId],
  )

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  if (!spotlights || spotlights.length === 0) return null

  return (
    <section aria-label="Creator Spotlight Videos" className="glass-panel rounded-2xl p-4 -mx-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#100F17] border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,200,0.25)]">
          <Video className="w-5 h-5 text-primary" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            03 / CREATOR SPOTLIGHT
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Aficionado Spotlight
          </h2>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
        {spotlights.map((spotlight, index) => {
          const isPlaying = playingId === spotlight.id
          const muxPlaybackId = extractMuxPlaybackId(spotlight.video_url)

          return (
            <Card
              key={spotlight.id}
              onClick={() => togglePlay(spotlight.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  togglePlay(spotlight.id)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Play spotlight for ${spotlight.role}`}
              className={`min-w-[240px] w-[240px] aspect-[9/16] shrink-0 snap-center clipcut-card-hover border-white/10 overflow-hidden relative cursor-pointer animate-fade-in-up transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                isPlaying
                  ? 'ring-2 ring-primary shadow-[0_0_25px_rgba(0,212,200,0.5)] scale-[1.02]'
                  : ''
              }`}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              {/* Use MuxPlayer for Mux HLS URLs (cross-browser), fall back to <video> for others */}
              {muxPlaybackId ? (
                <MuxPlayer
                  ref={(el: HTMLElement | null) => {
                    if (el) muxPlayerRefs.current[spotlight.id] = el
                  }}
                  playbackId={muxPlaybackId}
                  loop
                  muted={isMuted}
                  autoPlay={false}
                  style={
                    {
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: isPlaying ? 1 : 0,
                      transition: 'opacity 500ms',
                      '--controls': 'none',
                      '--media-object-fit': 'cover',
                    } as React.CSSProperties & Record<`--${string}`, string>
                  }
                />
              ) : (
                <video
                  ref={(el) => {
                    if (el) muxPlayerRefs.current[spotlight.id] = el
                  }}
                  src={spotlight.video_url}
                  loop
                  playsInline
                  muted={isMuted}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                />
              )}

              {!isPlaying && (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${spotlight.gradient} mix-blend-overlay`}
                />
              )}

              {/* Dark overlay for readability */}
              <div
                className={`absolute inset-0 transition-colors duration-300 ${isPlaying ? 'bg-black/30' : 'bg-black/55'}`}
              />

              <CardContent className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  {isPlaying && (
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors shadow-md"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  )}
                  <div
                    className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${
                      isPlaying
                        ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(0,212,200,0.6)]'
                        : 'bg-black/60 text-white border-white/20 shadow-lg group-hover:scale-110'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5 fill-white" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-sm border border-white/10 ${spotlight.color}`}
                  >
                    {spotlight.role}
                  </span>
                  <p className="text-sm font-semibold text-white line-clamp-3 leading-snug text-pretty drop-shadow-md">
                    {spotlight.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
