import type { Metadata } from 'next'
import { Syne, Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

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
    default: 'Aficionado',
    template: '%s | Aficionado',
  },
  description: 'A premium social platform connecting creators and fans through immersive short-form video and direct engagement.',
  metadataBase: new URL('https://aficionado.fans'),
  openGraph: {
    siteName: 'Aficionado',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${inter.variable} ${geistMono.variable} min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Ambient background orbs — electric teal brand */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
          <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-primary/12 blur-[130px] mix-blend-screen animate-breathe-calm" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-primary/8 blur-[160px] mix-blend-screen animate-breathe-calm" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[35%] left-[55%] w-[35vw] h-[35vw] rounded-full bg-bio-emerald/8 blur-[120px] mix-blend-screen animate-breathe-calm" style={{ animationDelay: '1.5s' }} />
        </div>

        {children}
      </body>
    </html>
  )
}
