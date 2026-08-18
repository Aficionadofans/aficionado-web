import { LandingCTA } from './LandingCTA'
import { LandingFAQ } from './LandingFAQ'
import { LandingFix } from './LandingFix'
import { LandingFooter } from './LandingFooter'
import { LandingHero } from './LandingHero'
import { LandingMarquee } from './LandingMarquee'
import { LandingNav } from './LandingNav'
import { LandingProblem } from './LandingProblem'
import { LandingProcess } from './LandingProcess'
import { LandingResultsGrid } from './LandingResultsGrid'
import { LandingServices } from './LandingServices'
import { LandingShowcase } from './LandingShowcase'
import { LandingTestimonial } from './LandingTestimonial'
import { LandingToolsMarquee } from './LandingToolsMarquee'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090401] text-foreground flex flex-col font-sans selection:bg-[#E8501A] selection:text-white overflow-x-hidden relative">
      {/* Framer-style exact background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-framer-bars" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-framer-dust animate-dust opacity-30" />

      <div className="relative z-10 flex flex-col w-full h-full">
        <LandingNav />
        <main className="flex-1 w-full">
          <LandingHero />
          <LandingMarquee />
          <LandingProblem />
          <LandingFix />
          <LandingServices />
          <LandingProcess />
          <LandingShowcase />
          <LandingResultsGrid />
          <LandingTestimonial />
          <LandingToolsMarquee />
          <LandingFAQ />
          <LandingCTA />
        </main>
        <LandingFooter />
      </div>
    </div>
  )
}
