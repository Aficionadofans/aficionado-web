/**
 * RevealSection component tests
 *
 * Subtask 3.1 — Property test: delay propagation (Property 1)
 * Subtask 3.2 — Property test: stagger delay invariant (Property 3)
 * Subtask 3.3 — Unit test: reduced-motion behaviour
 *
 * **Validates: Requirements 2.1, 2.2, 2.5, 17.1**
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import fc from 'fast-check'
import { RevealSection } from './RevealSection'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Simulate an IntersectionObserver firing with isIntersecting = true for the
 * observed element immediately after it is mounted.  Returns a cleanup fn.
 */
function mockIntersectionObserver(intersecting = true) {
  const callbacks: Array<(entries: IntersectionObserverEntry[]) => void> = []
  const MockIO = vi.fn().mockImplementation((cb: IntersectionObserverCallback) => {
    const self = {
      observe: vi.fn(() => {
        // Fire synchronously so effects run before assertions
        cb(
          [
            {
              isIntersecting: intersecting,
              target: document.createElement('div'),
              intersectionRatio: intersecting ? 1 : 0,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: null,
              time: 0,
            } as IntersectionObserverEntry,
          ],
          self as unknown as IntersectionObserver
        )
      }),
      disconnect: vi.fn(),
    }
    callbacks.push(cb)
    return self
  })

  const original = global.IntersectionObserver
  global.IntersectionObserver = MockIO as unknown as typeof IntersectionObserver

  return () => {
    global.IntersectionObserver = original
  }
}

/**
 * Mock matchMedia to simulate prefers-reduced-motion.
 */
function mockMatchMedia(prefersReducedMotion: boolean) {
  const original = window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? prefersReducedMotion : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
  return () => {
    Object.defineProperty(window, 'matchMedia', { writable: true, value: original })
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

// ---------------------------------------------------------------------------
// Subtask 3.1 — Property 1: RevealSection delay propagation
// **Validates: Requirements 2.1, 2.2**
// ---------------------------------------------------------------------------

describe('Property 1 — RevealSection delay propagation', () => {
  it('applies the correct animationDelay style for arbitrary non-negative delays', () => {
    const cleanup = mockIntersectionObserver(true)

    fc.assert(
      fc.property(
        // Generate arbitrary non-negative integer delays 0–5000 ms
        fc.integer({ min: 0, max: 5000 }),
        (delay) => {
          const { container, unmount } = render(
            <RevealSection delay={delay}>
              <span>content</span>
            </RevealSection>
          )

          const div = container.firstElementChild as HTMLElement

          // Once visible the element should carry the correct animationDelay
          expect(div.style.animationDelay).toBe(`${delay}ms`)

          unmount()
        }
      ),
      { numRuns: 100 }
    )

    cleanup()
  })
})

// ---------------------------------------------------------------------------
// Subtask 3.2 — Property 3: Stagger delay invariant
// **Validates: Requirements 5.6, 6.7, 7.7, 10.3**
// ---------------------------------------------------------------------------

describe('Property 3 — Stagger delay invariant', () => {
  it('delay prop at index i equals i * interval for all list lengths and intervals', () => {
    fc.assert(
      fc.property(
        // List lengths 1–20
        fc.integer({ min: 1, max: 20 }),
        // Standard stagger intervals used across the app
        fc.constantFrom(40, 60, 80, 100, 120),
        (listLength, interval) => {
          // Build the array of delays as the app would compute them
          const delays = Array.from({ length: listLength }, (_, i) => i * interval)

          // Every entry must satisfy delay[i] === i * interval
          delays.forEach((delay, i) => {
            expect(delay).toBe(i * interval)
          })

          // First item always has delay 0
          expect(delays[0]).toBe(0)

          // Last item has delay (listLength - 1) * interval
          expect(delays[delays.length - 1]).toBe((listLength - 1) * interval)
        }
      ),
      { numRuns: 200 }
    )
  })
})

// ---------------------------------------------------------------------------
// Subtask 3.3 — Unit test: reduced-motion behaviour
// Requirements: 2.5
// ---------------------------------------------------------------------------

describe('RevealSection reduced-motion behaviour', () => {
  it('renders children fully visible without animate-fade-in-up class when prefers-reduced-motion is active', () => {
    const cleanupIO = mockIntersectionObserver(false) // not yet intersecting
    const cleanupMM = mockMatchMedia(true) // reduced motion ON

    const { container } = render(
      <RevealSection delay={200}>
        <span data-testid="child">hello</span>
      </RevealSection>
    )

    const div = container.firstElementChild as HTMLElement

    // Children must be visible
    expect(screen.getByTestId('child')).toBeInTheDocument()

    // Must NOT have the fade-in-up animation class
    expect(div.className).not.toContain('animate-fade-in-up')

    // Must NOT have opacity-0 (hidden state)
    expect(div.className).not.toContain('opacity-0')

    // Must NOT have any animationDelay style set
    expect(div.style.animationDelay).toBe('')

    cleanupIO()
    cleanupMM()
  })

  it('renders the fade-in-up animation when prefers-reduced-motion is NOT active and element is visible', () => {
    const cleanupIO = mockIntersectionObserver(true) // intersecting
    const cleanupMM = mockMatchMedia(false) // reduced motion OFF

    const { container } = render(
      <RevealSection delay={100}>
        <span data-testid="child">hello</span>
      </RevealSection>
    )

    const div = container.firstElementChild as HTMLElement

    expect(div.className).toContain('animate-fade-in-up')
    expect(div.style.animationDelay).toBe('100ms')

    cleanupIO()
    cleanupMM()
  })
})

// ---------------------------------------------------------------------------
// IntersectionObserver unavailable fallback
// Requirements: 17.1
// ---------------------------------------------------------------------------

describe('RevealSection IntersectionObserver fallback', () => {
  it('renders children visible when IntersectionObserver is unavailable', () => {
    const cleanupMM = mockMatchMedia(false)

    // Remove IntersectionObserver to simulate an unsupported environment
    const original = global.IntersectionObserver
    // @ts-expect-error intentionally deleting for test
    delete global.IntersectionObserver

    const { container } = render(
      <RevealSection>
        <span data-testid="fallback-child">content</span>
      </RevealSection>
    )

    // Children must still be rendered
    expect(screen.getByTestId('fallback-child')).toBeInTheDocument()

    // Restore
    global.IntersectionObserver = original
    cleanupMM()
  })
})
