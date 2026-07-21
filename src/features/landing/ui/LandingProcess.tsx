'use client'

import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { UserPlus, Video, DollarSign, ArrowRight } from 'lucide-react'

interface Step {
  number: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Claim Your Sovereign Handle & Circle',
    subtitle: 'Setup in < 2 minutes',
    description: 'Create your verified creator profile, set up your public feed parameters, and configure your gated Inner Circle tiers.',
    icon: <UserPlus className="w-6 h-6 text-primary" />,
  },
  {
    number: '02',
    title: 'Drop Short-Form Content & Stream Live',
    subtitle: 'Zero algorithm interference',
    description: 'Publish high-retention video drops, uncompressed audio drops, or launch interactive live streams straight to your audience.',
    icon: <Video className="w-6 h-6 text-primary" />,
  },
  {
    number: '03',
    title: 'Monetize Direct & Keep 100% Revenue',
    subtitle: 'Instant 24hr Stripe payouts',
    description: 'Collect fan subscriptions, exclusive post unlocks, and tips directly to your account with zero platform cuts.',
    icon: <DollarSign className="w-6 h-6 text-primary" />,
  },
]

export function LandingProcess() {
  return (
    <section className="py-24 px-4 relative z-10 bg-[#070709] border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="03"
            label="THE CREATOR WORKFLOW"
            title="How to launch your sovereign empire."
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            3 simple steps to transition from legacy algorithmic dependency to 100% direct fan monetization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, index) => (
            <RevealSection key={step.number} delay={index * 100}>
              <div className="liquid-glass-hover p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between gap-6 relative h-full group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    {step.icon}
                  </div>
                  <span
                    className="text-4xl font-black text-white/20 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary font-mono">
                    {step.subtitle}
                  </span>
                  <h3
                    className="text-xl font-bold text-foreground leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {step.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                  <span>Learn Step {step.number}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
