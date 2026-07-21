'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useCountUp } from '@/shared/hooks/useCountUp'
import { useRevealOnScroll } from '@/shared/hooks/useRevealOnScroll'

export interface StatCounterProps {
  label: string
  target: number
  suffix?: string
  className?: string
}

/**
 * Animated stat counter that triggers once on viewport entry.
 * Respects `prefers-reduced-motion` — shows the target value immediately.
 */
export function StatCounter({ label, target, suffix = '', className }: StatCounterProps) {
  const { ref, isVisible } = useRevealOnScroll(0.15)
  const { value, start } = useCountUp(target)
  const startedRef = useRef(false)

  // Detect prefers-reduced-motion once on mount
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (startedRef.current) return
    if (prefersReducedMotion) return // show target immediately via display value
    if (isVisible) {
      startedRef.current = true
      start()
    }
  }, [isVisible, prefersReducedMotion, start])

  const displayValue = prefersReducedMotion ? target : value

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('flex flex-col items-center gap-1', className)}
    >
      <span className="stat-counter">
        {displayValue.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-[0.08em]">
        {label}
      </span>
    </div>
  )
}
