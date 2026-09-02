'use client'

import { CalendarX, Coins, TrendingDown } from 'lucide-react'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { WordReveal } from '@/shared/ui/motion/WordReveal'

export function LandingProblem() {
  return (
    <section className="py-24 px-4 relative z-10 bg-[#07070A] border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <SectionHeader
            variant="editorial"
            number="01"
            label="THE PROBLEM"
            title=""
            className="mb-2"
          />
          <WordReveal
            as="h2"
            text="Great content, but no real growth?"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4"
            stagger={0.06}
          />
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            You’re spending hours creating videos, but the results just don’t match the effort. The
            problem isn’t consistency — it’s what happens after people hit play.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Views that don't convert */}
          <RevealSection delay={0}>
            <div className="liquid-glass glass-shimmer-sweep p-6 sm:p-8 flex flex-col justify-between h-full group relative overflow-hidden rounded-[1.75rem]">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_16px_rgba(239,68,68,0.2)]">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Content that doesn’t connect
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  Your videos are out there, but no real engagement, subscriber growth, or direct
                  revenue.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Card 2: Likes don't pay the bills */}
          <RevealSection delay={100}>
            <div className="liquid-glass glass-shimmer-sweep p-6 sm:p-8 flex flex-col justify-between h-full group relative overflow-hidden rounded-[1.75rem]">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.2)]">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Likes don’t pay the bills
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Viral moments feel good, but without a sovereign direct monetization model, they
                  don’t build a business.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Card 3: No system, no consistency */}
          <RevealSection delay={200}>
            <div className="liquid-glass glass-shimmer-sweep p-6 sm:p-8 flex flex-col justify-between h-full group relative overflow-hidden rounded-[1.75rem]">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8501A]/10 border border-[#E8501A]/30 flex items-center justify-center text-[#E8501A] shadow-[0_0_16px_rgba(232,80,26,0.25)]">
                  <CalendarX className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  No system, no consistency
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Posting randomly without a structured drop system leads to viewer fatigue and
                  algorithm traps.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
