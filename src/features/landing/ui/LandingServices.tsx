'use client'

import { CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

export function LandingServices() {
  return (
    <section
      className="py-24 px-4 relative z-10 bg-[#070709] border-t border-white/8"
      id="services"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="03"
            label="WHAT WE DO"
            title="Short-form drops video optimized for your community backed by zip code in your area."
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Ideal for solo creators building your social media presence empire.
          </p>
        </div>

        {/* Bottom Guarantee Banner from Framer Template */}
        <RevealSection delay={300}>
          <div className="curved-card p-6 sm:p-8 border border-[#E8501A]/40 bg-gradient-to-r from-[#140E1A] via-[#0E0B14] to-[#0A070F] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left max-w-xl">
              <h4 className="text-lg font-extrabold text-white font-heading mb-1">
                Hand off the heavy lifting
              </h4>
              <p className="text-xs text-muted-foreground">
                We deliver polished, platform-ready video drops while you focus on building your
                sovereign creator brand.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8501A]" />
                <span>24–48h Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Hook Engineered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct Fan Monetization</span>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
