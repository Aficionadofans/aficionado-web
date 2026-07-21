import Link from 'next/link'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

export function LandingCTA() {
  return (
    <section className="relative w-full py-24 md:py-36 px-4 overflow-hidden bg-[#0A0A0C]">
      {/* Hero gradient overlay */}
      <div
        className="clipcut-hero-gradient absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient teal orb */}
      <div
        className="animate-breathe-calm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 212, 200, 0.14) 0%, rgba(0, 212, 200, 0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <RevealSection delay={0} className="relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          {/* Headline */}
          <h2
            className="font-heading font-black text-[40px] md:text-[64px] text-foreground leading-[1.05]"
            style={{ letterSpacing: '-0.04em' }}
          >
            Ready to own your{' '}
            <span className="text-primary">audience?</span>
          </h2>

          {/* Sub-headline */}
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Join thousands of creators who have left the algorithm behind.
            Build your community, monetise your craft, and keep what you earn.
          </p>

          {/* CTA button */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-base px-10 py-3.5 mt-2 transition-all duration-200 hover:bg-primary-hover hover:shadow-[0_0_32px_rgba(0,212,200,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            Join for Free
          </Link>
        </div>
      </RevealSection>
    </section>
  )
}
