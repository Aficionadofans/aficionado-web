import { SectionHeader } from '@/shared/ui/core'
import { XCircle, CheckCircle2 } from 'lucide-react'

export function LandingProblemSolution() {
  return (
    <section aria-label="The Problem and The Solution" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeader
            variant="editorial"
            number="01"
            label="THE PARADIGM SHIFT"
            title="Designed to empower creators, not exploit them."
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Legacy social networks profit by keeping users addicted to infinite feeds while taking massive platform cuts. Aficionado flips the model completely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Platforms Card */}
          <div className="liquid-glass p-6 sm:p-8 rounded-3xl border border-red-500/20 bg-red-950/10 flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider w-fit">
                <XCircle className="w-4 h-4" />
                <span>The Legacy Trap</span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-extrabold text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Broken Algorithms & Revenue Cuts
              </h3>

              <ul className="flex flex-col gap-4 mt-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>50% Platform Cuts:</strong> Legacy giants take up to half of creator revenue while controlling your audience list.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Infinite Scroll Drain:</strong> Algorithms prioritize rage-bait and mindless doomscrolling over quality creator-fan depth.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Pay-to-Reach Mechanics:</strong> Only 5-10% of your followers ever see your posts unless you pay for ads.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-red-300 font-mono">
              Status: High Burnout • Low Creator Retention
            </div>
          </div>

          {/* Aficionado Solution Card */}
          <div className="liquid-glass p-6 sm:p-8 rounded-3xl border border-primary/30 bg-primary/5 flex flex-col justify-between gap-6 relative overflow-hidden shadow-[0_0_40px_rgba(0,212,200,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Aficionado Model</span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-extrabold text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Sovereign Monetization & Anti-Addiction Feeds
              </h3>

              <ul className="flex flex-col gap-4 mt-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>100% Direct Payouts:</strong> Direct fan subscriptions and tips straight to your account with zero platform extortion.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Finite Digital Well-Being:</strong> Anti-dopamine feed guarantees fans stay engaged without endless doomscrolling.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Gated Fan Inner Circles:</strong> Host live sessions and drop exclusive content for your most loyal supporters.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-primary/20 text-xs text-primary font-mono flex items-center justify-between">
              <span>Status: Sovereign Creator Control</span>
              <span className="font-bold">100% Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

