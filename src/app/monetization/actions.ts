'use server'

import { revalidatePath } from 'next/cache'
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

  // Create Stripe checkout session via API route
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/checkout`, {
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

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error ?? 'Failed to process tip')
  }

  revalidatePath('/home')
  revalidatePath('/[username]', 'page')

  return { success: true }
}
