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
  badge?: string
}

const features: FeatureCard[] = [
  {
    icon: <Upload className="w-5 h-5" />,
    headline: 'Upload & Monetize Direct',
    body: 'Upload high-resolution video & audio drops, set direct fan prices, and keep 100% of your earnings.',
    badge: 'Core Feature',
  },
  {
    icon: <Radio className="w-5 h-5" />,
    headline: 'Interactive Live Broadcasts',
    body: 'Host real-time HD streams with low-latency chat, fan tipping, and exclusive Q&As for inner circles.',
    badge: 'Live Stream',
  },
  {
    icon: <Users className="w-5 h-5" />,
    headline: 'Gated Inner Circles',
    body: 'Build multi-tier fan memberships with custom perks, private discussions, and VIP content vaults.',
    badge: 'Community',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    headline: 'Anti-Dopamine Finite Feed',
    body: "Curated content feeds designed to protect user well-being and eliminate mindless infinite scrolling.",
    badge: 'Well-Being',
  },
  {
    icon: <BarChart2 className="w-5 h-5" />,
    headline: 'Real-Time Creator Analytics',
    body: "Track subscriber growth, revenue breakdown, retention cohorts, and stream engagement instantly.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    headline: 'Custom Community Hubs',
    body: 'Customizable creator spaces with topic channels, discussion boards, and digital event scheduling.',
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    headline: 'Instant Stripe Payouts',
    body: 'Direct Stripe & Supabase SSR infrastructure ensuring payouts reach your bank account within 24 hours.',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    headline: 'Data Sovereignty & Privacy',
    body: 'You own 100% of your creator data and subscriber contacts. Zero algorithm censorship or tracking.',
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="w-full py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="02"
            label="PLATFORM CAPABILITIES"
            title="Everything required to build a sovereign creator business."
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            A comprehensive suite of production-ready tools built on Next.js 16, Supabase, and Stripe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <RevealSection key={feature.headline} delay={index * 60}>
              <div className="liquid-glass-hover h-full p-6 flex flex-col justify-between gap-4 border border-white/8 rounded-2xl group transition-all duration-300">
                <div className="flex flex-col gap-4">
                  {/* Top row with icon & badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                      {feature.icon}
                    </div>
                    {feature.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  {/* Headline & Body */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {feature.headline}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.body}
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/8 group-hover:bg-primary/30 transition-colors" />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

