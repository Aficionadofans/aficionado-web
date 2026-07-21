'use client'

import React, { useState } from 'react'
import { X, Play, Sparkles } from 'lucide-react'
import { Avatar } from '@/shared/ui/core'

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
      {/* Horizontal carousel */}
      <div className="w-full pt-3 pb-2 px-4 overflow-x-auto hide-scrollbar flex gap-3 items-center">
        {drops.length === 0 ? (
          /* Empty state: 4 skeleton avatar circles */
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-muted shimmer" />
                <div className="w-10 h-2 rounded-full bg-muted shimmer" />
              </div>
            ))}
          </>
        ) : (
          drops.map((drop) => (
            <button
              key={drop.id}
              onClick={() => setActiveDrop(drop)}
              aria-label={`View drop from ${drop.creator}`}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full"
            >
              {/* Avatar with teal ring + unread dot */}
              <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-primary/40 shadow-[0_0_12px_rgba(0,212,200,0.35)]">
                  <Avatar
                    src={drop.avatar}
                    alt={drop.creator}
                    name={drop.creator}
                    size="lg"
                    className="w-full h-full rounded-full"
                  />
                </div>
                {/* Unread indicator: 8px teal dot at bottom-right */}
                {drop.hasUnread && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
                )}
              </div>
              <span className="text-[10px] text-foreground/80 truncate w-14 text-center font-medium group-hover:text-primary transition-colors">
                {drop.creator}
              </span>
            </button>
          ))
        )}
      </div>

      {/* Fullscreen drop viewer */}
      {activeDrop && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Drop story by ${activeDrop.creator}`}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col animate-fade-in-up"
        >
          {/* Progress bar — teal */}
          <div className="w-full px-4 pt-12 pb-1 flex gap-1">
            <div
              className="h-0.5 flex-1 rounded-full"
              style={{
                background: 'linear-gradient(to right, #00D4C8, #00F0B5)',
                boxShadow: '0 0 8px rgba(0,212,200,0.6)',
              }}
            />
          </div>

          <header className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <Avatar
                src={activeDrop.avatar}
                alt={activeDrop.creator}
                name={activeDrop.creator}
                size="md"
                ring="primary"
              />
              <div>
                <span className="text-sm font-semibold text-foreground">@{activeDrop.creator}</span>
                <span className="text-[10px] text-primary/80 font-medium uppercase tracking-widest flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> Exclusive Drop
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveDrop(null)}
              aria-label="Close drop"
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.08)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
            {/* Play button */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center animate-float"
              style={{
                background: 'rgba(0,212,200,0.1)',
                border: '1px solid rgba(0,212,200,0.35)',
                boxShadow: '0 0 40px rgba(0,212,200,0.2)',
              }}
            >
              <Play
                className="w-9 h-9 text-primary ml-1"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,200,0.8))' }}
              />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-foreground mb-2"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
              >
                {activeDrop.content}
              </h2>
              <p className="text-sm text-muted-foreground">Tap to view this exclusive drop</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
