import type { Metadata } from 'next'
import { Bricolage_Grotesque, Geist_Mono, Inter, Syne } from 'next/font/google'
import { AmbientOrbs } from '@/shared/ui/motion/AmbientOrbs'
import { DustParticles } from '@/shared/ui/motion/DustParticles'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Aficionado | Anti-dopamine Social Media',
    template: '%s | Aficionado',
  },
  description:
    'The anti-dopamine social media platform for Aficionado and Fans. A finite, healthy feed for sovereign creators.',
  metadataBase: new URL('https://aficionado.fans'),
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    siteName: 'Aficionado',
    type: 'website',
    images: [{ url: '/logo.png', width: 1024, height: 1024, alt: 'Aficionado Logo' }],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${syne.variable} ${inter.variable} ${geistMono.variable} min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Floating white dust particle animation */}
        <DustParticles />

        {/* Ambient background orbs — tokenized via CSS custom properties */}
        <AmbientOrbs />

        {children}
      </body>
    </html>
  )
}
