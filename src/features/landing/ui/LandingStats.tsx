import { RevealSection } from '@/shared/ui/motion/RevealSection'

interface StatItem {
  value: string
  label: string
  sublabel: string
}

const stats: StatItem[] = [
  {
    value: '100%',
    label: 'Revenue Ownership',
    sublabel: 'Zero middleman platform cuts',
  },
  {
    value: '0',
    label: 'Infinite Scroll Traps',
    sublabel: 'Anti-dopamine finite feeds',
  },
  {
    value: '12.4k+',
    label: 'Active Inner Circles',
    sublabel: 'Sovereign creator hubs',
  },
  {
    value: '< 24h',
    label: 'Instant Payouts',
    sublabel: 'Direct Stripe & Supabase integration',
  },
]

export function LandingStats() {
  return (
    <section className="relative z-10 py-16 px-4 bg-[#09090C]/60 border-y border-white/8">
      <div className="max-w-6xl mx-auto">
        <RevealSection threshold={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="liquid-glass p-5 sm:p-6 rounded-2xl flex flex-col gap-1 border border-white/8 hover:border-primary/30 transition-all duration-300 group text-center sm:text-left"
              >
                <div
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-teal-300 to-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground font-sans">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

