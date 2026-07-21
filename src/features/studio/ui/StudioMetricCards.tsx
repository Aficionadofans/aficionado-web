'use client'

import React, { useEffect } from 'react'
import { ShieldCheck, AlertTriangle } from 'lucide-react'
import { useCountUp } from '@/shared/hooks/useCountUp'
import { useRevealOnScroll } from '@/shared/hooks/useRevealOnScroll'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

interface FlaggedItem {
  id: string
  title: string
  moderation_status: string
  created_at: string
}

interface StudioMetricCardsProps {
  activeSubscribers?: number
  totalContent?: number
  flaggedContent?: FlaggedItem[]
}

function AnimatedMetric({ value, label }: { value: number; label: string }) {
  const { ref, isVisible } = useRevealOnScroll()
  const { value: count, start } = useCountUp(value)

  useEffect(() => {
    if (isVisible) start()
  }, [isVisible, start])

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="clipcut-card p-6 rounded-3xl border border-white/10 shadow-xl hover:shadow-[0_0_24px_rgba(0,212,200,0.2)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div
        className="text-4xl font-black text-primary drop-shadow-md"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {count}
      </div>
    </div>
  )
}

export function StudioMetricCards({
  activeSubscribers = 0,
  totalContent = 0,
  flaggedContent = [],
}: StudioMetricCardsProps) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevealSection delay={0}>
          <AnimatedMetric value={activeSubscribers} label="Active VIP Subscribers" />
        </RevealSection>
        <RevealSection delay={60}>
          <AnimatedMetric value={totalContent} label="Total Drops Published" />
        </RevealSection>
      </div>

      {/* Content Integrity Shield */}
      <RevealSection delay={120}>
        <div className="clipcut-card p-6 rounded-3xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-bio-emerald/10 border border-bio-emerald/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-bio-emerald" />
              </div>
              <div>
                <h3 className="text-lg font-black text-off-white tracking-tight">Content Integrity Shield</h3>
                <p className="text-xs text-muted-foreground font-medium">AI Automated Safety Audit Status</p>
              </div>
            </div>
            {flaggedContent.length === 0 ? (
              <span className="px-3 py-1 rounded-full bg-bio-emerald/10 border border-bio-emerald/30 text-xs font-bold text-bio-emerald uppercase tracking-wider">
                100% Compliant
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-destructive/10 border border-destructive/30 text-xs font-bold text-destructive uppercase tracking-wider">
                {flaggedContent.length} Action Needed
              </span>
            )}
          </div>

          {flaggedContent.length > 0 && (
            <div className="space-y-3 mt-4 pt-4 border-t border-white/5">
              {flaggedContent.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-xs">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span className="font-bold text-off-white truncate max-w-xs">{item.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-destructive bg-destructive/20 px-2 py-0.5 rounded-full">
                    {item.moderation_status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </RevealSection>
    </section>
  )
}
