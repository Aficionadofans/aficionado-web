import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { creatorId, priceId } = await req.json();
    const supabase = createClient();
    
    // Получаем текущего пользователя (Фаната)
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Создаем сессию оплаты Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      line_items: [
        {
          price: priceId, // ID цены из дашборда Stripe (например: price_1MotwRLkdIwHu7ixYcPLm5uZ)
          quantity: 1,
        },
      ],
      // ВАЖНО: передаем эти данные, чтобы Webhook мог записать их в базу Supabase
      subscription_data: {
        metadata: {
          fan_id: user.id,
          creator_id: creatorId,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/creator/${creatorId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/creator/${creatorId}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}