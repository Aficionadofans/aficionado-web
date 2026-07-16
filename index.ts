import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

// Standard CORS headers required for Edge Functions called from a web client
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle CORS preflight requests from the Next.js client
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Initialize Supabase client
    // We use the SERVICE_ROLE_KEY because this algorithm needs to read the global 
    // metrics of all posts to rank them, bypassing user-specific Row Level Security (RLS).
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 3. Fetch recent posts (Limit to last 72 hours to optimize database load)
    const timeWindow = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select('id, created_at, views, likes, boosts, transaction_count, creator_id')
      .gt('created_at', timeWindow)

    if (error) throw error

    // 4. The Antigravity Algorithm Constants
    const GRAVITY_CONSTANT = 1.8; 
    const WEIGHTS = {
      view: 1,
      like: 5,
      boost: 15,
      transaction: 50 // heavily heavily weight actions that drive GMV
    };

    // 5. Calculate the Lift Score in-memory at the Edge
    const rankedFeed = posts.map(post => {
      // Calculate age in hours
      const postDate = new Date(post.created_at).getTime();
      const ageInHours = (Date.now() - postDate) / (1000 * 60 * 60);

      // Calculate total weighted engagement
      const engagementScore = 
        (post.views || 0) * WEIGHTS.view +
        (post.likes || 0) * WEIGHTS.like +
        (post.boosts || 0) * WEIGHTS.boost +
        (post.transaction_count || 0) * WEIGHTS.transaction;

      // Apply the time-decay formula
      const liftScore = engagementScore / Math.pow(ageInHours + 2, GRAVITY_CONSTANT);

      return {
         ...post,
         liftScore
      }
    });

    // 6. Sort the array descending by the highest Lift Score
    rankedFeed.sort((a, b) => b.liftScore - a.liftScore);

    // 7. Return the cleanly sorted JSON payload to Vercel/Next.js
    return new Response(JSON.stringify(rankedFeed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})