import { createClient } from 'npm:@supabase/supabase-js@^2.43.0'
import Stripe from 'npm:stripe@^14.25.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return json({ error: 'Missing Authorization header' }, 401)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!
    const siteUrl = Deno.env.get('NEXT_PUBLIC_SITE_URL') || 'https://aficionado.fans'

    if (!stripeKey) {
      return json({ error: 'STRIPE_SECRET_KEY not set' }, 500)
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return json({ error: 'Unauthorized' }, 401)
    }

    const body = await req.json()
    const { type, creatorId, priceId, amount, message } = body as {
      type?: string
      creatorId?: string
      priceId?: string
      amount?: number
      message?: string
    }

    if (!creatorId) {
      return json({ error: 'creatorId is required' }, 400)
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' })

    // One-time tip
    if (type === 'tip') {
      if (!amount || amount < 100) {
        return json({ error: 'Minimum tip is $1.00' }, 400)
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: user.email,
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'Fan Tip' },
            unit_amount: amount,
          },
          quantity: 1,
        }],
        payment_intent_data: {
          metadata: {
            type: 'tip',
            fan_id: user.id,
            creator_id: creatorId,
            message: message ?? '',
          },
        },
        success_url: `${siteUrl}/creator/${creatorId}?success=true`,
        cancel_url: `${siteUrl}/creator/${creatorId}?canceled=true`,
      })

      return json({ url: session.url })
    }

    // Subscription
    if (!priceId) {
      return json({ error: 'priceId is required for subscriptions' }, 400)
    }

    const { data: creatorProfile } = await supabase
      .from('profiles')
      .select('platform_fee_percent')
      .eq('id', creatorId)
      .single()

    const feePercent = creatorProfile?.platform_fee_percent ?? 20

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: { fan_id: user.id, creator_id: creatorId },
        application_fee_percent: feePercent,
      },
      success_url: `${siteUrl}/creator/${creatorId}?success=true`,
      cancel_url: `${siteUrl}/creator/${creatorId}?canceled=true`,
    })

    return json({ url: session.url })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Stripe checkout error:', msg)
    return json({ error: msg }, 500)
  }
})

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
