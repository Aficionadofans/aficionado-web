import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Используем Service Role, так как вебхук работает вне сессии пользователя
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const subscription = event.data.object as Stripe.Subscription;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      // Извлекаем metadata, которые вы передали при создании Checkout Session (fan_id и creator_id)
      const fanId = subscription.metadata.fan_id;
      const creatorId = subscription.metadata.creator_id;

      await supabaseAdmin
        .from('subscriptions')
        .upsert({
          stripe_subscription_id: subscription.id,
          fan_id: fanId,
          creator_id: creatorId,
          status: subscription.status, // 'active', 'past_due', 'canceled'
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }, { onConflict: 'stripe_subscription_id' });
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}