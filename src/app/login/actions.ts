'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'
import { headers } from 'next/headers'

export async function authAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const mode = formData.get('mode') as string
  const userType = formData.get('userType') as string
  const zipCode = formData.get('zipCode') as string

  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aficionado.fans'

  let redirectPath = ''
  
  try {
    if (mode === 'signup') {
      if (!email || !password) return { error: 'Email and password are required', success: null }
      
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
          data: {
            user_type: userType,
            zip_code: zipCode,
          }
        }
      })
      
      if (error) return { error: error.message, success: null }
      
      if (!data.session && data.user) {
        return { success: 'Check your email for the confirmation link.', error: null }
      }
      
    } else if (mode === 'login') {
      if (!email || !password) return { error: 'Email and password are required', success: null }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) return { error: error.message, success: null }
      
    } else if (mode === 'magic_link') {
      if (!email) return { error: 'Email is required', success: null }
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        }
      })
      if (error) return { error: error.message, success: null }
      return { success: 'Magic link sent! Check your email.', error: null }
      
    } else if (mode === 'forgot_password') {
      if (!email) return { error: 'Email is required', success: null }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/update-password`,
      })
      if (error) return { error: error.message, success: null }
      return { success: 'Password reset instructions sent to your email.', error: null }
      
    } else {
      return { error: 'Invalid action', success: null }
    }

    if (mode === 'login' || mode === 'signup') {
      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      if (aalData?.nextLevel === 'aal2') {
        redirectPath = '/login/mfa'
      } else {
        redirectPath = '/home'
      }
    }

  } catch (err: any) {
    return { error: err.message || 'An error occurred', success: null }
  }
  
  if (redirectPath) {
    if (redirectPath === '/home') {
      revalidatePath('/', 'layout')
    }
    redirect(redirectPath)
  }
  
  return { error: null, success: null }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
