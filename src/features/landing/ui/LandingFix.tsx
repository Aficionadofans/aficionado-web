'use client'

import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

interface FixStat {
  value: string
  label: string
  description: string
}

const stats: FixStat[] = [
  {
    value: '85%+',
    label: 'Avg. Retention Rate',
    description: 'Hook-driven edits that keep viewers watching past the critical first 3 seconds.',
  },
  {
    value: '500+',
    label: 'Video Drops Delivered',
    description: 'From solo creators to full production studios — delivered on time, every time.',
  },
  {
    value: '3.5X',
    label: 'Avg. Engagement Increase',
    description: 'More direct comments, shares, saves, and fan circle subscriptions — not just empty views.',
  },
  {
    value: '<24hr',
    label: 'Direct Payout Speed',
    description: '100% of fan payments sent straight to your Stripe balance with zero platform delays.',
  },
]

export function LandingFix() {
  return (
    <section className="py-24 px-4 relative z-10 bg-[#0A070D] border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="02"
            label="HOW WE FIX IT"
            title="A done-for-you sovereign content system"
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            We don’t just host videos — we engineer each drop for retention, reach, and direct fan monetization. You drop the content, we handle everything else.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <RevealSection key={stat.label} delay={i * 100}>
              <div className="liquid-glass-card glass-shimmer-sweep p-6 sm:p-8 flex flex-col justify-between h-full group text-left">
                <div>
                  <span
                    className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#E8501A] to-[#00D4C8] block mb-2 drop-shadow-[0_0_15px_rgba(232,80,26,0.3)]"
                    style={{ fontFamily: 'var(--font-bricolage), var(--font-heading)' }}
                  >
                    {stat.value}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2 font-heading">{stat.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
