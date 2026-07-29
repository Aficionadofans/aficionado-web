'use server'

import { createClient } from '@/shared/lib/supabase/server'

export async function submitTip(formData: FormData) {
  const amount = formData.get('amount') as string
  const message = (formData.get('message') as string) ?? ''
  const creatorId = formData.get('creatorId') as string

  if (!amount || !creatorId) {
    throw new Error('Amount and creator are required')
  }

  const amountNum = parseFloat(amount)
  if (isNaN(amountNum) || amountNum <= 0) {
    throw new Error('Invalid tip amount')
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  // Create Stripe checkout session via unified Next.js API route
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) throw new Error('NEXT_PUBLIC_SITE_URL not configured')

  const res = await fetch(`${siteUrl}/api/stripe/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'tip',
      amount: Math.round(amountNum * 100), // cents
      creatorId,
      fanId: user.id,
      message,
    }),
  })

  const data = await res.json()

  if (!res.ok || !data?.url) {
    throw new Error(data?.error ?? 'Failed to process tip')
  }

  return { success: true, url: data.url }
}
