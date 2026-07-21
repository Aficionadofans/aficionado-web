'use client'

import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { Video, Camera, Radio, CheckCircle2, ArrowRight } from 'lucide-react'

export function LandingServices() {
  return (
    <section className="py-24 px-4 relative z-10 bg-[#070709] border-t border-white/8" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="03"
            label="WHAT WE DO"
            title="Short-form drops optimized for every platform"
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Whether you're a solo creator building your empire or an agency managing top talent — we give you the sovereign content engine to deliver more, faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Service 1: YouTube Shorts */}
          <RevealSection delay={0}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 group">
              <div className="flex flex-col gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">YouTube Shorts Drops</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hook-driven 9:16 short edits sized and optimized for YouTube's recommendation engine with uncompressed audio.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono text-primary">
                <span>9:16 Format</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </RevealSection>

          {/* Service 2: Instagram Reels */}
          <RevealSection delay={100}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 group">
              <div className="flex flex-col gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Instagram Reels & Stories</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Trend-aware edits with dynamic captions, pacing, and hooks engineered to expand explore page reach.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono text-pink-400">
                <span>High Engagement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </RevealSection>


          {/* Service 3: TikTok & Live Streams */}
          <RevealSection delay={200}>
            <div className="curved-card-hover p-6 sm:p-8 flex flex-col justify-between h-full border border-white/10 group">
              <div className="flex flex-col gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#E8501A]/10 border border-[#E8501A]/30 flex items-center justify-center text-[#E8501A]">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">TikTok & Live Streams</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Fast-cut edits and HD low-latency broadcasts built around native behaviors and gated Inner Circle drops.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono text-[#E8501A]">
                <span>Native Pacing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Bottom Guarantee Banner from Framer Template */}
        <RevealSection delay={300}>
          <div className="curved-card p-6 sm:p-8 border border-[#E8501A]/40 bg-gradient-to-r from-[#140E1A] via-[#0E0B14] to-[#0A070F] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left max-w-xl">
              <h4 className="text-lg font-extrabold text-white font-heading mb-1">Hand off the heavy lifting</h4>
              <p className="text-xs text-muted-foreground">
                We deliver polished, platform-ready video drops while you focus on building your sovereign creator brand.
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
                <span>100% Revenue Ownership</span>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
