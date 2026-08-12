'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/shared/lib/supabase/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function enrollMfa(_prevState: any, _formData: FormData) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return { error: 'Not authenticated', qrCode: null, secret: null, factorId: null }

  try {
    const { data: responseData, error } = await supabase.functions.invoke('api/mfa', {
      body: { action: 'enroll' },
    })

    if (error) {
      return {
        error: error.message || 'Failed to enroll',
        qrCode: null,
        secret: null,
        factorId: null,
      }
    }
    if (responseData?.error) {
      return {
        error: responseData.error || 'Failed to enroll',
        qrCode: null,
        secret: null,
        factorId: null,
      }
    }

    return {
      qrCode: responseData.data.totp.qr_code,
      secret: responseData.data.totp.secret,
      factorId: responseData.data.id,
      error: null,
    }
  } catch (err: unknown) {
    return { error: (err as Error).message, qrCode: null, secret: null, factorId: null }
  }
}

export async function verifyAndEnableMfa(_prevState: unknown, formData: FormData) {
  const factorId = formData.get('factorId') as string
  const code = formData.get('code') as string

  if (!factorId || !code) {
    return { error: 'Missing code or factor ID', success: false }
  }

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return { error: 'Not authenticated', success: false }

  try {
    const { data, error } = await supabase.functions.invoke('api/mfa', {
      body: { action: 'challengeAndVerify', factorId, code },
    })

    if (error) {
      return { error: error.message || 'Invalid code', success: false }
    }
    if (data?.error) {
      return { error: data.error || 'Invalid code', success: false }
    }

    // Force Next.js to update the browser's cookies with the new aal2 session
    await supabase.auth.refreshSession()

    revalidatePath('/settings/security')
    return { success: true, error: null }
  } catch (err: unknown) {
    return { error: (err as Error).message, success: false }
  }
}

export async function unenrollMfa(_prevState: unknown, formData: FormData) {
  const factorId = formData.get('factorId') as string

  if (!factorId) {
    return { error: 'Missing factor ID', success: false }
  }

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return { error: 'Not authenticated', success: false }

  try {
    const { data, error } = await supabase.functions.invoke('api/mfa', {
      body: { action: 'unenroll', factorId },
    })

    if (error) {
      return { error: error.message || 'Failed to unenroll', success: false }
    }
    if (data?.error) {
      return { error: data.error || 'Failed to unenroll', success: false }
    }

    revalidatePath('/settings/security')
    return { success: true, error: null }
  } catch (err: unknown) {
    return { error: (err as Error).message, success: false }
  }
}
