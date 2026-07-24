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

  // Create Stripe checkout session via Supabase Edge Function
  const { data, error } = await supabase.functions.invoke('stripe-checkout', {
    body: {
      type: 'tip',
      amount: Math.round(amountNum * 100), // cents
      creatorId,
      fanId: user.id,
      message,
    },
  })

  if (error || !data?.url) {
    throw new Error(error?.message ?? data?.error ?? 'Failed to process tip')
  }

  return { success: true, url: data.url }
}
