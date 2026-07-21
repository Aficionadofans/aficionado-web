import { LandingNav } from './LandingNav'
import { LandingHero } from './LandingHero'
import { LandingStats } from './LandingStats'
import { LandingProblemSolution } from './LandingProblemSolution'
import { LandingFeatures } from './LandingFeatures'
import { LandingShowcase } from './LandingShowcase'
import { LandingPricing } from './LandingPricing'
import { LandingFAQ } from './LandingFAQ'
import { LandingCTA } from './LandingCTA'
import { LandingFooter } from './LandingFooter'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-foreground flex flex-col font-sans selection:bg-primary selection:text-black">
      <LandingNav />
      <main className="flex-1 w-full">
        <LandingHero />
        <LandingStats />
        <LandingProblemSolution />
        <LandingFeatures />
        <LandingShowcase />
        <LandingPricing />
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  )
}

