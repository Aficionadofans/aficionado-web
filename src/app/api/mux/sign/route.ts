import { NextResponse } from 'next/server'
import { getMux } from '@/lib/mux'
import { createClient } from '@/shared/lib/supabase/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const playbackId = searchParams.get('playbackId')
    const contentId = searchParams.get('contentId')

    if (!playbackId || !contentId) {
      return NextResponse.json({ error: 'Missing playbackId or contentId' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // RLS enforces subscription check — if no row returns, access is denied
    const { data: content, error } = await supabase
      .from('content')
      .select('id')
      .eq('id', contentId)
      .single()

    if (error || !content) {
      return NextResponse.json({ error: 'Forbidden or not found' }, { status: 403 })
    }

    const mux = getMux()

    const token = await mux.jwt.signPlaybackId(playbackId, {
      type: 'video',
      expiration: '6h',
    })

    return NextResponse.json({
      token,
      muxEnvKey: process.env.NEXT_PUBLIC_MUX_ENV_KEY ?? null,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Mux sign error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
