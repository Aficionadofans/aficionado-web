'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 pointer-events-none">
      <div
        className={`mx-auto max-w-5xl pointer-events-auto transition-all duration-300 rounded-full px-5 py-2.5 flex items-center justify-between border ${
          scrolled
            ? 'bg-[#0A0A0C]/90 backdrop-blur-xl border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.8)]'
            : 'liquid-glass border-white/10'
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full"
        >
          <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(0,212,200,0.3)]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span
            className="text-lg font-extrabold tracking-[-0.03em] text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Aficionado<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Landing Navigation">
          <a
            href="#features"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            Features
          </a>
          <a
            href="#showcase"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            Showcase
          </a>
          <a
            href="#pricing"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            FAQ
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(0,212,200,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-5xl pointer-events-auto rounded-2xl liquid-glass border border-white/12 p-5 flex flex-col gap-4 animate-fade-in-up shadow-2xl">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-muted-foreground hover:text-primary py-1"
          >
            Features
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-muted-foreground hover:text-primary py-1"
          >
            Showcase
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-muted-foreground hover:text-primary py-1"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-muted-foreground hover:text-primary py-1"
          >
            FAQ
          </a>
          <div className="h-[1px] bg-white/10 w-full my-1" />
          <div className="flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-full border border-white/15 text-sm font-semibold text-foreground hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-primary text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[0_0_16px_rgba(0,212,200,0.35)]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

