import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsView } from '@/features/settings/ui/SettingsView'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/settings')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type, username, bio, avatar_url, zip_code')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-background">
      <SettingsView
        userType={profile?.user_type as 'aficionado' | 'fan' | null}
        email={user.email}
        username={profile?.username ?? ''}
        bio={profile?.bio ?? ''}
        avatarUrl={profile?.avatar_url ?? ''}
        zipCode={profile?.zip_code ?? ''}
      />
    </div>
  )
}
