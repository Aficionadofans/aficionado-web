import { LandingNav } from './LandingNav'
import { LandingHero } from './LandingHero'
import { LandingMarquee } from './LandingMarquee'
import { LandingProblem } from './LandingProblem'
import { LandingFix } from './LandingFix'
import { LandingServices } from './LandingServices'
import { LandingProcess } from './LandingProcess'
import { LandingShowcase } from './LandingShowcase'
import { LandingResultsGrid } from './LandingResultsGrid'
import { LandingTestimonial } from './LandingTestimonial'
import { LandingPricing } from './LandingPricing'
import { LandingToolsMarquee } from './LandingToolsMarquee'
import { LandingFAQ } from './LandingFAQ'
import { LandingCTA } from './LandingCTA'
import { LandingFooter } from './LandingFooter'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-foreground flex flex-col font-sans selection:bg-[#E8501A] selection:text-white">
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
        <LandingPricing />
        <LandingToolsMarquee />
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  )
}



