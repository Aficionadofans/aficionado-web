import React from 'react'
import Link from 'next/link'
import { Palette, Baby, MapPin, Compass, Search } from 'lucide-react'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

export default function CommunitiesHub() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col items-center p-6 sm:p-12 relative overflow-hidden pb-20 md:pb-12">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-breathe-calm" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-bio-emerald/10 rounded-full blur-[120px] pointer-events-none animate-breathe-calm" style={{ animationDelay: '2s' }} />

      <div className="z-10 text-center mb-8 sm:mb-10 animate-fade-in-up">
        <SectionHeader
          variant="editorial"
          number="01"
          label="COMMUNITIES"
          title="Shared Experiences"
          subtitle="Connect in dedicated spaces tailored to your life stage, your creative passions, and your exact coordinates."
          icon={<Compass className="w-5 h-5" />}
          className="justify-center"
        />
      </div>

      {/* Search / filter input */}
      <div className="z-10 w-full max-w-md mb-12 sm:mb-16 animate-fade-in-up">
        <div className="liquid-glass flex items-center gap-3 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/60 transition-all">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search communities…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">

        {/* Creative Space */}
        <RevealSection delay={0}>
          <div className="group clipcut-card-hover p-8 rounded-3xl flex flex-col items-center text-center cursor-not-allowed opacity-85 hover:shadow-[0_0_24px_rgba(0,212,200,0.3)]">
            <div className="w-20 h-20 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <Palette className="w-10 h-10 text-purple-400" />
            </div>
            <h2 className="text-2xl font-black text-off-white mb-2 tracking-tight">Creative Space</h2>
            <p className="text-muted-foreground text-xs sm:text-sm mb-6 flex-1 leading-relaxed">
              A collaborative sanctuary for artists, writers, musicians, and designers to create alongside their top fans.
            </p>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 font-bold tracking-wider uppercase">Coming Soon</span>
          </div>
        </RevealSection>

        {/* The Nursery */}
        <RevealSection delay={60}>
          <div className="group clipcut-card-hover p-8 rounded-3xl flex flex-col items-center text-center cursor-not-allowed opacity-85 hover:shadow-[0_0_24px_rgba(0,212,200,0.3)]">
            <div className="w-20 h-20 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              <Baby className="w-10 h-10 text-pink-400" />
            </div>
            <h2 className="text-2xl font-black text-off-white mb-2 tracking-tight">The Nursery</h2>
            <p className="text-muted-foreground text-xs sm:text-sm mb-6 flex-1 leading-relaxed">
              A supportive network exclusively for parents navigating life with newborns and toddlers up to 3 years old.
            </p>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 font-bold tracking-wider uppercase">Coming Soon</span>
          </div>
        </RevealSection>

        {/* Local Square (Neighborhoods) */}
        <RevealSection delay={120}>
          <Link
            href="/communities/neighborhood"
            className="group clipcut-card-hover p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:shadow-[0_0_24px_rgba(0,212,200,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,212,200,0.4)]">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-black text-off-white mb-2 tracking-tight">Local Square</h2>
            <p className="text-muted-foreground text-xs sm:text-sm mb-6 flex-1 leading-relaxed">
              Hyper-local living communities for neighbors. Strictly segregated and verified by your Zip Code.
            </p>
            <span className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold tracking-wider uppercase text-xs sm:text-sm group-hover:bg-primary-hover transition-colors shadow-[0_0_20px_rgba(0,212,200,0.4)]">
              Enter Neighborhood
            </span>
          </Link>
        </RevealSection>

      </div>
    </div>
  )
}
