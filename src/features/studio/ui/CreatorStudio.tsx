'use client'

import React, { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { CreateDropModal } from './CreateDropModal'
import { TimeCapsuleModal } from './TimeCapsuleModal'
import { StudioQuickActions } from './StudioQuickActions'
import { StudioMetricCards } from './StudioMetricCards'

interface FlaggedItem {
  id: string
  title: string
  moderation_status: string
  created_at: string
}

interface CreatorStudioProps {
  username: string
  activeSubscribers?: number
  totalContent?: number
  flaggedContent?: FlaggedItem[]
}

export function CreatorStudio({
  username,
  activeSubscribers = 0,
  totalContent = 0,
  flaggedContent = [],
}: CreatorStudioProps) {
  const [isDropModalOpen, setIsDropModalOpen] = useState(false)
  const [isTimeCapsuleModalOpen, setIsTimeCapsuleModalOpen] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 pb-20 md:pb-12">
      <header className="mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass border-primary/20 text-xs font-bold text-primary uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Creator Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-off-white drop-shadow-md">Creator Studio</h1>
        <p className="mt-2 text-muted-foreground text-sm font-medium leading-relaxed">Manage your content, engage your fans, and track community growth.</p>
      </header>

      {/* Quick Actions */}
      <StudioQuickActions
        username={username}
        onOpenDropModal={() => setIsDropModalOpen(true)}
        onOpenTimeCapsuleModal={() => setIsTimeCapsuleModalOpen(true)}
      />

      {/* Analytics & Content Shield Metrics */}
      <StudioMetricCards
        activeSubscribers={activeSubscribers}
        totalContent={totalContent}
        flaggedContent={flaggedContent}
      />

      {/* Modals */}
      {isDropModalOpen && <CreateDropModal onClose={() => setIsDropModalOpen(false)} />}
      {isTimeCapsuleModalOpen && <TimeCapsuleModal onClose={() => setIsTimeCapsuleModalOpen(false)} />}
    </div>
  )
}
