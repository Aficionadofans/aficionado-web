import { createClient } from 'npm:@supabase/supabase-js@^2.43.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    const body = await req.json()
    console.log('Mux webhook event:', body.type)

    if (body.type === 'video.asset.ready') {
      const assetId = body.data?.id
      const playbackId = body.data?.playback_ids?.[0]?.id

      if (assetId && playbackId) {
        await supabaseAdmin
          .from('content')
          .update({ mux_playback_id: playbackId, status: 'ready' })
          .eq('mux_asset_id', assetId)
      }
    } else if (body.type === 'video.asset.errored') {
      const assetId = body.data?.id
      if (assetId) {
        await supabaseAdmin
          .from('content')
          .update({ status: 'errored' })
          .eq('mux_asset_id', assetId)
      }
    }

    return json({ received: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Mux webhook error:', message)
    return json({ error: message }, 500)
  }
})

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
