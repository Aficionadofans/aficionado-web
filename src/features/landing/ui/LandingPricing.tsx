import { Check } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from '@/shared/ui/core'

// Server Component — no 'use client' directive

const fanFeatures = [
  'Browse curated creator content',
  'Follow unlimited creators',
  'Access public posts & drops',
  'Join community circles',
  'Basic notifications',
]

const creatorFeatures = [
  'Upload unlimited content',
  'Go live with your audience',
  'Create inner circle memberships',
  'Earn 80% of all revenue',
  'Advanced creator analytics',
  'Priority support',
]

export function LandingPricing() {
  return (
    <section id="pricing" className="w-full py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          variant="editorial"
          number="04"
          label="PRICING"
          title="Simple, creator-first pricing."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Fan Free card */}
          <div className="clipcut-card p-7 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Fan
              </span>
              <div className="flex items-end gap-1.5">
                <span
                  className="text-4xl font-extrabold text-white leading-none"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
                >
                  Free
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Everything you need to enjoy and support your favourite creators.
              </p>
            </div>

            {/* Feature list */}
            <ul className="flex flex-col gap-3 flex-1">
              {fanFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-foreground/80">
                  <Check
                    className="w-4 h-4 flex-shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:bg-white/10 text-foreground"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              Get started free
            </Link>
          </div>

          {/* Creator tier card */}
          <div
            className="clipcut-card-hover glow-teal p-7 flex flex-col gap-6 relative"
            style={{
              borderColor: 'var(--color-pricing-highlight-border)',
              background: 'var(--color-pricing-highlight-bg)',
            }}
          >
            {/* "MOST POPULAR" badge */}
            <span
              className="clipcut-pill absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 whitespace-nowrap"
              aria-label="Most popular plan"
            >
              MOST POPULAR
            </span>

            {/* Header */}
            <div className="flex flex-col gap-1">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Creator
              </span>
              <div className="flex items-end gap-1.5">
                <span
                  className="text-4xl font-extrabold text-white leading-none"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
                >
                  $9.99
                </span>
                <span className="text-sm text-muted-foreground mb-1">/mo</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Everything you need to grow, monetise, and own your audience.
              </p>
            </div>

            {/* Feature list */}
            <ul className="flex flex-col gap-3 flex-1">
              {creatorFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-foreground/90">
                  <Check
                    className="w-4 h-4 flex-shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{
                background: 'var(--color-primary)',
                color: '#0A0A0C',
              }}
            >
              Start creating
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
