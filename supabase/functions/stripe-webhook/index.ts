import { createClient } from 'npm:@supabase/supabase-js@^2.43.0'
import Stripe from 'npm:stripe@^14.25.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!stripeKey || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
    console.error('Missing required environment variables for Stripe webhook')
    return json({ error: 'Server misconfiguration' }, 500)
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' })
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return json({ error: 'Missing stripe-signature header' }, 400)
  }

  let event: Stripe.Event

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return json({ error: `Webhook Error: ${message}` }, 400)
  }

  const subData = event.data.object as unknown as Record<string, unknown>

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const metadata = (subData.metadata ?? {}) as Record<string, string>
      const fanId = metadata.fan_id
      const creatorId = metadata.creator_id
      const status = subData.status as string

      if (!fanId || !creatorId) {
        console.error('Missing fan_id or creator_id in subscription metadata', metadata)
        break
      }

      const rawPeriodEnd = subData.current_period_end as number | undefined
      const periodEnd = rawPeriodEnd
        ? new Date(rawPeriodEnd * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

      const { error } = await supabaseAdmin
        .from('subscriptions')
        .upsert({
          stripe_subscription_id: subData.id as string,
          fan_id: fanId,
          creator_id: creatorId,
          status,
          current_period_end: periodEnd,
        }, { onConflict: 'stripe_subscription_id' })

      if (error) console.error('Supabase upsert error:', error.message)
      break
    }

    case 'payment_intent.succeeded': {
      const pi = subData as unknown as Stripe.PaymentIntent
      const metadata = pi.metadata ?? {}
      if (metadata.type === 'tip') {
        const { error } = await supabaseAdmin
          .from('tips')
          .insert({
            stripe_payment_intent_id: pi.id,
            fan_id: metadata.fan_id,
            creator_id: metadata.creator_id,
            amount: pi.amount,
            message: metadata.message ?? '',
          })
        if (error) console.error('Tip insert error:', error.message)
      }
      break
    }

    default:
      console.log(`Unhandled Stripe event: ${event.type}`)
  }

  return json({ received: true })
})

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
