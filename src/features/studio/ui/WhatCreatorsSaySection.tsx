'use client'

import { CheckCircle2, Quote, Star, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

interface CreatorStory {
  id: string
  name: string
  handle: string
  role: string
  initials: string
  gradient: string
  quote: string
  metric: string
  category: 'monetization' | 'growth' | 'sovereignty'
  rating: number
}

const creatorStories: CreatorStory[] = [
  {
    id: '1',
    name: 'Emma Watson',
    handle: '@emmawatson',
    role: 'Cinematic Content Creator',
    initials: 'EW',
    gradient: 'from-[#FF5500] to-[#E8501A]',
    quote:
      'Before this, we were just posting randomly. Now every video has a purpose. Our reels started getting real reach, engagement went up, and we finally saw consistent growth.',
    metric: '+340% Reel Reach',
    category: 'growth',
    rating: 5,
  },
  {
    id: '2',
    name: 'Elena Vance',
    handle: '@elenavance',
    role: 'Audio & Visual Creator',
    initials: 'EV',
    gradient: 'from-[#00D4C8] to-[#007A78]',
    quote:
      'Bypassing YouTube and Instagram fee cuts allowed me to build an exclusive Inner Circle. 4.8k fans joined on day 1 with instant 24-hour payouts.',
    metric: '4.8k VIP Members Day 1',
    category: 'monetization',
    rating: 5,
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    handle: '@marcusthorne',
    role: 'Agency Founder',
    initials: 'MT',
    gradient: 'from-[#10B981] to-[#059669]',
    quote:
      'The 24-hour video drop turnaround and retention hooks transformed our agency operations. We deliver 30+ short-form edits every week without friction.',
    metric: '30+ Weekly Drops',
    category: 'sovereignty',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Torres',
    handle: '@dtorres',
    role: 'Short-Form Director',
    initials: 'DT',
    gradient: 'from-[#F59E0B] to-[#D97706]',
    quote:
      'The freedom to create what I want, on my terms, without algorithmic pressure. Pay-Per-View video drops changed how we premier exclusive uncompressed releases.',
    metric: '100% Direct Payouts',
    category: 'monetization',
    rating: 5,
  },
]

const filterTabs = [
  { key: 'all', label: 'All Experiences' },
  { key: 'monetization', label: 'Monetization & PPV' },
  { key: 'growth', label: 'Reach & Growth' },
  { key: 'sovereignty', label: 'Sovereignty & DRM' },
] as const

type FilterKey = (typeof filterTabs)[number]['key']

export function WhatCreatorsSaySection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredStories =
    activeFilter === 'all'
      ? creatorStories
      : creatorStories.filter((s) => s.category === activeFilter)

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <SectionHeader
            variant="editorial"
            number="04"
            label="CREATOR STORIES"
            title="What creators say after working with us"
            className="mb-2"
          />
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
            Real milestones, sovereign monetization breakthroughs, and unfiltered feedback from
            verified creators on Aficionado.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                activeFilter === tab.key
                  ? 'bg-primary/20 text-primary border-primary/40 shadow-[0_0_12px_rgba(0,212,200,0.2)]'
                  : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredStories.map((story, index) => (
          <RevealSection key={story.id} delay={index * 60}>
            <div className="liquid-glass-hover rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full border border-white/10 group relative overflow-hidden">
              {/* Subtle accent glow in the corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

              <div className="relative z-10 flex flex-col gap-3">
                {/* Header: Rating & Metric Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary">
                    <TrendingUp className="w-3 h-3" />
                    {story.metric}
                  </span>
                </div>

                {/* Quote */}
                <div className="flex items-start gap-2 pt-1">
                  <Quote className="w-5 h-5 text-primary/50 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-off-white/90 leading-relaxed font-sans italic">
                    “{story.quote}”
                  </p>
                </div>
              </div>

              {/* Creator Info Footer */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${story.gradient} p-[2px] shadow-sm`}
                  >
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs text-white">
                      {story.initials}
                    </div>
                  </div>
                  <div>
                    <h5
                      className="text-xs sm:text-sm font-bold text-off-white font-heading"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {story.name}
                    </h5>
                    <p className="text-[11px] text-muted-foreground">
                      {story.handle} • {story.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </div>
  )
}
