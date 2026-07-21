'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref to attach to any element and a boolean `isVisible` that becomes
 * true (and stays true) once the element enters the viewport.
 *
 * Graceful fallback: when `IntersectionObserver` is unavailable (e.g. SSR or
 * old browsers) `isVisible` is set to `true` immediately so content is always
 * accessible.
 */
export function useRevealOnScroll(threshold = 0.15, rootMargin = '0px') {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Graceful fallback when IntersectionObserver is not available
    let observer: IntersectionObserver
    try {
      const el = ref.current
      if (!el) return

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect() // fire once
          }
        },
        { threshold, rootMargin }
      )
      observer.observe(el)
    } catch {
      // IntersectionObserver unavailable — reveal immediately
      setIsVisible(true)
    }

    return () => observer?.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
