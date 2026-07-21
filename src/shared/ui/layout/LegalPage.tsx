import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LegalTOC } from './LegalTOC'

export interface LegalHeading {
  id: string
  label: string
}

interface LegalPageProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
  backHref?: string
  backLabel?: string
  headings?: LegalHeading[]
}

export function LegalPage({
  title,
  lastUpdated,
  children,
  backHref = '/login',
  backLabel = 'Back to Login',
  headings = [],
}: LegalPageProps) {
  return (
    <div
      className="min-h-screen w-full bg-background py-12 px-6 animate-fade-in-up"
      style={{ animationDuration: '350ms', animationFillMode: 'both' }}
    >
      {/* Outer wrapper — positions sidebar + content side by side on lg */}
      <div className="max-w-6xl mx-auto flex gap-10 items-start">

        {/* Sticky TOC sidebar — only on lg+ */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-64 shrink-0" style={{ position: 'sticky', top: '6rem' }}>
            <LegalTOC headings={headings} />
          </aside>
        )}

        {/* Main content column — capped at max-w-3xl */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLabel}
            </Link>
          </div>

          {/* Page header */}
          <header className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-3">
              01 / LEGAL
            </span>
            <h1
              className="font-black text-foreground text-4xl md:text-5xl leading-tight"
              style={{
                fontFamily: 'var(--font-heading, Syne, sans-serif)',
                letterSpacing: '-0.035em',
                color: '#FAFAFA',
              }}
            >
              {title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </header>

          {/* Section divider */}
          <div className="section-divider mb-10" />

          {/* Content area */}
          <div className="text-white/80 leading-relaxed space-y-8">
            {children}
          </div>

          {/* Footer CTA bar */}
          <div className="mt-14">
            <div className="section-divider mb-8" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Questions? Reach us at{' '}
                <a
                  href="mailto:support@aficionado.fans"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  support@aficionado.fans
                </a>
              </p>
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {backLabel}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/**
 * Convenience wrappers for legal section headings so page authors
 * can render styled h2 / h3 without repeating class strings.
 */
export function LegalH2({
  id,
  children,
}: {
  id?: string
  children: React.ReactNode
}) {
  return (
    <h2
      id={id}
      className="text-2xl font-black text-foreground mb-4 scroll-mt-24"
      style={{
        fontFamily: 'var(--font-heading, Syne, sans-serif)',
        letterSpacing: '-0.035em',
        color: '#FAFAFA',
      }}
    >
      {children}
    </h2>
  )
}

export function LegalH3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-lg font-semibold text-foreground mb-3 scroll-mt-24"
      style={{
        fontFamily: 'var(--font-heading, Syne, sans-serif)',
        letterSpacing: '-0.035em',
        color: '#FAFAFA',
      }}
    >
      {children}
    </h3>
  )
}
