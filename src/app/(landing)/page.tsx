import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'
import { LandingPage } from '@/features/landing/ui/LandingPage'

export default async function LandingPageRoute({
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

  return <LandingPage />
}
