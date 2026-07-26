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

    const body = await req.json()
    const { title, description, visibility, requiredTier, pricePpv } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Map visibility string to valid DB enum ('public' | 'subscriber')
    const dbVisibility = (visibility === 'subscribers' || visibility === 'subscriber') ? 'subscriber' : 'public'

    // 1. Create a placeholder row in the database
    const { data: content, error: insertError } = await supabase
      .from('content')
      .insert({
        author_id: user.id,
        title,
        description: description || null,
        visibility: dbVisibility,
        required_tier: requiredTier || null,
        price_ppv: pricePpv || null,
        status: 'processing', // Video is not yet ready
        moderation_status: 'approved', // Auto-approve uploaded content
      })
      .select('id')
      .single()

    if (insertError || !content) {
      console.error('Failed to create content placeholder:', insertError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // 2. Request a direct upload URL from Mux
    const mux = getMux()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '*'
    
    const upload = await mux.video.uploads.create({
      cors_origin: siteUrl,
      new_asset_settings: {
        playback_policy: ['public'],
        // passthrough is crucial: it lets the webhook map the asset back to the content row
        passthrough: content.id,
        video_quality: 'basic', // Using basic quality for standard uploads
      }
    })

    return NextResponse.json({
      url: upload.url,
      uploadId: upload.id,
      contentId: content.id,
    })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Mux direct upload error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
