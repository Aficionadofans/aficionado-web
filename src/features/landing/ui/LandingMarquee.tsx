'use client'

import { Sparkles, Zap, Shield, Flame, Radio, Lock } from 'lucide-react'

const tickerItems = [
  { text: '100% DIRECT PAYOUTS', icon: <Zap className="w-3.5 h-3.5 text-primary" /> },
  { text: 'ZERO INFINITE SCROLL', icon: <Shield className="w-3.5 h-3.5 text-primary" /> },
  { text: 'SHORT-FORM VIDEO DROPS', icon: <Flame className="w-3.5 h-3.5 text-primary" /> },
  { text: 'GATED FAN CIRCLES', icon: <Sparkles className="w-3.5 h-3.5 text-primary" /> },
  { text: 'LIVE HD BROADCASTS', icon: <Radio className="w-3.5 h-3.5 text-primary" /> },
  { text: 'DATA SOVEREIGNTY', icon: <Lock className="w-3.5 h-3.5 text-primary" /> },
]

export function LandingMarquee() {
  return (
    <div className="w-full py-4 bg-[#050507] border-y border-white/10 overflow-hidden relative z-20">
      <div className="flex w-max animate-marquee gap-8 items-center text-xs font-extrabold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {/* Render twice for continuous loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {item.icon}
            <span className="hover:text-primary transition-colors cursor-default">
              {item.text}
            </span>
            <span className="text-white/20 ml-2">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
