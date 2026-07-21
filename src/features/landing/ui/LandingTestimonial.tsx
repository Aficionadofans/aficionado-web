'use client'

import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { Star, Quote, CheckCircle2 } from 'lucide-react'

export function LandingTestimonial() {
  return (
    <section className="py-24 px-4 relative z-10 bg-[#070709] border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="06"
            label="TESTIMONIALS"
            title="What creators say after working with us"
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Real results from real clients. Here's what happened when they switched to our sovereign creator engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <RevealSection delay={0}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 text-left group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#E8501A]/40" />
                <p className="text-sm text-white/90 leading-relaxed font-sans italic">
                  “Before this, we were just posting randomly. Now every video has a purpose. Our reels started getting real reach, engagement went up, and we finally saw consistent growth.”
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5500] to-[#E8501A] p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs text-white">
                      EW
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white font-heading">Emma Watson</h5>
                    <p className="text-xs text-muted-foreground">Content Creator</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Testimonial 2 */}
          <RevealSection delay={100}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 text-left group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/40" />
                <p className="text-sm text-white/90 leading-relaxed font-sans italic">
                  “Bypassing YouTube and Instagram fee cuts allowed me to build an exclusive Inner Circle. 4.8k fans joined on day 1 with instant 24-hour payouts.”
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-teal-400 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs text-primary">
                      EV
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white font-heading">Elena Vance</h5>
                    <p className="text-xs text-muted-foreground">Audio & Video Creator</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Testimonial 3 */}
          <RevealSection delay={200}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 text-left group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-emerald-400/40" />
                <p className="text-sm text-white/90 leading-relaxed font-sans italic">
                  “The 24-hour video drop turnaround and retention hooks transformed our agency operations. We deliver 30+ short-form edits every week without friction.”
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs text-emerald-400">
                      MK
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white font-heading">Marcus Thorne</h5>
                    <p className="text-xs text-muted-foreground">Agency Founder</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
