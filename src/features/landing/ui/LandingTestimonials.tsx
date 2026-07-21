import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

interface Testimonial {
  name: string
  handle: string
  quote: string
  initial: string
  avatarBg: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    handle: '@sarahcreates',
    initial: 'S',
    avatarBg: 'rgba(0, 212, 200, 0.15)',
    quote:
      'Finally a platform that pays creators fairly. My revenue has tripled in 3 months.',
  },
  {
    name: 'Marcus Webb',
    handle: '@marcuswebb',
    initial: 'M',
    avatarBg: 'rgba(0, 212, 200, 0.10)',
    quote:
      'The inner circle feature changed everything. My top fans feel genuinely connected to my work.',
  },
  {
    name: 'Priya Nair',
    handle: '@priyafan',
    initial: 'P',
    avatarBg: 'rgba(0, 212, 200, 0.12)',
    quote:
      'I actually discover content I want to watch. No more doom-scrolling.',
  },
  {
    name: 'James Okafor',
    handle: '@jamesvideo',
    initial: 'J',
    avatarBg: 'rgba(0, 212, 200, 0.18)',
    quote:
      'Going live on Aficionado feels intimate. My audience actually shows up and stays.',
  },
  {
    name: 'Luna Park',
    handle: '@lunapark',
    initial: 'L',
    avatarBg: 'rgba(0, 212, 200, 0.08)',
    quote:
      'As a fan, I love supporting creators directly without ads getting in the way.',
  },
  {
    name: 'David Torres',
    handle: '@dtorres',
    initial: 'D',
    avatarBg: 'rgba(0, 212, 200, 0.13)',
    quote:
      'The analytics are incredible. I finally understand what my audience wants.',
  },
]

export function LandingTestimonials() {
  return (
    <section className="w-full py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          variant="editorial"
          number="05"
          label="VOICES"
          title="What creators and fans are saying."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, index) => (
            <RevealSection key={t.handle} delay={index * 100}>
              <div className="clipcut-card h-full p-6 flex flex-col gap-4">
                {/* Avatar + identity */}
                <div className="flex items-center gap-3">
                  {/* Avatar circle with teal-tinted bg and initial */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: t.avatarBg,
                      border: '1px solid rgba(0, 212, 200, 0.25)',
                    }}
                  >
                    <span
                      className="text-sm font-bold text-primary"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {t.initial}
                    </span>
                  </div>

                  {/* Name + handle */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-sm font-semibold text-white leading-tight truncate"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {t.name}
                    </span>
                    <span
                      className="text-xs font-medium truncate"
                      style={{ color: 'var(--primary)' }}
                    >
                      {t.handle}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
