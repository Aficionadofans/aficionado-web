'use client'
import { useRevealOnScroll } from '@/shared/hooks/useRevealOnScroll'

interface RevealSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  threshold?: number
}

/**
 * Wraps children in a div that fades in upward when it enters the viewport.
 * Uses IntersectionObserver — only animates once, never reverts.
 */
export function RevealSection({
  children,
  delay = 0,
  className = '',
  threshold = 0.15,
}: RevealSectionProps) {
  const { ref, isVisible } = useRevealOnScroll(threshold)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={
        isVisible
          ? { animationDelay: `${delay}ms`, animationFillMode: 'both' }
          : undefined
      }
    >
      {children}
    </div>
  )
}
