'use client'

import React, { useState } from 'react'
import { X, Play, Sparkles } from 'lucide-react'

export interface Drop {
  id: string
  creator: string
  avatar: string
  hasUnread: boolean
  content: string
}

export function DropZoneCarousel({ drops }: { drops: Drop[] }) {
  const [activeDrop, setActiveDrop] = useState<Drop | null>(null)

  return (
    <>
      {/* Horizontal Carousel */}
      <div className="w-full pt-4 pb-2 px-4 overflow-x-auto hide-scrollbar flex gap-4 items-center">
        {drops.map((drop) => (
          <button 
            key={drop.id}
            onClick={() => setActiveDrop(drop)}
            aria-label={`View drop from ${drop.creator}`}
            className="flex flex-col items-center gap-1 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-full"
          >
            <div className={`w-16 h-16 rounded-full p-[2.5px] transition-all duration-300 group-hover:scale-105 group-active:scale-95 ${
              drop.hasUnread 
                ? 'bg-gradient-to-tr from-amber-500 via-bio-teal to-primary shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                : 'bg-white/15'
            }`}>
              <div className="w-full h-full rounded-full border-2 border-background overflow-hidden bg-background flex items-center justify-center">
                 <img src={drop.avatar} alt={drop.creator} className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-[10px] text-off-white/90 truncate w-16 text-center font-semibold drop-shadow-md group-hover:text-primary transition-colors">
              {drop.creator}
            </span>
          </button>
        ))}
      </div>

      {/* Fullscreen Drop Viewer Modal */}
      {activeDrop && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={`Drop story by ${activeDrop.creator}`}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col animate-fade-in-up"
        >
          {/* Top progress bar */}
          <div className="w-full p-4 flex gap-1 pt-12">
            <div className="h-1 bg-gradient-to-r from-bio-teal to-primary rounded-full flex-1 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
          </div>
          
          <header className="flex items-center justify-between px-6 pb-4">
            <div className="flex items-center gap-3">
              <img src={activeDrop.avatar} className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md" alt="" />
              <div>
                <span className="text-sm font-bold text-off-white block">@{activeDrop.creator}</span>
                <span className="text-[10px] text-primary/80 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Exclusive Drop
                </span>
              </div>
            </div>
            <button 
              onClick={() => setActiveDrop(null)}
              aria-label="Close drop modal"
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-24 h-24 rounded-full liquid-glass border border-primary/40 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-float">
              <Play className="w-12 h-12 text-primary ml-1 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-off-white mb-3 tracking-wide">{activeDrop.content}</h2>
            <p className="text-muted-foreground text-sm font-medium">Tap to view full high-definition drop</p>
          </div>
        </div>
      )}
    </>
  )
}

