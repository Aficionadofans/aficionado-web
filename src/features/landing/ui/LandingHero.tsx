import Link from 'next/link'
import { Sparkles, ArrowUpRight, Film, Target, TrendingUp } from 'lucide-react'

export function LandingHero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 flex flex-col items-center justify-between overflow-hidden bg-[#090401]">
      {/* Top-Left Gigantic Glowing Orange Radial Orb (Framer Screenshot Match) */}
      <div className="absolute top-[-120px] left-[-120px] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#FF5500] via-[#E8501A] to-amber-700/20 blur-[140px] opacity-75 pointer-events-none z-0" />

      {/* Hero Central Header Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-6 mt-8">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/90 framer-badge backdrop-blur-md shadow-lg animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-current" />
          <span>Trusted by 100+ creators & brands</span>
        </div>

        {/* H1 Display Title (Exact Framer Typography Class) */}
        <h1 className="framer-h1 max-w-5xl">
          Short-form video editing that <br />
          actually gets results
        </h1>

        {/* Subtitle */}
        <p className="framer-subtitle max-w-2xl">
          We turn your raw clips into high-performing Reels, TikToks, and Shorts — designed to grab attention, boost engagement, and grow your audience faster.
        </p>

        {/* Action Buttons (Exact Framer Button Class) */}
        <div className="flex flex-row items-center gap-4 mt-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#E8501A] px-7 py-3 framer-btn text-white transition-all duration-200 hover:bg-[#FF5500] hover:shadow-[0_0_28px_rgba(232,80,26,0.5)]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="#showcase"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-[#1A1310] px-7 py-3 framer-btn text-white/90 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
          >
            <span>See Our Works</span>
          </a>
        </div>

      </div>

      {/* 6-Card Fan-out Vertical Video Portrait Showcase Container (Exact Framer Match with Levitation Motion) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-10 flex items-end justify-center gap-2 sm:gap-4 overflow-visible px-2">
        {/* Card 1: Far Left Big (-8deg rotation) */}
        <div
          className="relative w-[180px] sm:w-[260px] md:w-[300px] h-[280px] sm:h-[380px] md:h-[430px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/12 hover:border-[#E8501A] shadow-[0_24px_50px_rgba(0,0,0,0.85)] transform -rotate-6 sm:-rotate-8 -translate-y-4 hover:rotate-0 hover:scale-108 hover:z-40 transition-all duration-500 group bg-[#160F14] animate-hero-fan-float cursor-pointer"
          style={{ animationDelay: '0s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
            alt="Creator studio editing drop"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 flex flex-col justify-between text-left">
            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-2.5 py-1 rounded-full bg-[#E8501A] text-white text-[10px] font-bold uppercase tracking-wider">
                ▶ Active Reel
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-white font-heading block">Studio Short Edit</span>
              <span className="text-[10px] font-mono text-amber-300">1.2M Views • +420% Reach</span>
            </div>
          </div>
        </div>

        {/* Card 2: Left Mid (-3deg rotation) */}
        <div
          className="relative w-[120px] sm:w-[180px] md:w-[210px] h-[220px] sm:h-[300px] md:h-[340px] rounded-[20px] sm:rounded-[28px] overflow-hidden border border-white/12 hover:border-[#E8501A] shadow-[0_20px_40px_rgba(0,0,0,0.8)] transform -rotate-3 hover:rotate-0 hover:scale-108 hover:z-40 transition-all duration-500 group bg-[#160F14] animate-hero-fan-float cursor-pointer"
          style={{ animationDelay: '0.6s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop"
            alt="Lifestyle short drop"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[11px] font-bold text-white">Lifestyle Edit</span>
            <span className="text-[9px] font-mono text-primary">623K Views</span>
          </div>
        </div>

        {/* Card 3: Center Left (-1deg rotation) */}
        <div
          className="relative w-[100px] sm:w-[150px] md:w-[180px] h-[190px] sm:h-[260px] md:h-[290px] rounded-[18px] sm:rounded-[24px] overflow-hidden border border-white/12 hover:border-[#E8501A] shadow-[0_16px_32px_rgba(0,0,0,0.8)] transform -rotate-1 hover:rotate-0 hover:scale-108 hover:z-40 transition-all duration-500 group bg-[#160F14] animate-hero-fan-float cursor-pointer"
          style={{ animationDelay: '1.2s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop"
            alt="Product review drop"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[11px] font-bold text-white">Product Review</span>
            <span className="text-[9px] font-mono text-emerald-400">487K Views</span>
          </div>
        </div>

        {/* Card 4: Center Right (+1deg rotation) */}
        <div
          className="relative w-[100px] sm:w-[150px] md:w-[180px] h-[190px] sm:h-[260px] md:h-[290px] rounded-[18px] sm:rounded-[24px] overflow-hidden border border-white/12 hover:border-[#E8501A] shadow-[0_16px_32px_rgba(0,0,0,0.8)] transform rotate-1 hover:rotate-0 hover:scale-108 hover:z-40 transition-all duration-500 group bg-[#160F14] animate-hero-fan-float cursor-pointer"
          style={{ animationDelay: '1.8s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1483721074892-4a858076436c?q=80&w=600&auto=format&fit=crop"
            alt="Fitness reel edit"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[11px] font-bold text-white">Fitness Reel</span>
            <span className="text-[9px] font-mono text-amber-300">920K Views</span>
          </div>
        </div>

        {/* Card 5: Right Mid (+3deg rotation) */}
        <div
          className="relative w-[120px] sm:w-[180px] md:w-[210px] h-[220px] sm:h-[300px] md:h-[340px] rounded-[20px] sm:rounded-[28px] overflow-hidden border border-white/12 hover:border-[#E8501A] shadow-[0_20px_40px_rgba(0,0,0,0.8)] transform rotate-3 hover:rotate-0 hover:scale-108 hover:z-40 transition-all duration-500 group bg-[#160F14] animate-hero-fan-float cursor-pointer"
          style={{ animationDelay: '2.4s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop"
            alt="Outdoor reel edit"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[11px] font-bold text-white">Outdoor Cinematic</span>
            <span className="text-[9px] font-mono text-pink-400">540K Views</span>
          </div>
        </div>

        {/* Card 6: Far Right Big (+8deg rotation) */}
        <div
          className="relative w-[180px] sm:w-[260px] md:w-[300px] h-[280px] sm:h-[380px] md:h-[430px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/12 hover:border-[#E8501A] shadow-[0_24px_50px_rgba(0,0,0,0.85)] transform rotate-6 sm:rotate-8 -translate-y-4 hover:rotate-0 hover:scale-108 hover:z-40 transition-all duration-500 group bg-[#160F14] animate-hero-fan-float cursor-pointer"
          style={{ animationDelay: '3.0s' }}
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
            alt="Creator interview drop"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 flex flex-col justify-between text-left">
            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-2.5 py-1 rounded-full bg-[#E8501A] text-white text-[10px] font-bold uppercase tracking-wider">
                ▶ Active Reel
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-white font-heading block">High-Retention Edit</span>
              <span className="text-[10px] font-mono text-emerald-400">758K Views • +310% Retention</span>
            </div>
          </div>
        </div>
      </div>


      {/* Floating Bottom Pill Badge (Short Video Editing | Content Strategy | Growth Optimization) */}
      <div className="relative z-20 mt-6 inline-flex items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-full bg-[#120B08]/90 border border-white/15 backdrop-blur-xl shadow-2xl text-xs font-semibold text-white/90">
        <div className="flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-[#E8501A]" />
          <span>Short Video Editing</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-primary" />
          <span>Content Strategy</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Growth Optimization</span>
        </div>
      </div>
    </section>
  )
}


