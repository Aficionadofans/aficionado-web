import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const userType = requestUrl.searchParams.get('userType')

  // Handle OAuth/magic link errors from Supabase
  if (error) {
    console.error('Auth callback error:', error, errorDescription)
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('message', errorDescription ?? 'Authentication failed. Please try again.')
    return NextResponse.redirect(loginUrl)
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Code exchange error:', exchangeError.message)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('message', 'Session could not be established. Please sign in again.')
      return NextResponse.redirect(loginUrl)
    }

    // If userType is provided (from an OAuth signup flow), ensure the profile is updated
    if (userType === 'fan' || userType === 'aficionado') {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // We do an update. Note that the handle_new_user trigger may have already 
        // inserted a row with a null user_type.
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ user_type: userType })
          .eq('id', user.id)
          .is('user_type', null) // Only set it if it hasn't been set yet (prevents overwriting established users on subsequent logins)

        if (updateError) {
          console.error('Failed to set OAuth userType:', updateError.message)
        }
      }
    }
  }

  // Redirect to the originally requested page or home
  const next = requestUrl.searchParams.get('next') ?? '/home'
  return NextResponse.redirect(new URL(next, request.url))
}
