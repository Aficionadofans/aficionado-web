import { SectionHeader } from '@/shared/ui/core'

export function LandingProblemSolution() {
  return (
    <section aria-label="The Problem and The Solution" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: divider above */}
        <div className="section-divider lg:hidden mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-0 items-start">
          {/* Left column — The Problem */}
          <div className="space-y-6 lg:pr-12">
            <SectionHeader
              variant="editorial"
              number="01"
              label="THE PROBLEM"
              title="Creators Deserve Better"
            />
            <div className="space-y-5">
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Most platforms treat creators like content farms. Algorithms decide who sees your
                work, burying your best posts behind pay-to-boost mechanics and engagement traps
                designed to keep fans scrolling — not connecting.
              </p>
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Revenue share is a joke. Platforms take up to 50% of your earnings while your
                dedicated fans never hear from you directly. You built the audience. Someone else
                is cashing in.
              </p>
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Intimacy is impossible at scale. Comment sections become cesspools, DMs get
                flooded, and the real fans — the ones who show up every day — get lost in
                the noise.
              </p>
            </div>
          </div>

          {/* Divider — vertical on desktop, horizontal on mobile (handled via grid gap above) */}
          <div className="hidden lg:block self-stretch">
            <div
              className="h-full w-px mx-auto"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, rgba(0, 212, 200, 0.5), transparent)',
              }}
            />
          </div>

          {/* Right column — The Solution */}
          <div className="space-y-6 lg:pl-12">
            <SectionHeader
              variant="editorial"
              number="02"
              label="THE SOLUTION"
              title="Aficionado"
            />
            <div className="space-y-5">
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Direct creator-fan connection — no algorithm in between. Your content reaches
                every subscriber, every time. Inner Circles let your closest fans access
                exclusive drops and personal conversations.
              </p>
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Fair revenue, full stop. Creators keep the vast majority of what they earn —
                from subscriptions, tips, and exclusive content. You built it, you keep it.
              </p>
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                An anti-dopamine feed built for depth. No infinite scroll engineered for
                addiction. Aficionado surfaces content your fans actually asked for, creating
                real engagement — not phantom metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: divider below */}
        <div className="section-divider lg:hidden mt-12" />
      </div>
    </section>
  )
}
