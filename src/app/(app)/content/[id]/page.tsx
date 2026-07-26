import { createClient } from '@/shared/lib/supabase/server'
import { notFound } from 'next/navigation'
import { getMux } from '@/lib/mux'
import { MuxVideoPlayer } from './MuxVideoPlayer'
import type { Content, ContentVisibility } from '@/shared/types/database'

async function getContent(id: string): Promise<Content | null> {
  const supabase = await createClient()

  // 1. Try fetching with user session
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .single<Content>()

  if (!error && data) return data

  // 2. Fallback to service role client if RLS blocks reading public content
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (serviceRoleKey && supabaseUrl) {
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const adminSupabase = createAdminClient(supabaseUrl, serviceRoleKey)
    const { data: adminData } = await adminSupabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single<Content>()
    if (adminData) return adminData
  }

  return null
}

async function signPlayback(playbackId: string): Promise<string | undefined> {
  try {
    const mux = getMux()
    return await mux.jwt.signPlaybackId(playbackId, {
      type: 'video',
      expiration: '6h',
    })
  } catch (err) {
    console.error('Mux sign error:', err instanceof Error ? err.message : err)
    return undefined
  }
}

export default async function ContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const content = await getContent(id)

  if (!content) {
    notFound()
  }

  // If content is subscriber-only, sign the playback JWT directly (no HTTP round-trip)
  let muxToken: string | undefined
  if (content.visibility === ('subscriber' satisfies ContentVisibility) && content.mux_playback_id) {
    muxToken = await signPlayback(content.mux_playback_id)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4 text-off-white">{content.title}</h1>

      {content.description && (
        <p className="text-muted-foreground text-sm mb-6">{content.description}</p>
      )}

      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        {content.mux_playback_id ? (
          <MuxVideoPlayer
            playbackId={content.mux_playback_id}
            envKey={process.env.NEXT_PUBLIC_MUX_ENV_KEY}
            token={muxToken}
            title={content.title}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Media is processing...
          </div>
        )}
      </div>
    </div>
  )
}
