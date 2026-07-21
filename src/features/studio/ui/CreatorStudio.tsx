'use client'

import React, { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { SectionHeader } from '@/shared/ui/core'
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
        <SectionHeader
          variant="editorial"
          number="01"
          label="YOUR STUDIO"
          title="Creator Studio"
          icon={<TrendingUp className="w-5 h-5" />}
          subtitle="Manage your content, engage your fans, and track community growth."
        />
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
