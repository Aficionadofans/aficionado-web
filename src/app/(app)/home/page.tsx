import { redirect } from 'next/navigation'
import type { Drop } from '@/features/feed/ui/DropZoneCarousel'
import { FanFeed, type Video } from '@/features/feed/ui/FanFeed'
import { createClient } from '@/shared/lib/supabase/server'
import type { Content, DistributedFeedItem } from '@/shared/types/database'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Fetch user's zip code for local discovery
  const { data: myProfile } = await supabase
    .from('profiles')
    .select('zip_code')
    .eq('id', user.id)
    .single()
  const myZip = myProfile?.zip_code?.trim() ?? ''

  // 1. Fetch creators this user is following
  const { data: subs } = await supabase
    .from('subscriptions')
    .select('creator_id')
    .eq('fan_id', user.id)
    .eq('status', 'active')

  const creatorIds = (subs || []).map((s) => s.creator_id)
  const feedUserIds = [user.id, ...creatorIds]

  // 2. Fetch unified distributed feed via geo-distribution engine
  const { data: distributedFeed, error: feedError } = await supabase.rpc('get_distributed_feed', {
    p_viewer_zip: myZip || null,
    p_radius_miles: 25,
    p_limit: 20,
    p_offset: 0,
  })

  if (feedError) {
    console.warn('get_distributed_feed RPC notice:', feedError.message)
  }

  let contentData: (Record<string, unknown> & {
    _isLocal?: boolean
    _distanceMiles?: number | null
  })[] = []

  if (distributedFeed && distributedFeed.length > 0) {
    contentData = (distributedFeed as DistributedFeedItem[]).map((item: DistributedFeedItem) => ({
      id: item.id,
      mux_playback_id: item.mux_playback_id,
      description: item.description,
      moderation_status: item.moderation_status,
      status: item.status,
      created_at: item.created_at,
      profiles: {
        username: item.author_username,
        avatar_url: item.author_avatar_url,
      },
      _isLocal: item.is_local,
      _distanceMiles: item.distance_miles,
    }))
  } else {
    // Fallback: direct query for followed & public ready content
    const { data: fallbackContent } = await supabase
      .from('content')
      .select(
        'id, mux_playback_id, description, moderation_status, status, profiles!inner(username, avatar_url), created_at',
      )
      .or(`author_id.in.(${feedUserIds.join(',')}),visibility.eq.public`)
      .eq('moderation_status', 'approved')
      .eq('status', 'ready')
      .not('mux_playback_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(20)

    if (fallbackContent) {
      contentData = fallbackContent.map((c) => ({
        ...c,
        _isLocal: false,
      }))
    }
  }

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
      isLocal: !!(c as { _isLocal?: boolean })._isLocal,
    }
  })

  // 3. Fetch recent posts (drops) for followed creators
  const { data: postsData } = await supabase
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
