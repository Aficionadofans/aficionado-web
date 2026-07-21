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


        {/* Animated Curved Cards 3D Stack Container (Framer Template Feature) */}
        <div className="w-full max-w-5xl mt-12 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
          {/* Back Curved Card Left (-6deg rotation) */}
          <div className="curved-card p-6 w-[280px] sm:w-[340px] h-[360px] sm:h-[400px] absolute left-2 sm:left-12 top-4 -rotate-6 scale-95 opacity-60 hover:opacity-100 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-500 border border-[#E8501A]/30 bg-[#160E1A]/90 hidden md:flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#E8501A]/20 border border-[#E8501A]/40 text-[#E8501A] text-[10px] font-bold uppercase tracking-wider">
                Reels & TikTok Drop
              </span>
              <span className="text-xs font-mono text-white/50">9:16 HD</span>
            </div>
            <div className="my-auto text-left flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-2">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <h4 className="text-base font-extrabold text-white font-heading">High-Retention Short Edits</h4>
              <p className="text-xs text-muted-foreground">+420% Audience Retention & Reach</p>
            </div>
            <div className="p-3 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono text-primary">
              <span>Views: 1.4M</span>
              <span>100% Verified</span>
            </div>
          </div>

          {/* Back Curved Card Right (+6deg rotation) */}
          <div className="curved-card p-6 w-[280px] sm:w-[340px] h-[360px] sm:h-[400px] absolute right-2 sm:right-12 top-4 rotate-6 scale-95 opacity-60 hover:opacity-100 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-500 border border-primary/30 bg-[#0C151A]/90 hidden md:flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-wider">
                Gated Inner Circle
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">$49/mo</span>
            </div>
            <div className="my-auto text-left flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-[#E8501A]/20 border border-[#E8501A]/40 flex items-center justify-center text-[#E8501A] mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-white font-heading">VIP Fan Vault & Stream</h4>
              <p className="text-xs text-muted-foreground">Direct Fan Subscriptions straight to bank</p>
            </div>
            <div className="p-3 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
              <span>Subscribers: 4,820</span>
              <span>100% Payout</span>
            </div>
          </div>

          {/* Center Main Hero Curved Card (0deg rotation, z-20) */}
          <div className="curved-card-hover p-5 sm:p-7 w-full max-w-xl h-[380px] sm:h-[420px] relative z-20 flex flex-col justify-between border-2 border-[#E8501A]/50 bg-gradient-to-br from-[#1A1222]/95 via-[#110D18]/95 to-[#09060E]/95 shadow-[0_30px_70px_rgba(0,0,0,0.95)] group">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-mono text-[11px] text-muted-foreground ml-1">aficionado.fans/@sovereignty</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#E8501A] text-black font-extrabold text-[10px] uppercase tracking-widest shadow-[0_0_12px_rgba(232,80,26,0.5)]">
                LIVE DEMO
              </span>
            </div>

            {/* Middle Player View */}
            <div className="my-auto flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#FF5500] to-[#E8501A] flex items-center justify-center text-white shadow-[0_0_30px_rgba(232,80,26,0.6)] group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </div>
              <div>
                <h3
                  className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase"
                  style={{ fontFamily: 'var(--font-bricolage), var(--font-heading)' }}
                >
                  THE SOVEREIGN CREATOR ENGINE
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                  Experience short-form video drops & live streaming built with 2rem curved card containers.
                </p>
              </div>
            </div>

            {/* Bottom Metrics Bar */}
            <div className="p-3 sm:p-4 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8501A]/20 border border-[#E8501A] flex items-center justify-center text-xs font-bold text-[#E8501A]">
                  AF
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">Sovereign Drop #08</div>
                  <div className="text-[10px] text-muted-foreground">Short-Form Video & Audio</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-primary font-bold text-sm">$32.4k/mo</div>
                <div className="text-[10px] text-muted-foreground uppercase">100% Direct Payout</div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

