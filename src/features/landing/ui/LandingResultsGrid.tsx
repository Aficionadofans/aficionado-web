'use client'

import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { TrendingUp, Users, Zap, DollarSign, Award, Flame } from 'lucide-react'

interface ResultCard {
  stat: string
  handle: string
  description: string
  icon: React.ReactNode
}

const results: ResultCard[] = [
  {
    stat: '1.2M+ views on single reel',
    handle: '@nova.skincare',
    description: 'We created product-focused short videos with strong hooks and clean visuals, reaching a massive new audience.',
    icon: <Flame className="w-5 h-5 text-[#E8501A]" />,
  },
  {
    stat: '+8K followers in 30 days',
    handle: '@Williams.fast',
    description: 'A consistent content strategy combined with high-retention edits helped grow their audience steadily.',
    icon: <Users className="w-5 h-5 text-primary" />,
  },
  {
    stat: '3x engagement increase',
    handle: '@Khulna_para',
    description: 'Better hooks and tighter storytelling pushed watch time up — and the recommendation engine noticed.',
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
  },
  {
    stat: '2.5x leads from content',
    handle: '@Urban_sun',
    description: 'Strategy-driven videos with clear messages and CTAs turned views into real business leads.',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
  },
  {
    stat: '2.8x increase in sales',
    handle: '@Cook.johans',
    description: 'Conversion-focused edits with clear CTAs turned passive viewers into paying customers.',
    icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
  },
  {
    stat: '100% direct payouts kept',
    handle: '@ElenaVance',
    description: 'Bypassed platform algorithms and converted 4.8k followers into monthly Inner Circle subscribers.',
    icon: <Award className="w-5 h-5 text-[#E8501A]" />,
  },
]

export function LandingResultsGrid() {
  return (
    <section className="py-24 px-4 relative z-10 bg-[#07070A] border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="05"
            label="REAL NUMBERS"
            title="What happens when content meets strategy"
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Every result below came from a real creator working with our sovereign content system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, i) => (
            <RevealSection key={item.handle} delay={i * 80}>
              <div className="curved-card-hover p-6 flex flex-col justify-between h-full border border-white/10 group text-left">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{item.handle}</span>
                  </div>
                  <h4
                    className="text-lg font-black text-white leading-snug"
                    style={{ fontFamily: 'var(--font-bricolage), var(--font-heading)' }}
                  >
                    {item.stat}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
