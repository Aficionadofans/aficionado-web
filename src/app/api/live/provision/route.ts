import { NextResponse } from 'next/server'
import { getMux } from '@/lib/mux'
import { createClient } from '@/shared/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user is a creator
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type, username')
      .eq('id', user.id)
      .single()

    if (profile?.user_type !== 'creator') {
      return NextResponse.json({ error: 'Only creators can go live' }, { status: 403 })
    }

    const mux = getMux()

    // Create a new Live Stream in Mux
    const liveStream = await mux.video.liveStreams.create({
      playback_policy: ['public'],
      new_asset_settings: {
        playback_policy: ['public'],
      },
      passthrough: user.id, // Store author_id in passthrough for the webhook
      generated_subtitles: [
        {
          name: 'English CC',
          passthrough: 'English',
          language_code: 'en',
        },
      ],
    })

    const playbackId = liveStream.playback_ids?.[0]?.id

    if (playbackId) {
      // Store it in the content table so fans can find it on the watch page
      await supabase.from('content').insert({
        author_id: user.id,
        title: `🔴 Live: ${profile.username}'s Watch Party`,
        visibility: 'public',
        moderation_status: 'approved',
        mux_playback_id: playbackId,
        // Using description to mark it as a live stream record
        description: 'LIVESTREAM_RECORD'
      })
    }

    return NextResponse.json({
      streamKey: liveStream.stream_key,
      playbackId: playbackId,
      rtmpUrl: 'rtmps://global-live.mux.com:443/app', // Standard Mux RTMP ingest URL
      liveStreamId: liveStream.id,
    })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Mux live provision error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
