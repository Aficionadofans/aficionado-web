'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0A0A0C] border-b border-white/8'
          : 'glass-panel',
      ].join(' ')}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Landing page navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
        >
          <span
            className="text-xl font-bold tracking-[-0.04em]"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #00D4C8 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Aficionado
          </span>
        </Link>

        {/* Right-side links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded px-2 py-1"
          >
            Pricing
          </a>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-[0_0_16px_rgba(0,212,200,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  )
}
