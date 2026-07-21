import type { Metadata } from 'next'
import { Bricolage_Grotesque, Syne, Inter, Geist_Mono } from 'next/font/google'
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
    default: 'Aficionado',
    template: '%s | Aficionado',
  },
  description: 'The bold, conversion-focused sovereign creator platform for short-form video drops, live streams, and direct fan monetization.',
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

export default function RootLayout({

  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${syne.variable} ${inter.variable} ${geistMono.variable} min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Floating white dust particle animation */}
        <DustParticles />

        {/* Ambient background orbs — fiery orange + electric teal gradient theme */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#090401]">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E8501A]/10 blur-[150px] mix-blend-screen animate-breathe-calm" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-primary/10 blur-[160px] mix-blend-screen animate-breathe-calm" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-[#FF3B00]/8 blur-[140px] mix-blend-screen animate-breathe-calm" style={{ animationDelay: '1.5s' }} />
        </div>


        {children}
      </body>
    </html>
  )
}

