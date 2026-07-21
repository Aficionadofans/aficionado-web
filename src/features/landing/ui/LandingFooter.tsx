import NextLink from 'next/link'
import { Sparkles, Globe, Share2, MessageCircle } from 'lucide-react'

export function LandingFooter() {
  return (
    <footer className="w-full bg-[#050507] border-t border-white/10 relative z-10 text-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/8">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <NextLink href="/" className="flex items-center gap-2 w-fit">
              <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(0,212,200,0.3)]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span
                className="text-lg font-extrabold tracking-[-0.03em] text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Aficionado<span className="text-primary">.</span>
              </span>
            </NextLink>

            <p className="text-muted-foreground text-xs leading-relaxed max-w-sm">
              The sovereign creator platform designed for finite engagement, direct fan monetization, and digital well-being.
            </p>

            <div className="flex items-center gap-3 mt-2 text-muted-foreground">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-primary/40 hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-primary/40 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-primary/40 hover:text-primary transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>


          {/* Navigation Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Platform</h4>
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#showcase" className="text-muted-foreground hover:text-primary transition-colors">Showcase</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
          </div>

          {/* Product Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Creators</h4>
            <NextLink href="/login" className="text-muted-foreground hover:text-primary transition-colors">Creator Login</NextLink>
            <NextLink href="/monetization" className="text-muted-foreground hover:text-primary transition-colors">Direct Payouts</NextLink>
            <NextLink href="/login" className="text-muted-foreground hover:text-primary transition-colors">Inner Circles</NextLink>
            <NextLink href="/login" className="text-muted-foreground hover:text-primary transition-colors">Live Broadcasts</NextLink>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Legal & Governance</h4>
            <NextLink href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</NextLink>
            <NextLink href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</NextLink>
            <NextLink href="/creator-agreement" className="text-muted-foreground hover:text-primary transition-colors">Creator Agreement</NextLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground text-[11px]">
          <p>© {new Date().getFullYear()} Aficionado. All rights reserved.</p>
          <p className="font-mono">Built for Sovereign Creators • Next.js 16 Client</p>
        </div>
      </div>
    </footer>
  )
}

