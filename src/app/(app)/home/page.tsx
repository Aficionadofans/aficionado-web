import { redirect } from 'next/navigation'
import type { Drop } from '@/features/feed/ui/DropZoneCarousel'
import { FanFeed, type Video } from '@/features/feed/ui/FanFeed'
import { createClient } from '@/shared/lib/supabase/server'
import type { Content } from '@/shared/types/database'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Fallback to admin client to bypass any restrictive RLS that might hide drops/videos from followers
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  let dbClient = supabase
  if (serviceRoleKey && supabaseUrl) {
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    dbClient = createAdminClient(supabaseUrl, serviceRoleKey)
  }

  // 1. Fetch creators this user is following
  const { data: subs } = await dbClient
    .from('subscriptions')
    .select('creator_id')
    .eq('subscriber_id', user.id)
    .eq('status', 'active')

  // The feed should include the user's own content + content from creators they follow
  const creatorIds = (subs || []).map((s) => s.creator_id)
  const feedUserIds = [user.id, ...creatorIds]

  // 2. Fetch approved content for these users (and the user's own content regardless of status)
  const { data: contentData } = await dbClient
    .from('content')
    .select('id, mux_playback_id, description, moderation_status, status, profiles!inner(username)')
    .or(`moderation_status.eq.approved,author_id.eq.${user.id}`)
    .in('author_id', feedUserIds)
    .or(`mux_playback_id.not.is.null,author_id.eq.${user.id}`)
    .order('created_at', { ascending: false })
    .limit(20)

  const videos: Video[] = (contentData ?? []).map((c) => {
    const profile = Array.isArray(c.profiles) ? c.profiles[0] : c.profiles
    return {
      id: c.id as string,
      creator: (profile as { username?: string })?.username ?? 'unknown',
      description: (c.description as string) ?? '',
      playbackId: c.mux_playback_id as string | null,
      likes: '0',
      comments: '0',
      isSubscribed: true, // They are subscribed or it's their own
      moderationStatus: (c.moderation_status as Content['moderation_status']) ?? 'approved',
      status: c.status as Content['status'],
    }
  })

  // 3. Fetch recent posts (drops) for these users
  const { data: postsData } = await dbClient
    .from('posts')
    .select('id, content, media_url, created_at, profiles!inner(username, avatar_url)')
    .in('author_id', feedUserIds)
    .order('created_at', { ascending: false })
    .limit(10)

  const drops: Drop[] = (postsData ?? []).map((p) => {
    const profile = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles
    const username = (profile as { username?: string; avatar_url?: string })?.username ?? 'unknown'
    const avatarUrl = (profile as { username?: string; avatar_url?: string })?.avatar_url ?? ''
    return {
      id: p.id as string,
      creator: username,
      avatar: avatarUrl,
      hasUnread: false,
      content: (p.content as string) ?? '',
      mediaUrl: (p.media_url as string) ?? undefined,
    }
  })

  return (
    <div className="h-[100dvh] w-full bg-black">
      <FanFeed videos={videos} drops={drops} />
    </div>
  )
}
