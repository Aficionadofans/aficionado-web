'use client'

import { Film, Target, TrendingUp, Zap, Sparkles, ShieldCheck, Flame, PlayCircle } from 'lucide-react'

const lanePills = [
  { text: 'Short Video Editing', icon: <Film className="w-3.5 h-3.5 text-[#E8501A]" />, badge: '9:16 Shorts' },
  { text: 'Content Strategy', icon: <Target className="w-3.5 h-3.5 text-primary" />, badge: 'Retention' },
  { text: 'Growth Optimization', icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />, badge: '+3.5X Reach' },
  { text: 'Fast 24-48h Turnaround', icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, badge: 'Express' },
  { text: '100% Direct Payouts', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#E8501A]" />, badge: '0% Cuts' },
  { text: 'Hook-Driven Edits', icon: <Flame className="w-3.5 h-3.5 text-pink-400" />, badge: 'High Watch Time' },
  { text: 'Live HD Broadcasts', icon: <PlayCircle className="w-3.5 h-3.5 text-primary" />, badge: 'Low Latency' },
  { text: 'Sovereign Fan Circles', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />, badge: 'VIP Vault' },
]

export function LandingMarquee() {
  return (
    <section className="w-full py-6 bg-[#060302] border-y border-white/10 overflow-hidden relative z-20">
      {/* Subtle fade edges for smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060302] to-transparent z-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060302] to-transparent z-30 pointer-events-none" />

      {/* Infinite Animated Pill Lane */}
      <div className="flex w-max animate-marquee gap-4 items-center whitespace-nowrap">
        {[...lanePills, ...lanePills, ...lanePills].map((pill, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#140C09]/90 border border-white/12 hover:border-[#E8501A]/60 transition-all duration-300 shadow-lg group cursor-default"
          >
            <div className="p-1 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
              {pill.icon}
            </div>
            <span className="text-xs font-semibold text-white/90 font-sans group-hover:text-white transition-colors">
              {pill.text}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-white/60">
              {pill.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
