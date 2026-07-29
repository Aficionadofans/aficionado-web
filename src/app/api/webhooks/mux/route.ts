import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getMux } from '@/lib/mux'

/**
 * Mux webhook handler.
 * Receives events for video asset lifecycle (ready, errored, etc.)
 * and updates the corresponding records in Supabase.
 *
 * Uses service-role client to bypass RLS since webhooks arrive
 * without a user session.
 */
export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const webhookSecret = process.env.MUX_WEBHOOK_SECRET

  if (!supabaseUrl || !serviceRoleKey || !webhookSecret) {
    console.error('Missing Supabase or Mux env vars for Mux webhook')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  try {
    const rawBody = await req.text()
    const mux = getMux()
    
    // Verify Mux Signature
    try {
      await mux.webhooks.verifySignature(rawBody, req.headers, webhookSecret)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid signature'
      console.error('Mux webhook signature verification failed:', msg)
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const body = JSON.parse(rawBody)
    console.log('Mux webhook event:', body.type)

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    if (body.type === 'video.asset.ready') {
      const assetId = body.data?.id
      const playbackId = body.data?.playback_ids?.[0]?.id
      const contentId = body.data?.passthrough

      if (assetId && playbackId && contentId) {
        // Update database: attach playback ID and mark as ready
        const { error, data: updatedContent } = await supabaseAdmin
          .from('content')
          .update({ mux_playback_id: playbackId, mux_asset_id: assetId, status: 'ready' })
          .eq('id', contentId)
          .select('author_id, title')
          .single()

        if (error) console.error('Mux asset.ready update error:', error.message)
        
        if (updatedContent) {
          // Automate a drop for the new video
          await supabaseAdmin.from('posts').insert({
            author_id: updatedContent.author_id,
            content: `I just dropped a new video: "${updatedContent.title}"! Go check it out.`
          })
        }
      }
    } else if (body.type === 'video.asset.errored') {
      const assetId = body.data?.id
      const contentId = body.data?.passthrough
      if (assetId && contentId) {
        // Update database: mark content as errored so UI can show failure
        const { error } = await supabaseAdmin
          .from('content')
          .update({ mux_asset_id: assetId, status: 'errored' })
          .eq('id', contentId)

        if (error) console.error('Mux asset.errored update error:', error.message)
      }
    } else if (body.type === 'video.live_stream.active') {
      const authorId = body.data?.passthrough
      if (authorId) {
        // Automatically drop a post when creator goes live
        await supabaseAdmin.from('posts').insert({
          author_id: authorId,
          content: `🔴 I'm LIVE right now! Come join my watch party.`
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Mux webhook error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
