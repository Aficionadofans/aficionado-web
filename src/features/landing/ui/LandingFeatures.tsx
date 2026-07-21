'use client'

import {
  Upload,
  Radio,
  Users,
  Shield,
  BarChart2,
  Globe,
  CreditCard,
  Lock,
} from 'lucide-react'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

interface FeatureCard {
  icon: React.ReactNode
  headline: string
  body: string
}

const features: FeatureCard[] = [
  {
    icon: <Upload className="w-6 h-6" />,
    headline: 'Upload & Earn',
    body: 'Upload content, set your price, and earn directly from fans — no middlemen, no revenue splits.',
  },
  {
    icon: <Radio className="w-6 h-6" />,
    headline: 'Live Streams',
    body: 'Host intimate live sessions with your inner circle and engage your most dedicated fans in real time.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    headline: 'Inner Circles',
    body: 'Create exclusive membership tiers for your biggest fans with gated content and private perks.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    headline: 'Anti-Dopamine Feed',
    body: "Curated content, not infinite scroll. A feed designed to respect your audience's attention.",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    headline: 'Creator Stats',
    body: "Deep analytics on your audience and revenue so you always know what's working.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    headline: 'Community Hubs',
    body: 'Build and manage your own community circles where fans connect around your world.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    headline: 'Secure Payments',
    body: 'Transparent, instant payouts with no hidden fees — your earnings, on your schedule.',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    headline: 'Privacy First',
    body: 'Your data belongs to you, always. We never sell or share what you create or who you are.',
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="w-full py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          variant="editorial"
          number="03"
          label="FEATURES"
          title="Everything you need to own your audience."
          className="mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <RevealSection key={feature.headline} delay={index * 80}>
              <div className="clipcut-card-hover h-full p-5 md:p-6 flex flex-col gap-3">
                {/* Icon tile */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(0, 212, 200, 0.08)',
                    border: '1px solid rgba(0, 212, 200, 0.2)',
                  }}
                >
                  <span className="text-primary">{feature.icon}</span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3
                    className="text-sm md:text-base font-bold text-white leading-tight"
                    style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
                  >
                    {feature.headline}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
