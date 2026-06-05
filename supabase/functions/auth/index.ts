import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "@supabase/supabase-js"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { action, email, password } = await req.json()

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if ((action === 'login' || action === 'signup') && !password) {
      return new Response(JSON.stringify({ error: 'Password is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let result;

    if (action === 'signup') {
      result = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://aficionado.fans/auth/callback',
        },
      })
    } else if (action === 'login') {
      result = await supabase.auth.signInWithPassword({
        email,
        password,
      })
    } else if (action === 'magic_link') {
      result = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'https://aficionado.fans/auth/callback',
        },
      })
      if (result.error) throw result.error
      return new Response(JSON.stringify({ success: true, message: 'Magic link sent' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else if (action === 'reset_password') {
      result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://aficionado.fans/update-password',
      })
      if (result.error) throw result.error
      return new Response(JSON.stringify({ success: true, message: 'Password reset link sent' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (result.error) throw result.error

    return new Response(JSON.stringify({ session: result.data.session }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
