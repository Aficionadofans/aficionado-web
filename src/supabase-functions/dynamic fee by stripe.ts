// Inside app/api/stripe/checkout/route.ts (Snippet)

// 1. Get the creator's fee tier from Supabase
const { data: creatorProfile } = await supabaseAdmin
  .from('profiles')
  .select('platform_fee_percent')
  .eq('id', creatorId)
  .single();

const feePercent = creatorProfile?.platform_fee_percent || 20; // Default to 20% if not found

// 2. When transferring funds via Stripe Connect, dynamically apply the cut:
// If a subscription is $10.00 (1000 cents), a 10% unlocked tier means you take $1.00 instead of $2.00.
const applicationFeeAmount = Math.round((priceInCents * feePercent) / 100);