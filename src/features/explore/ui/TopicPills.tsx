'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export const TOPIC_FILTERS = [
  "Musicians",
  "Writers",
  "Parenting",
  "Visual Art",
  "Tech & Design",
  "Wellness"
]

interface TopicPillsProps {
  topics?: string[]
  activeFilter: string | null
  onFilterClick: (topic: string) => void
}

export function TopicPills({
  topics = TOPIC_FILTERS,
  activeFilter,
  onFilterClick,
}: TopicPillsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
      <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 shrink-0 shadow-[0_0_10px_rgba(0,212,200,0.15)]">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span>Topics</span>
      </div>
      {topics.map((topic) => {
        const isActive = activeFilter === topic
        return (
          <button
            key={topic}
            onClick={() => onFilterClick(topic)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(0,212,200,0.4)] scale-105"
                : "liquid-glass text-muted-foreground border-white/10 hover:text-off-white hover:border-white/20"
            )}
          >
            {topic}
          </button>
        )
      })}
    </div>
  )
}
