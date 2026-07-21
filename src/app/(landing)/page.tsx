import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'

// Placeholder until src/features/landing/ui/LandingPage is built in a later task.
function LandingPagePlaceholder() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-6 bg-background">
      <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tight text-foreground" style={{ letterSpacing: '-0.04em' }}>
        Aficionado
      </h1>
      <p className="text-muted-foreground text-xl">The anti-dopamine social network.</p>
    </div>
  )
}

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; next?: string }>
}) {
  // Handle legacy OAuth code param (forward to callback)
  const { code, next } = await searchParams
  if (code) {
    const params = new URLSearchParams({ code })
    if (next) params.set('next', next)
    redirect(`/auth/callback?${params.toString()}`)
  }

  // Auth check — authenticated users go straight to the app
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/home')
  }

  // TODO: Replace placeholder with <LandingPage /> once
  // src/features/landing/ui/LandingPage.tsx is created.
  return <LandingPagePlaceholder />
}
