'use client'

import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { TrendingDown, Coins, CalendarX } from 'lucide-react'

export function LandingProblem() {
  return (
    <section className="py-24 px-4 relative z-10 bg-[#07070A] border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="01"
            label="THE PROBLEM"
            title="Great content, but no real growth?"
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            You’re spending hours creating videos, but the results just don’t match the effort. The problem isn’t consistency — it’s what happens after people hit play.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Views that don't convert */}
          <RevealSection delay={0}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 relative overflow-hidden group">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Views that don’t convert</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your videos get views, but no real engagement, subscriber growth, or direct revenue.
                </p>
              </div>

              {/* Retention Graph Mockup */}
              <div className="mt-8 p-4 rounded-2xl bg-black/60 border border-white/8 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Avg. Audience Retention</span>
                  <span className="text-red-400 font-bold">-68% Drop</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[32%] bg-red-500 rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-red-400/80">50% Viewers dropped past 3s</span>
              </div>
            </div>
          </RevealSection>

          {/* Card 2: Likes don't pay the bills */}
          <RevealSection delay={100}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 relative overflow-hidden group">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Likes don’t pay the bills</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Viral moments feel good, but without a sovereign direct monetization model, they don’t build a business.
                </p>
              </div>

              {/* Likes vs Revenue Metric Mockup */}
              <div className="mt-8 p-4 rounded-2xl bg-black/60 border border-white/8 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-white font-bold">120K Likes</div>
                  <div className="text-[10px] text-muted-foreground">Platform Ad Revenue</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-red-400 font-bold">$0.00 Direct</div>
                  <div className="text-[10px] text-muted-foreground">0% Ownership</div>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Card 3: No system, no consistency */}
          <RevealSection delay={200}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 relative overflow-hidden group">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8501A]/10 border border-[#E8501A]/30 flex items-center justify-center text-[#E8501A]">
                  <CalendarX className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">No system, no consistency</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Posting randomly without a structured drop system leads to viewer fatigue and algorithm traps.
                </p>
              </div>

              {/* Activity Output Mockup */}
              <div className="mt-8 p-4 rounded-2xl bg-black/60 border border-white/8 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Weekly Output</span>
                  <span className="text-[#E8501A] font-bold">3 / 10 Posts</span>
                </div>
                <div className="flex items-center gap-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-6 rounded-md flex items-center justify-center text-[9px] font-mono font-bold ${
                        i < 3 ? 'bg-[#E8501A] text-black' : 'bg-white/5 text-muted-foreground'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
