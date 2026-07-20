import type { Metadata } from 'next'
import { Syne, Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/shared/ui/layout/Navigation'
import { MainLayout } from '@/shared/ui/layout/MainLayout'
import { createClient } from '@/shared/lib/supabase/server'

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let userType: 'aficionado' | 'fan' | null = null
  let isAdmin = false

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type, is_admin')
      .eq('id', user.id)
      .single()

    userType = (profile?.user_type as 'aficionado' | 'fan' | null) ?? null
    isAdmin = profile?.is_admin === true
  }

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

        <Navigation isAdmin={isAdmin} userType={userType} />
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}

