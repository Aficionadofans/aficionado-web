import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    
    let contentId = body.contentId
    let playbackId = body.playbackId

    // Handle Supabase Database Webhook payload
    if (body.type === 'INSERT' && body.record) {
      contentId = body.record.id
      playbackId = body.record.mux_playback_id
    }

    if (!contentId && !playbackId) {
      return new Response(JSON.stringify({ error: 'Missing contentId or playbackId' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Connect to Supabase using service role key (bypasses RLS)
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // MOCK MODERATION ENGINE:
    // In a real scenario, we would pass the video to an AI model.
    // For this prototype, we simulate a 30% chance of being rejected as NSFW.
    const isNsfw = Math.random() < 0.3
    const newStatus = isNsfw ? 'rejected' : 'approved'

    // Log the moderation result
    console.log(`Content ${contentId || playbackId} moderation result: ${newStatus}`)

    // Update the database
    let updateQuery = supabase.from('content').update({ moderation_status: newStatus })
    
    if (contentId) {
      updateQuery = updateQuery.eq('id', contentId)
    } else {
      updateQuery = updateQuery.eq('playback_id', playbackId)
    }

    const { error } = await updateQuery

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ message: `Moderation complete. Status updated to ${newStatus}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
