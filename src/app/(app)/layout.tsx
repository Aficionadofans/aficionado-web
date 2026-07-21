import { Navigation } from '@/shared/ui/layout/Navigation'
import { MainLayout } from '@/shared/ui/layout/MainLayout'
import { createClient } from '@/shared/lib/supabase/server'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
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
    <>
      <Navigation isAdmin={isAdmin} userType={userType} />
      <MainLayout>
        {children}
      </MainLayout>
    </>
  )
}
