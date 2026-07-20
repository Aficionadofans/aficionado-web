import React from 'react'
import Link from 'next/link'
import { Palette, Baby, MapPin, Compass } from 'lucide-react'

export default function CommunitiesHub() {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col items-center p-6 sm:p-12 relative overflow-hidden pb-20 md:pb-12">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-breathe-calm" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-bio-emerald/10 rounded-full blur-[120px] pointer-events-none animate-breathe-calm" style={{ animationDelay: '2s' }} />

      <div className="z-10 text-center mb-12 sm:mb-16 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass border-bio-teal/20 text-xs font-bold text-bio-teal uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,240,181,0.2)]">
          <Compass className="w-3.5 h-3.5" />
          <span>Community Hubs</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-bio-teal via-off-white to-bio-emerald tracking-tight mb-4 drop-shadow-md">
          Shared Experiences
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base font-medium leading-relaxed">
          Connect in dedicated spaces tailored to your life stage, your creative passions, and your exact coordinates.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        
        {/* Creative Space */}
        <div className="group liquid-glass p-8 rounded-3xl flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 cursor-not-allowed opacity-85">
          <div className="w-20 h-20 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <Palette className="w-10 h-10 text-purple-400" />
          </div>
          <h2 className="text-2xl font-black text-off-white mb-2 tracking-tight">Creative Space</h2>
          <p className="text-muted-foreground text-xs sm:text-sm mb-6 flex-1 leading-relaxed">
            A collaborative sanctuary for artists, writers, musicians, and designers to create alongside their top fans.
          </p>
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 font-bold tracking-wider uppercase">Coming Soon</span>
        </div>

        {/* The Nursery */}
        <div className="group liquid-glass p-8 rounded-3xl flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 cursor-not-allowed opacity-85">
          <div className="w-20 h-20 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(236,72,153,0.3)]">
            <Baby className="w-10 h-10 text-pink-400" />
          </div>
          <h2 className="text-2xl font-black text-off-white mb-2 tracking-tight">The Nursery</h2>
          <p className="text-muted-foreground text-xs sm:text-sm mb-6 flex-1 leading-relaxed">
            A supportive network exclusively for parents navigating life with newborns and toddlers up to 3 years old.
          </p>
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 font-bold tracking-wider uppercase">Coming Soon</span>
        </div>

        {/* Local Square (Neighborhoods) */}
        <Link href="/communities/neighborhood" className="group liquid-glass p-8 rounded-3xl flex flex-col items-center text-center hover:border-bio-teal/80 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-teal">
          <div className="absolute inset-0 bg-gradient-to-b from-bio-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-20 h-20 rounded-2xl bg-bio-teal/20 border border-bio-teal/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(45,212,191,0.4)]">
            <MapPin className="w-10 h-10 text-bio-teal" />
          </div>
          <h2 className="text-2xl font-black text-off-white mb-2 tracking-tight">Local Square</h2>
          <p className="text-muted-foreground text-xs sm:text-sm mb-6 flex-1 leading-relaxed">
            Hyper-local living communities for neighbors. Strictly segregated and verified by your Zip Code.
          </p>
          <span className="px-6 py-2.5 rounded-full bg-bio-teal text-black font-bold tracking-wider uppercase text-xs sm:text-sm group-hover:bg-bio-emerald transition-colors shadow-[0_0_20px_rgba(45,212,191,0.4)]">
            Enter Neighborhood
          </span>
        </Link>

      </div>
    </div>
  )
}
