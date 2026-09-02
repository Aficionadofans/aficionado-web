import { redirect } from 'next/navigation'
import { CreatorStudio } from '@/features/studio/ui/CreatorStudio'
import { createClient } from '@/shared/lib/supabase/server'

export default async function CreatorPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/creator')

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type, username')
    .eq('id', user.id)
    .single()

  if (profile?.user_type === 'fan') redirect('/home')


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
        flaggedContent={flaggedContent ?? []}
      />
    </div>
  )
}
