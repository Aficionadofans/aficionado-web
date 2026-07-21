import { LandingNav } from './LandingNav'
import { LandingHero } from './LandingHero'
import { LandingMarquee } from './LandingMarquee'
import { LandingStats } from './LandingStats'
import { LandingProblemSolution } from './LandingProblemSolution'
import { LandingFeatures } from './LandingFeatures'
import { LandingProcess } from './LandingProcess'
import { LandingShowcase } from './LandingShowcase'
import { LandingPricing } from './LandingPricing'
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
        <LandingStats />
        <LandingProblemSolution />
        <LandingFeatures />
        <LandingProcess />
        <LandingShowcase />
        <LandingPricing />
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  )
}


