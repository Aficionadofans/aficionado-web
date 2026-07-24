'use client'

import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from '@/shared/ui/core'

interface Plan {
  name: string
  badge?: string
  originalMonthlyPrice?: string
  originalAnnualPrice?: string
  monthlyPrice: string
  annualPrice: string
  description: string
  highlighted?: boolean
  features: string[]
  ctaText: string
  ctaHref: string
}

const plans: Plan[] = [
  {
    name: 'Starter Plan',
    originalMonthlyPrice: '$699',
    originalAnnualPrice: '$559',
    monthlyPrice: '$279',
    annualPrice: '$223',
    description: 'Perfect for creators & brands just getting started with short-form content.',
    features: [
      'Up to 8 short-form video drops/month',
      'Basic video editing + captions',
      'Max 60s video length',
      'Platform-ready formats (Reels, TikTok, Shorts)',
      'Standard export quality (1080p)',
      'Direct email & community support',
    ],
    ctaText: 'Get Started Now',
    ctaHref: '/login',
  },
  {
    name: 'Professional Plan',
    badge: 'MOST POPULAR',
    originalMonthlyPrice: '$1,499',
    originalAnnualPrice: '$1,199',
    monthlyPrice: '$599',
    annualPrice: '$479',
    description: 'For creators & brands ready to scale content reach and retention consistently.',
    highlighted: true,
    features: [
      'Up to 20 short-form video drops/month',
      'Advanced editing + dynamic captions',
      'Hook & storytelling optimization',
      'Priority 4K HDR export quality',
      'Unlimited revisions',
      'Monthly performance insights',
      '100% direct payouts & Inner Circle setup',
    ],
    ctaText: 'Start Growing Today',
    ctaHref: '/login',
  },
  {
    name: 'Business / Studio',
    badge: 'ENTERPRISE',
    originalMonthlyPrice: '$2,799',
    originalAnnualPrice: '$2,239',
    monthlyPrice: '$1,119',
    annualPrice: '$895',
    description: 'Best for agencies & media studios scaling content at high volume.',
    features: [
      '30+ short-form video drops/month',
      'Full editing + content optimization',
      'Strategy support & content planning',
      'Priority 24–48hr turnaround',
      'Dedicated account manager',
      'Automated payouts & split billing',
    ],
    ctaText: 'Contact Sales & Studio',
    ctaHref: '/login',
  },
]


export function LandingPricing() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="pricing" className="w-full py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionHeader
            variant="editorial"
            number="04"
            label="TRANSPARENT PRICING"
            title="Sovereign creator plans. No hidden cuts."
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Simple, predictable pricing. Keep 100% of your fan payments without platform extortion.
          </p>

          <div className="mt-6 inline-flex animate-pulse items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary ring-1 ring-primary/30 shadow-[0_0_15px_rgba(0,212,200,0.4)]">
            <Zap className="h-4 w-4 fill-current" /> LIMITED TIME: 60% OFF ALL PLANS
          </div>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full liquid-glass border border-white/12 mt-8">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                !isAnnual
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(0,212,200,0.35)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isAnnual
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(0,212,200,0.35)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-extrabold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`liquid-glass p-6 sm:p-8 rounded-3xl flex flex-col justify-between gap-6 relative transition-all duration-300 ${
                plan.highlighted
                  ? 'border-2 border-primary bg-primary/5 shadow-[0_0_40px_rgba(0,212,200,0.2)] md:-translate-y-2'
                  : 'border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    plan.highlighted
                      ? 'bg-primary text-black font-extrabold shadow-[0_0_12px_rgba(0,212,200,0.5)]'
                      : 'bg-white/10 text-white border border-white/15'
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {plan.description}
                  </p>
                </div>

                <div className="flex flex-col mt-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl font-medium text-muted-foreground line-through opacity-70"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {isAnnual ? plan.originalAnnualPrice : plan.originalMonthlyPrice}
                    </span>
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                      -60%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span
                      className="text-4xl sm:text-5xl font-black text-foreground"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {plan.monthlyPrice === '$0' ? '' : '/month'}
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10 my-1" />

                {/* Features List */}
                <ul className="flex flex-col gap-3 text-xs sm:text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.ctaHref}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-primary text-black hover:bg-primary-hover shadow-[0_0_24px_rgba(0,212,200,0.4)]'
                    : 'bg-white/8 border border-white/15 text-foreground hover:bg-white/15 hover:border-white/30'
                }`}
              >
                <span>{plan.ctaText}</span>
                {plan.highlighted && <Zap className="w-4 h-4 fill-current" />}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

