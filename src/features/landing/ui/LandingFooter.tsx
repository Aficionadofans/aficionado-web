import Link from 'next/link'
import { Globe } from 'lucide-react'

export function LandingFooter() {
  return (
    <footer className="w-full bg-[#0A0A0C]">
      {/* Section divider */}
      <div className="section-divider" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: wordmark + copyright */}
          <div className="flex flex-col gap-1.5">
            <Link
              href="/"
              className="inline-block w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
              aria-label="Aficionado home"
            >
              <span
                className="text-lg font-bold tracking-[-0.04em]"
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
            <p className="text-sm text-muted-foreground">
              © 2025 Aficionado. All rights reserved.
            </p>
          </div>

          {/* Right: legal links + social icons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {/* Legal links */}
            <nav
              className="flex flex-wrap items-center gap-4"
              aria-label="Legal links"
            >
              <Link
                href="/terms"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
              >
                Privacy Policy
              </Link>
              <Link
                href="/creator-agreement"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
              >
                Creator Agreement
              </Link>
            </nav>

            {/* Social icon links */}
            <div className="flex items-center gap-3" aria-label="Social links">
              {/* X (Twitter) — inline SVG as lucide-react dropped the Twitter icon */}
              <a
                href="https://twitter.com/aficionadohq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aficionado on X (Twitter)"
                className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded p-0.5"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/aficionadohq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aficionado on Instagram"
                className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded p-0.5"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
