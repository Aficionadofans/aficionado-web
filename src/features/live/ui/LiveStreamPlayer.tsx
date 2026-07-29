'use client'

import React, { useState } from 'react'
import { Users, X, Star, Settings, Copy, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import MuxPlayer from '@mux/mux-player-react'
import { createClient } from '@/shared/lib/supabase/client'

interface LiveStreamPlayerProps {
  username: string
  playbackId?: string
  isOwner?: boolean
  viewerCount?: number
}

export function LiveStreamPlayer({ username, playbackId, isOwner, viewerCount = 1204 }: LiveStreamPlayerProps) {
  const [reactions, setReactions] = useState<{ id: string; emoji: string; left: number }[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [streamData, setStreamData] = useState<{ rtmpUrl: string; streamKey: string } | null>(null)
  const [isProvisioning, setIsProvisioning] = useState(false)
  const [copied, setCopied] = useState(false)

  const supabase = createClient()

  const triggerReaction = (emoji: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    const left = Math.floor(Math.random() * 25) + 70 // 70% to 95%
    setReactions(prev => [...prev.slice(-15), { id, emoji, left }])
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id))
    }, 2000)
  }

  const handleProvisionStream = async () => {
    setIsProvisioning(true)
    try {
      const { data, error } = await supabase.functions.invoke('mux_live_provision', { method: 'POST' })
      if (error) throw error
      setStreamData(data)
    } catch (err) {
      console.error(err)
      alert('Could not provision stream')
    } finally {
      setIsProvisioning(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col h-[55vh] md:h-full relative overflow-hidden bg-background">
      {/* Stream Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/40 to-transparent">
        <div className="flex items-center gap-4">
          <Link
            href={`/${username}`}
            className="w-10 h-10 rounded-full liquid-glass-hover flex items-center justify-center text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Back to creator profile"
          >
            <X className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-breathe-calm shadow-[0_0_12px_rgba(0,212,200,0.9)]" />
              <h1 className="text-off-white font-black drop-shadow-md tracking-tight text-sm sm:text-base flex items-center gap-2">
                <span>LIVE: @{username}&apos;s Watch Party</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-bold text-primary uppercase tracking-widest">
                  LIVE
                </span>
              </h1>
            </div>
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase mt-0.5 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> VIP Event
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isOwner && (
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Settings className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white uppercase">Stream Setup</span>
            </button>
          )}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-primary/30 shadow-[0_0_15px_rgba(0,212,200,0.2)]">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-black text-off-white tracking-wide">{viewerCount.toLocaleString()} Viewers</span>
          </div>
        </div>
      </div>

      {/* Stream Setup Modal (Owner Only) */}
      {isOwner && showSettings && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-surface border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-4">Live Stream Setup</h2>
            <p className="text-sm text-muted-foreground mb-6">Use these details in OBS or your streaming software to go live.</p>
            
            {streamData ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">RTMP URL</label>
                  <div className="flex items-center justify-between bg-black/50 border border-white/10 rounded-lg p-3">
                    <code className="text-sm text-primary truncate max-w-[250px]">{streamData.rtmpUrl}</code>
                    <button onClick={() => handleCopy(streamData.rtmpUrl)} className="text-muted-foreground hover:text-white ml-2">
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Stream Key</label>
                  <div className="flex items-center justify-between bg-black/50 border border-white/10 rounded-lg p-3">
                    <code className="text-sm text-amber-400 font-mono tracking-wider truncate max-w-[250px]">{streamData.streamKey}</code>
                    <button onClick={() => handleCopy(streamData.streamKey)} className="text-muted-foreground hover:text-white ml-2">
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-amber-500 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    <strong>Important:</strong> Keep your stream key secret. When you start streaming, your followers will automatically be notified.
                  </p>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleProvisionStream}
                disabled={isProvisioning}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {isProvisioning ? 'Provisioning...' : 'Generate Stream Key'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Video Player Shell */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm flex items-center justify-center relative border-r border-white/5 overflow-hidden">
        {playbackId ? (
          <MuxPlayer
            streamType="live"
            playbackId={playbackId}
            envKey={process.env.NEXT_PUBLIC_MUX_ENV_KEY}
            style={{ width: '100%', height: '100%' }}
            autoPlay
            muted
          />
        ) : (
          <div className="text-center animate-pulse p-6 z-10">
            <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,212,200,0.25)]">
              <span className="text-primary font-black tracking-widest text-sm">OFFLINE</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium tracking-wide">
              {isOwner ? 'Click "Stream Setup" to go live' : 'Creator is offline or connecting...'}
            </p>
          </div>
        )}
        
        {/* Floating animated reactions */}
        {reactions.map(r => (
          <div
            key={r.id}
            className="absolute bottom-16 text-2xl sm:text-3xl pointer-events-none animate-fade-in-up transition-all duration-1000 ease-out z-40"
            style={{ left: `${r.left}%`, animationDuration: '1.8s' }}
          >
            {r.emoji}
          </div>
        ))}

        {/* Reaction Dock */}
        <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full liquid-glass border border-white/10 shadow-2xl backdrop-blur-md">
          {['❤️', '🔥', '✨', '⭐', '👏'].map(emoji => (
            <button
              key={emoji}
              onClick={() => triggerReaction(emoji)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/20 active:scale-125 transition-transform flex items-center justify-center text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              aria-label={`Send ${emoji} reaction`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/90 via-transparent to-transparent z-20" />
      </div>
    </div>
  )
}
