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
 *
 * Reduced-motion: when the user has `prefers-reduced-motion: reduce` active,
 * children are rendered fully visible immediately without any animation class.
 *
 * IntersectionObserver fallback: when the API is unavailable the hook sets
 * `isVisible = true` on mount, so content is always accessible.
 */
export function RevealSection({
  children,
  delay = 0,
  className = '',
  threshold = 0.15,
}: RevealSectionProps) {
  const { ref, isVisible } = useRevealOnScroll(threshold)

  // Respect the user's reduced-motion preference — render immediately visible.
  // Guard against environments where matchMedia is unavailable (SSR, some tests).
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        {children}
      </div>
    )
  }

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
