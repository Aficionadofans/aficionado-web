import { CreatorStudio } from '@/features/studio/ui/CreatorStudio'
import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CreatorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/creator')

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type, username')
    .eq('id', user.id)
    .single()

  if (profile?.user_type === 'fan') redirect('/home')

  // Active subscriber count
  const { count: activeSubscribers } = await supabase
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('creator_id', user.id)
    .eq('status', 'active')

  // Total content count
  const { count: totalContent } = await supabase
    .from('content')
    .select('*', { count: 'exact', head: true })
    .eq('author_id', user.id)

  // Flagged content needing review
  const { data: flaggedContent } = await supabase
    .from('content')
    .select('id, title, moderation_status, created_at')
    .eq('author_id', user.id)
    .eq('moderation_status', 'pending_review')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-background">
      <CreatorStudio
        username={profile?.username ?? ''}
        activeSubscribers={activeSubscribers ?? 0}
        totalContent={totalContent ?? 0}
        flaggedContent={flaggedContent ?? []}
      />
    </div>
  )
}
