'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

export async function processFanImport(emails: { email: string; name?: string }[], source: string) {
  if (emails.length > 500) {
    throw new Error('Maximum 500 fans can be imported at once to prevent spam.')
  }

  const supabase = await createClient()
  
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
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey && inserts.length > 0) {
    const resend = new Resend(resendApiKey)
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aficionado.fans'
    const link = `${SITE_URL}/${username}?source=${encodeURIComponent(source)}`

    try {
      // Resend bulk sending limits to 100 emails per batch.
      // We process them in chunks of 100.
      const BATCH_SIZE = 100
      for (let i = 0; i < inserts.length; i += BATCH_SIZE) {
        const batch = inserts.slice(i, i + BATCH_SIZE)
        
        await resend.batch.send(batch.map(invite => ({
          from: 'Aficionado <contact@aficionado.fans>',
          to: [invite.email],
          subject: `${username} invited you to their Inner Circle on Aficionado!`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>You've been invited!</h2>
              <p>Hi ${invite.name || 'there'},</p>
              <p><strong>@${username}</strong> has invited you to join their exclusive Inner Circle on Aficionado.</p>
              <p>Get behind-the-scenes content and direct access.</p>
              <a href="${link}" style="display: inline-block; background-color: #00f0b5; color: #000; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold; margin-top: 16px;">
                Accept Invitation
              </a>
            </div>
          `
        })))
      }
      console.log(`Sent ${inserts.length} emails using Resend`)
    } catch (e) {
      console.error('Resend error', e)
    }
  } else {
    console.log(`[Email Simulation] Would send ${emails.length} invites to join ${username}'s Inner Circle. Missing RESEND_API_KEY.`)
  }

  revalidatePath('/creator')
  
  return { success: true, count: emails.length }
}
