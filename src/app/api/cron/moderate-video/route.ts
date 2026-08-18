import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { checkVideoThumbnails } from '@/lib/moderation'

export const revalidate = 0

export async function GET(req: Request) {
  // Verify Vercel Cron header or authorization
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // If CRON_SECRET is configured, enforce security check
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized cron trigger' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

  try {
    // Fetch up to 10 ready videos awaiting moderation
    const { data: pendingVideos, error } = await supabaseAdmin
      .from('content')
      .select('id, mux_playback_id, title')
      .eq('status', 'ready')
      .eq('moderation_status', 'pending')
      .not('mux_playback_id', 'is', null)
      .limit(10)

    if (error) {
      console.error('Error fetching pending videos for moderation:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!pendingVideos || pendingVideos.length === 0) {
      return NextResponse.json({ message: 'No pending videos to moderate', processed: 0 })
    }

    const results = []

    for (const video of pendingVideos) {
      const playbackId = video.mux_playback_id!

      // Sample 3 frame thumbnails from Mux at timestamps 1s, 5s, 10s
      const sampleThumbnails = [
        `https://image.mux.com/${playbackId}/thumbnail.jpg?width=600&time=1`,
        `https://image.mux.com/${playbackId}/thumbnail.jpg?width=600&time=5`,
        `https://image.mux.com/${playbackId}/thumbnail.jpg?width=600&time=10`,
      ]

      const modResult = await checkVideoThumbnails(sampleThumbnails)

      if (modResult.isAdult) {
        // Flag and reject adult content
        await supabaseAdmin
          .from('content')
          .update({
            moderation_status: 'rejected',
          })
          .eq('id', video.id)

        results.push({
          id: video.id,
          title: video.title,
          status: 'rejected',
          reason: modResult.reason,
        })
      } else {
        // Approve clean content
        await supabaseAdmin
          .from('content')
          .update({
            moderation_status: 'approved',
          })
          .eq('id', video.id)

        results.push({
          id: video.id,
          title: video.title,
          status: 'approved',
        })
      }
    }

    return NextResponse.json({
      message: `Moderated ${results.length} video(s)`,
      processed: results.length,
      results,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Cron moderation error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
