'use client'

import { Video, Sparkles, Layers, Sliders, PlayCircle, ShieldCheck } from 'lucide-react'

const tools = [
  { name: 'ADOBE PREMIERE PRO', icon: <Video className="w-4 h-4 text-purple-400" /> },
  { name: 'AFTER EFFECTS', icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
  { name: 'DAVINCI RESOLVE', icon: <Sliders className="w-4 h-4 text-amber-400" /> },
  { name: 'CAPCUT PRO', icon: <PlayCircle className="w-4 h-4 text-emerald-400" /> },
  { name: 'MUX VIDEO INFRASTRUCTURE', icon: <Layers className="w-4 h-4 text-pink-400" /> },
  { name: 'SUPABASE VECTOR & RLS', icon: <ShieldCheck className="w-4 h-4 text-primary" /> },
]

export function LandingToolsMarquee() {
  return (
    <section className="py-16 bg-[#040406] border-y border-white/10 relative z-20">
      <div className="max-w-6xl mx-auto px-4 text-center mb-8">
        <h4
          className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground font-mono"
        >
          WHATEVER TOOL OR FORMAT YOU USE, OUR SOVEREIGN ENGINE SUPPORTS IT
        </h4>
      </div>

      <div className="w-full overflow-hidden relative">
        <div className="flex w-max animate-marquee gap-8 items-center text-xs font-bold uppercase tracking-widest text-white/80 whitespace-nowrap">
          {[...tools, ...tools, ...tools].map((tool, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              {tool.icon}
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
