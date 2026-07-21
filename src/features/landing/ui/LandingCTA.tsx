import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

export function LandingCTA() {
  return (
    <section className="relative w-full py-28 md:py-36 px-4 overflow-hidden bg-[#070709] border-t border-white/8">
      {/* Ambient glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/15 blur-[160px] pointer-events-none rounded-full" />

      <RevealSection delay={0} className="relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 liquid-glass p-8 sm:p-14 rounded-3xl border border-white/12 shadow-[0_32px_80px_rgba(0,0,0,0.9)]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join the Sovereign Creator Revolution</span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-black text-foreground leading-[1.05]"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
          >
            Ready to build your empire{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-200 to-white">
              without burning out?
            </span>
          </h2>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Leave legacy infinite scroll traps behind. Own your fan relationships, stream live, and keep 100% of direct fan subscriptions today.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-black font-extrabold text-sm uppercase tracking-wider px-10 py-4 transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_36px_rgba(0,212,200,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </RevealSection>
    </section>
  )
}

