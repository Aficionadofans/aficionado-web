import { StatCounter } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

export function LandingStats() {
  return (
    <>
      <div className="section-divider" />
      <RevealSection threshold={0.2} className="py-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 lg:gap-24">
          <StatCounter label="Creators" target={12400} suffix="+" />
          <StatCounter label="Fans" target={89000} suffix="+" />
          <StatCounter label="Content Pieces" target={1.2} suffix="M+" />
        </div>
      </RevealSection>
      <div className="section-divider" />
    </>
  )
}
