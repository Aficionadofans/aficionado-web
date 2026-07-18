'use server'

import { revalidatePath } from 'next/cache'

export async function submitTip(formData: FormData) {
  const amount = formData.get('amount')
  const message = formData.get('message')
  const creatorId = formData.get('creatorId')

  if (!amount || !creatorId) {
    throw new Error('Amount and creator are required')
  }

  // MOCK: Simulate Stripe PaymentIntent processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real implementation, we would:
  // 1. Create a PaymentIntent via Stripe SDK
  // 2. Insert a record into the 'tips' table in Supabase once successful
  // 3. (Optional) Trigger a real-time notification to the creator

  console.log(`Mock Tip Processed: $${amount} to ${creatorId} with message: "${message}"`)

  // Revalidate the routes so any UI relying on updated earnings or tip history refreshes
  revalidatePath('/home')
  revalidatePath('/[username]', 'page')
  
  return { success: true }
}
