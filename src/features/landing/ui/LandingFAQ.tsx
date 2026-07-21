'use client'

import { useState } from 'react'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How does the Anti-Dopamine Finite Feed work?',
    answer: 'Unlike legacy social networks that use infinite scroll algorithms to maximize user screen time and ad impressions, Aficionado delivers finite, highly curated feeds. Users see new drops from their subscribed creators and reach a clear completion boundary, encouraging healthy digital consumption.',
  },
  {
    question: 'How do direct fan payouts work?',
    answer: 'Aficionado integrates directly with Stripe and Supabase SSR infrastructure. When fans subscribe to your Inner Circle or send tips, funds are transferred straight to your connected Stripe account with payouts settling in less than 24 hours.',
  },
  {
    question: 'Can I import my existing subscribers and fan lists?',
    answer: 'Yes! Aficionado provides seamless CSV import tools and custom landing page links so you can easily invite your existing email list, Patreon members, or social media followers to your new sovereign home.',
  },
  {
    question: 'Who owns the content and subscriber data?',
    answer: 'You own 100% of your content, intellectual property, and subscriber contacts. Aficionado never locks your audience behind proprietary wall gardens, and you can export your fan database at any time.',
  },
  {
    question: 'What video and audio formats are supported for live streaming and drops?',
    answer: 'Aficionado supports 4K HDR video uploads, uncompressed audio drops, Mux live streaming infrastructure, and low-latency interactive chat streams.',
  },
]

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 px-4 relative z-10 bg-[#070709]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="05"
            label="FREQUENTLY ASKED QUESTIONS"
            title="Everything you need to know."
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Clear answers about sovereign monetization, content control, and platform infrastructure.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <RevealSection key={faq.question} delay={index * 50}>
                <div
                  className={`liquid-glass rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-primary/40 bg-primary/5 shadow-[0_0_24px_rgba(0,212,200,0.12)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span
                        className="text-base sm:text-lg font-bold text-foreground"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-primary border-primary/40 bg-primary/10' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-muted-foreground leading-relaxed animate-fade-in-up border-t border-white/5 mt-2">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </RevealSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
