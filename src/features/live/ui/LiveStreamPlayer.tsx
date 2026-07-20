'use client'

import React, { useState } from 'react'
import { Users, X, Star } from 'lucide-react'
import Link from 'next/link'

interface LiveStreamPlayerProps {
  username: string
  viewerCount?: number
}

export function LiveStreamPlayer({ username, viewerCount = 1204 }: LiveStreamPlayerProps) {
  const [reactions, setReactions] = useState<{ id: string; emoji: string; left: number }[]>([])

  const triggerReaction = (emoji: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    const left = Math.floor(Math.random() * 25) + 70 // 70% to 95%
    setReactions(prev => [...prev.slice(-15), { id, emoji, left }])
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id))
    }, 2000)
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
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
              <h1 className="text-off-white font-black drop-shadow-md tracking-tight text-sm sm:text-base flex items-center gap-2">
                <span>LIVE: @{username}&apos;s Watch Party</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                  LIVE
                </span>
              </h1>
            </div>
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase mt-0.5 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> VIP Event
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-primary/30 shadow-[0_0_15px_rgba(0,212,200,0.2)]">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-xs sm:text-sm font-black text-off-white tracking-wide">{viewerCount.toLocaleString()} Viewers</span>
        </div>
      </div>

      {/* Video Player Shell */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm flex items-center justify-center relative border-r border-white/5 overflow-hidden">
        <div className="text-center animate-pulse p-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,212,200,0.25)]">
            <span className="text-primary font-black tracking-widest text-sm">STREAM</span>
          </div>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">Connecting to video feed...</p>
        </div>
        
        {/* Floating animated reactions */}
        {reactions.map(r => (
          <div
            key={r.id}
            className="absolute bottom-16 text-2xl sm:text-3xl pointer-events-none animate-fade-in-up transition-all duration-1000 ease-out"
            style={{ left: `${r.left}%`, animationDuration: '1.8s' }}
          >
            {r.emoji}
          </div>
        ))}

        {/* Reaction Dock */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 px-3 py-2 rounded-full liquid-glass border border-white/10 shadow-2xl backdrop-blur-md">
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

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>
    </div>
  )
}
