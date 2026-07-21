'use client'

import React from 'react'
import { LiveStreamPlayer } from './LiveStreamPlayer'
import { LiveChatSidebar } from './LiveChatSidebar'

export function WatchPartyTheater({ username }: { username: string }) {
  return (
    <div
      className="relative min-h-[100dvh] w-full bg-background flex flex-col md:flex-row overflow-hidden select-none animate-fade-in-up"
      style={{ animationDuration: '400ms', animationFillMode: 'both' }}
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-breathe-calm" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bio-teal/10 rounded-full blur-[140px] pointer-events-none animate-breathe-calm" style={{ animationDelay: '2s' }} />

      {/* Main Video Stream Player */}
      <div className="flex-1 glass-panel ring-2 ring-primary/30 shadow-[0_0_24px_rgba(0,212,200,0.2)] relative overflow-hidden">
        <LiveStreamPlayer username={username} viewerCount={1204} />
      </div>

      {/* Real-time Live Chat Sidebar */}
      <LiveChatSidebar username={username} />
    </div>
  )
}
