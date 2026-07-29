import { WatchPartyTheater } from '@/features/live/ui/WatchPartyTheater'
import { createClient } from '@/shared/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function LiveWatchPartyPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()

  // 1. Find the profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single()

  if (!profile) {
    notFound()
  }

  // 2. Fetch the latest live stream record for this creator
  const { data: liveRecord } = await supabase
    .from('content')
    .select('mux_playback_id')
    .eq('author_id', profile.id)
    .eq('description', 'LIVESTREAM_RECORD')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // 3. Check if current user is the owner
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isOwner = user?.id === profile.id

  return (
    <WatchPartyTheater
      username={username}
      playbackId={liveRecord?.mux_playback_id || undefined}
      isOwner={isOwner}
    />
  )
}
