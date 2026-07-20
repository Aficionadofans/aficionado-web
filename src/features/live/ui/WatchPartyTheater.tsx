'use client'

import React from 'react'
import { LiveStreamPlayer } from './LiveStreamPlayer'
import { LiveChatSidebar } from './LiveChatSidebar'

export function WatchPartyTheater({ username }: { username: string }) {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background flex flex-col md:flex-row overflow-hidden select-none">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-breathe-calm" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bio-teal/10 rounded-full blur-[140px] pointer-events-none animate-breathe-calm" style={{ animationDelay: '2s' }} />

      {/* Main Video Stream Player */}
      <LiveStreamPlayer username={username} viewerCount={1204} />

      {/* Real-time Live Chat Sidebar */}
      <LiveChatSidebar username={username} />
    </div>
  )
}
