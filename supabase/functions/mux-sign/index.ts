import { createClient } from 'npm:@supabase/supabase-js@^2.43.0'
import Mux from 'npm:@mux/mux-node@^8.8.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const tokenId = Deno.env.get('MUX_TOKEN_ID')
    const tokenSecret = Deno.env.get('MUX_TOKEN_SECRET')

    if (!tokenId || !tokenSecret) {
      console.error('Missing MUX_TOKEN_ID or MUX_TOKEN_SECRET')
      return json({ error: 'Server misconfiguration' }, 500)
    }

    const url = new URL(req.url)
    let playbackId = url.searchParams.get('playbackId')
    let contentId = url.searchParams.get('contentId')

    if (!playbackId || !contentId) {
      try {
        const body = await req.json()
        playbackId = playbackId || body.playbackId
        contentId = contentId || body.contentId
      } catch {
        // Body reading failed or empty, proceed with query params check
      }
    }

    if (!playbackId || !contentId) {
      return json({ error: 'Missing playbackId or contentId' }, 400)
    }

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return json({ error: 'Missing Authorization header' }, 401)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return json({ error: 'Unauthorized' }, 401)
    }

    // RLS enforces subscription check — if no row returns, access is denied
    const { data: content, error } = await supabase
      .from('content')
      .select('id')
      .eq('id', contentId)
      .single()

    if (error || !content) {
      return json({ error: 'Forbidden or not found' }, 403)
    }

    const mux = new Mux({ tokenId, tokenSecret })

    const token = await mux.jwt.signPlaybackId(playbackId, {
      type: 'video',
      expiration: '6h',
    })

    return json({ token })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Mux sign error:', message)
    return json({ error: message }, 500)
  }
})

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
