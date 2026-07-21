import Link from 'next/link'
import { Play, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react'

export function LandingHero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#070709]">
      {/* Hero ambient radial glow overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(232,80,26,0.18)_0%,rgba(0,212,200,0.1)_40%,transparent_70%)] blur-[120px] pointer-events-none rounded-full" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        
        {/* ClipCut Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8501A]/10 border border-[#E8501A]/40 text-[#E8501A] text-xs font-bold uppercase tracking-widest animate-fade-in-up shadow-[0_0_16px_rgba(232,80,26,0.25)]">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>SOVEREIGN CREATOR ENGINE • SHORT-FORM DROPS</span>
        </div>

        {/* Bricolage Display Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] text-foreground leading-[0.98] max-w-5xl uppercase"
          style={{ fontFamily: 'var(--font-bricolage), var(--font-heading)' }}
        >
          SCALE YOUR BRAND WITH{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#E8501A] to-primary">
            BOLD SHORT-FORM DROPS.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-sans">
          The high-converting sovereign creator platform — drop exclusive videos, stream live to your Inner Circle, and keep 100% of fan payments without algorithm traps or infinite scroll.
        </p>

        {/* Dual Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#E8501A] px-9 py-4 text-xs font-extrabold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#FF5500] hover:shadow-[0_0_36px_rgba(232,80,26,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8501A]"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-9 py-4 text-xs font-extrabold uppercase tracking-widest text-foreground transition-all duration-300 hover:border-[#E8501A]/50 hover:bg-white/10 hover:text-white"
          >
            <span>Explore Video Showcase</span>
          </a>
        </div>

        {/* Highlight Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E8501A]" />
            <span>100% Direct Payouts</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Zero Infinite Scroll</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#E8501A]" />
            <span>Gated Fan Circles</span>
          </div>
        </div>


        {/* Interactive Media Showcase Card Frame (ClipCut Template Feature) */}
        <div className="w-full max-w-4xl mt-8 rounded-2xl liquid-glass border border-white/12 p-3 sm:p-4 shadow-[0_24px_64px_rgba(0,0,0,0.8)] relative group overflow-hidden">
          {/* Card header mockup */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/8 mb-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-[11px]">aficionado.fans/live/@creator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold text-[10px] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> Live Session
              </span>
            </div>
          </div>

          {/* Media Player Showcase Body */}
          <div className="relative aspect-video rounded-xl bg-gradient-to-br from-[#121217] via-[#0E0E12] to-[#08080A] border border-white/8 overflow-hidden flex flex-col justify-between p-6">
            {/* Background image mockup pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,200,0.15),transparent_60%)] pointer-events-none" />

            {/* Top tags */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="clipcut-pill px-3 py-1 text-[11px]">
                Inner Circle Spotlight
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-white/70 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span>HD 4K</span>
                <span>•</span>
                <span>60 FPS</span>
              </div>
            </div>

            {/* Play Button Center Overlay */}
            <div className="relative z-10 my-auto flex flex-col items-center gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(0,212,200,0.4)] cursor-pointer">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Watch Platform Demo
              </span>
            </div>

            {/* Bottom creator bar */}
            <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-xl p-3 sm:p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-400 p-[2px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs text-primary">
                    AF
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Elena Vance</h4>
                  <p className="text-xs text-muted-foreground">Exclusive Audio & Video Drops</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
                <div className="text-right">
                  <div className="text-primary font-bold">12.4k</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Subscribers</div>
                </div>
                <div className="w-[1px] h-6 bg-white/15" />
                <div className="text-right">
                  <div className="text-emerald-400 font-bold">$18.5k</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Monthly Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

