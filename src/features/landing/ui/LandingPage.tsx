import { LandingNav } from './LandingNav'
import { LandingHero } from './LandingHero'
import { LandingStats } from './LandingStats'
import { LandingProblemSolution } from './LandingProblemSolution'
import { LandingFeatures } from './LandingFeatures'
import { LandingPricing } from './LandingPricing'
import { LandingTestimonials } from './LandingTestimonials'
import { LandingCTA } from './LandingCTA'
import { LandingFooter } from './LandingFooter'

export function LandingPage() {
  return (
    <>
      <LandingNav />
      <LandingHero />
      <LandingStats />
      <LandingProblemSolution />
      <LandingFeatures />
      <LandingPricing />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </>
  )
}
