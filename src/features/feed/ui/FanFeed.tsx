'use client'

import React, { useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import { Star, Lock, Clock, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { DropZoneCarousel, type Drop } from './DropZoneCarousel'
import { TipModal } from '@/features/monetization/ui/TipModal'
import { VideoOverlayActions } from './VideoOverlayActions'
import { Avatar, Button, Badge } from '@/shared/ui/core'

export interface Video {
  id: string
  creator: string
  description: string
  playbackId: string
  likes: string
  comments: string
  isSubscribed: boolean
  unlocksAt?: string
  moderationStatus?: string
}

export function FanFeed({ videos, drops }: { videos: Video[]; drops: Drop[] }) {
  const [activeVideo, setActiveVideo] = useState(0)
  const [tipModalCreator, setTipModalCreator] = useState<string | null>(null)
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})
  const [subscribedMap, setSubscribedMap] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const index = Math.round(container.scrollTop / container.clientHeight)
    if (index !== activeVideo) setActiveVideo(index)
  }

  const toggleLike = (id: string) => setLikedMap(prev => ({ ...prev, [id]: !prev[id] }))
  const toggleSubscribe = (creator: string) => setSubscribedMap(prev => ({ ...prev, [creator]: !prev[creator] }))

  const handleShare = async (id: string, creator: string) => {
    const shareUrl = `${window.location.origin}/content/${id}`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: `@${creator} on Aficionado`, url: shareUrl })
        return
      } catch {
        // fallback below
      }
    }
    navigator.clipboard?.writeText?.(shareUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="h-dvh w-full max-w-md mx-auto relative bg-background overflow-hidden">
      {/* Drop Zone carousel overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/85 to-transparent">
        <DropZoneCarousel drops={drops} />
      </div>

      {/* Full-screen snap scroll feed */}
      <div
        className="h-dvh w-full snap-y snap-mandatory overflow-y-scroll hide-scrollbar"
        onScroll={handleScroll}
      >
        {videos.map((video, idx) => {
          const isLocked = video.unlocksAt && new Date(video.unlocksAt) > new Date()
          const unlockDateString = video.unlocksAt
            ? new Date(video.unlocksAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
            : ''
          const isNsfw = video.moderationStatus === 'rejected'
          const isLiked = likedMap[video.id]
          const isSubscribed = video.isSubscribed || subscribedMap[video.creator]
          const autoPlayVideo = !isLocked && !isNsfw && idx === activeVideo

          return (
            <div
              key={video.id}
              className="h-dvh w-full snap-start relative bg-background flex justify-center items-center overflow-hidden"
            >
              {isNsfw ? (
                /* ── Content Removed ── */
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/25 flex items-center justify-center mb-5">
                    <EyeOff className="w-8 h-8 text-destructive" />
                  </div>
                  <h3
                    className="text-xl font-bold text-foreground mb-2"
                    style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
                  >
                    Content Removed
                  </h3>
                  <p className="text-destructive/70 text-sm max-w-[75%] text-pretty">
                    Removed for violating our Community Guidelines.
                  </p>
                </div>
              ) : (
                <>
                  {/* ── Video player ── */}
                  <div className={`absolute inset-0 transition-all duration-700 ${isLocked ? 'blur-[40px] scale-125 opacity-40' : ''}`}>
                    <MuxPlayer
                      playbackId={video.playbackId}
                      className="h-full w-full object-cover pointer-events-none"
                      loop
                      muted={false}
                      autoPlay={autoPlayVideo ? 'any' : false}
                      streamType="on-demand"
                      style={{ '--controls': 'none' } as Record<string, string>}
                    />
                  </div>

                  {/* ── Time Capsule overlay ── */}
                  {isLocked && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
                      {/* Indigo glow (kept — distinct from brand/monetization) */}
                      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-indigo-500/20 rounded-full blur-[80px] animate-breathe-calm pointer-events-none" />

                      <div
                        className="relative z-10 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5"
                        style={{
                          background: 'rgba(99,102,241,0.12)',
                          border: '1px solid rgba(99,102,241,0.4)',
                          boxShadow: '0 0 32px rgba(99,102,241,0.2)',
                        }}
                      >
                        <Lock className="w-8 h-8 text-indigo-400" style={{ filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.7))' }} />
                      </div>

                      <h3
                        className="relative z-10 text-2xl font-bold text-white mb-1.5"
                        style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
                      >
                        Time Capsule
                      </h3>
                      <p className="relative z-10 text-indigo-200/70 text-sm mb-7 max-w-[75%] text-pretty">
                        This exclusive drop is sealed and waiting.
                      </p>

                      <div
                        className="relative z-10 flex items-center gap-4 px-5 py-4 rounded-2xl mb-7"
                        style={{
                          background: 'rgba(99,102,241,0.1)',
                          border: '1px solid rgba(99,102,241,0.25)',
                          backdropFilter: 'blur(16px)',
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-500/15 flex items-center justify-center border border-indigo-500/25">
                          <Clock className="w-5 h-5 text-indigo-400 animate-pulse" />
                        </div>
                        <div className="text-left">
                          <div className="text-[10px] text-indigo-200/60 font-semibold uppercase tracking-widest mb-0.5">Unlocks On</div>
                          <div className="text-base font-bold text-white">{unlockDateString}</div>
                        </div>
                      </div>

                      <button
                        className="relative z-10 px-7 py-3 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{
                          background: 'rgba(99,102,241,0.9)',
                          boxShadow: '0 0 20px rgba(99,102,241,0.35)',
                        }}
                      >
                        Set Reminder
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Gradient vignette — subtle bottom fade */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/80" />

              {/* Right action column */}
              <VideoOverlayActions
                videoId={video.id}
                creator={video.creator}
                likes={video.likes}
                comments={video.comments}
                isLiked={isLiked}
                copiedId={copiedId}
                onToggleLike={toggleLike}
                onOpenTipModal={setTipModalCreator}
                onShare={handleShare}
              />

              {/* Bottom-left creator info — glass-panel overlay */}
              <div
                key={video.id}
                className="absolute left-4 bottom-22 max-w-[72%] z-10 pointer-events-auto animate-fade-in-up"
                style={{ animationDuration: '150ms', animationFillMode: 'both' }}
              >
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Avatar
                      src=""
                      alt={video.creator}
                      name={video.creator}
                      size="sm"
                      className="shimmer"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/${video.creator}`}>
                          <span className="font-extrabold text-sm text-white tracking-tight hover:text-primary transition-colors">
                            @{video.creator}
                          </span>
                        </Link>
                        <Badge variant="default" className="text-[9px] py-0 px-1.5">
                          ClipCut
                        </Badge>
                      </div>
                      <span className="text-[10px] text-primary font-semibold">1.2M Views</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/90 line-clamp-2 leading-relaxed tracking-tight">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {tipModalCreator && (
        <TipModal creatorId={tipModalCreator} onClose={() => setTipModalCreator(null)} />
      )}
    </div>
  )
}
