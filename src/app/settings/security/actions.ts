'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function enrollMfa(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) return { error: 'Not authenticated', qrCode: null, secret: null, factorId: null }

  try {
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' })

    if (error) {
      return { error: error.message || 'Failed to enroll', qrCode: null, secret: null, factorId: null }
    }

    return {
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
      factorId: data.id,
      error: null
    }
  } catch (err: any) {
    return { error: err.message, qrCode: null, secret: null, factorId: null }
  }
}

export async function verifyAndEnableMfa(prevState: any, formData: FormData) {
  const factorId = formData.get('factorId') as string
  const code = formData.get('code') as string

  if (!factorId || !code) {
    return { error: 'Missing code or factor ID', success: false }
  }

  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) return { error: 'Not authenticated', success: false }

  try {
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code
    })

    if (error) {
      return { error: error.message || 'Invalid code', success: false }
    }

    revalidatePath('/settings/security')
    return { success: true, error: null }
  } catch (err: any) {
    return { error: err.message, success: false }
  }
}

export async function unenrollMfa(prevState: any, formData: FormData) {
  const factorId = formData.get('factorId') as string

  if (!factorId) {
    return { error: 'Missing factor ID', success: false }
  }

  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) return { error: 'Not authenticated', success: false }

  try {
    const { error } = await supabase.auth.mfa.unenroll({
      factorId
    })

    if (error) {
      return { error: error.message || 'Failed to unenroll', success: false }
    }

    revalidatePath('/settings/security')
    return { success: true, error: null }
  } catch (err: any) {
    return { error: err.message, success: false }
  }
}
