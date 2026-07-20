import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/shared/ui/layout/Navigation'
import { MainLayout } from '@/shared/ui/layout/MainLayout'
import { createClient } from '@/shared/lib/supabase/server'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Ambient background orbs for Liquid Glass aesthetic */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
          <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-bio-teal/15 blur-[120px] mix-blend-screen animate-breathe-calm" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-primary/10 blur-[150px] mix-blend-screen animate-breathe-calm" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[35%] left-[55%] w-[35vw] h-[35vw] rounded-full bg-bio-emerald/10 blur-[110px] mix-blend-screen animate-breathe-calm" style={{ animationDelay: '1.5s' }} />
        </div>

        <Navigation isAdmin={isAdmin} userType={userType} />
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}

