import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsView } from '@/features/settings/ui/SettingsView'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', user.id)
    .single()

  const userType = profile?.user_type as 'aficionado' | 'fan' | null

  return (
    <div className="min-h-screen bg-background">
      <SettingsView userType={userType} email={user.email} />
    </div>
  )
}
