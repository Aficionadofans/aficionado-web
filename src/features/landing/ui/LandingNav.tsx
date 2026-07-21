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
        {/* Brand Logo (Ultra Appealing Wordless 3D Crystal Emblem) */}
        <Link
          href="/"
          className="flex items-center focus-visible:outline-none rounded-full group"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#090401]/90 border border-white/20 flex items-center justify-center shadow-[0_0_24px_rgba(232,80,26,0.5)] group-hover:scale-110 group-hover:border-[#E8501A] group-hover:shadow-[0_0_30px_rgba(0,212,200,0.6)] transition-all duration-500 ease-out">
            <img
              src="/nav-logo.png"
              alt="Aficionado Crystal Logo Emblem"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>





        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Landing Navigation">
          <a
            href="#services"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Services
          </a>
          <a
            href="#showcase"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Work
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Contact
          </a>
        </nav>

        {/* Action Button (Exact White Pill Button Match) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-1 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-white/90 shadow-md"
          >
            <span>Get Started</span>
            <span className="text-xs font-bold font-mono">↗</span>
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

