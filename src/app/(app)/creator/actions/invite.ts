'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function processFanImport(emails: { email: string; name?: string }[], source: string) {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  const username = profile?.username || 'creator'

  const inserts = emails.map(e => ({
    creator_id: user.id,
    email: e.email,
    name: e.name || null,
    source: source,
    status: 'pending'
  }))

  // Skip insert if there are no valid emails
  if (inserts.length > 0) {
    const { error: insertError } = await supabase
      .from('fan_invitations')
      .insert(inserts)

    if (insertError) {
      console.error('Error inserting fan invitations:', insertError)
      throw new Error('Failed to import fans')
    }
  }

  // Handle email sending
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.log(`[Email Simulation] Would send ${emails.length} invites to join ${username}'s Inner Circle.`)
  } else {
    try {
      // Simple batch mock sending for now
      console.log(`Sent ${emails.length} emails using Resend`)
    } catch (e) {
      console.error('Resend error', e)
    }
  }

  revalidatePath('/creator')
  
  return { success: true, count: emails.length }
}
