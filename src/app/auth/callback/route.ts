import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

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
  }

  // Redirect to the originally requested page or home
  const next = requestUrl.searchParams.get('next') ?? '/home'
  return NextResponse.redirect(new URL(next, request.url))
}
