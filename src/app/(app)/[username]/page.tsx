import { notFound } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'
import { CreatorProfileClient } from './CreatorProfileClient'

export default async function CreatorProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { username } = await params
  const resolvedSearchParams = await searchParams
  const source =
    typeof resolvedSearchParams.source === 'string' ? resolvedSearchParams.source : undefined
  const supabase = await createClient()

  // Fetch creator profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, bio, avatar_url, user_type, zip_code')
    .eq('username', username)
    .single()

  if (!profile) notFound()

  // Fetch public content
  const { data: contentItems } = await supabase
    .from('content')
    .select('id, mux_playback_id, title, description, visibility')
    .eq('author_id', profile.id)
    .eq('moderation_status', 'approved')
    .in('visibility', ['public', 'subscriber'])
    .order('created_at', { ascending: false })
    .limit(12)

  // Fetch circle ID
  const { data: circle } = await supabase
    .from('circles')
    .select('id')
    .eq('owner_id', profile.id)
    .single()

  // Determine if local collab is possible
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let isLocalCollab = false
  if (user && profile.zip_code) {
    const { data: viewerProfile } = await supabase
      .from('profiles')
      .select('zip_code, user_type')
      .eq('id', user.id)
      .single()
    isLocalCollab =
      viewerProfile?.user_type === 'aficionado' &&
      !!viewerProfile?.zip_code &&
      viewerProfile.zip_code === profile.zip_code &&
      user.id !== profile.id
  }

  return (
    <CreatorProfileClient
      profile={profile}
      contentItems={contentItems ?? []}
      circleId={circle?.id ?? ''}
      source={source}
      isLocalCollab={isLocalCollab}
    />
  )
}
