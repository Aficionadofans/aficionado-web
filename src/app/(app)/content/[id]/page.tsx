import { ArrowLeft, Lock } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProcessingVideoClient } from '@/features/studio/ui/ProcessingVideoClient'
import { createClient } from '@/shared/lib/supabase/server'
import type { ContentVisibility, ContentWithProfile } from '@/shared/types/database'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/core/avatar'
import { MuxVideoPlayer } from './MuxVideoPlayer'

async function getContent(
  id: string,
): Promise<{ content: ContentWithProfile | null; authorized: boolean }> {
  const supabase = await createClient()

  // 1. Try fetching with user session (RLS applies)
  const { data, error } = await supabase
    .from('content')
    .select('*, profiles(username, avatar_url)')
    .eq('id', id)
    .single()

  if (!error && data) {
    return { content: data as unknown as ContentWithProfile, authorized: true }
  }

  // 2. Fallback to service role client to fetch metadata if RLS blocks reading the actual content
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (serviceRoleKey && supabaseUrl) {
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const adminSupabase = createAdminClient(supabaseUrl, serviceRoleKey)
    const { data: adminData } = await adminSupabase
      .from('content')
      .select('*, profiles(username, avatar_url)')
      .eq('id', id)
      .single()

    if (adminData) {
      return { content: adminData as unknown as ContentWithProfile, authorized: false }
    }
  }

  return { content: null, authorized: false }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function signPlayback(
  playbackId: string,
  contentId: string,
  supabase: any,
): Promise<{ playback: string; thumbnail: string; storyboard: string } | undefined> {
  try {
    const { data, error } = await supabase.functions.invoke('api/mux/sign', {
      body: { playbackId, contentId },
    })

    if (error) throw error
    return data?.tokens
  } catch (err) {
    console.error('Mux sign error:', err instanceof Error ? err.message : err)
    return undefined
  }
}

export default async function ContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { content, authorized } = await getContent(id)

  if (!content) {
    notFound()
  }

  // If authorized and content is subscriber-only, sign the playback JWT directly
  let muxTokens: { playback: string; thumbnail: string; storyboard: string } | undefined
  if (
    authorized &&
    content.visibility === ('subscriber' satisfies ContentVisibility) &&
    content.mux_playback_id
  ) {
    const supabase = await createClient()
    muxTokens = await signPlayback(content.mux_playback_id, content.id, supabase)
  }

  const profile = content.profiles

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-off-white tracking-tight">{content.title}</h1>
          <p className="text-muted-foreground mt-2 text-base max-w-2xl">
            {content.description || 'No description provided.'}
          </p>
        </div>

        {profile && (
          <Link
            href={`/${profile.username}`}
            className="flex items-center gap-3 shrink-0 p-2 pr-4 rounded-full bg-surface/50 border border-border/50 hover:bg-surface transition-colors group"
          >
            <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-primary transition-colors">
              <AvatarImage src={profile.avatar_url || ''} alt={profile.username || 'Creator'} />
              <AvatarFallback>{profile.username?.[0]?.toUpperCase() || 'C'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Creator
              </span>
              <span className="text-sm font-semibold text-off-white">@{profile.username}</span>
            </div>
          </Link>
        )}
      </div>

      {/* Video Player / Paywall Section */}
      <div className="aspect-video bg-black/80 rounded-2xl overflow-hidden border border-border/50 shadow-2xl relative ring-1 ring-white/10">
        {!authorized ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-background/90 to-background/40 backdrop-blur-md">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 ring-1 ring-primary/50">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-off-white mb-2">Subscriber Exclusive</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              This video is exclusively for subscribers of{' '}
              <span className="text-off-white font-medium">
                @{profile?.username || 'this creator'}
              </span>
              . Subscribe to unlock this and all other premium content.
            </p>
            {profile?.username ? (
              <Link
                href={`/${profile.username}`}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                View Profile to Subscribe
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center rounded-full bg-surface px-6 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed"
              >
                Subscribe (Unavailable)
              </button>
            )}
          </div>
        ) : content.mux_playback_id ? (
          <MuxVideoPlayer
            playbackId={content.mux_playback_id}
            envKey={process.env.NEXT_PUBLIC_MUX_ENV_KEY}
            tokens={muxTokens}
            title={content.title}
          />
        ) : (
          <ProcessingVideoClient contentId={content.id} />
        )}
      </div>
    </div>
  )
}
