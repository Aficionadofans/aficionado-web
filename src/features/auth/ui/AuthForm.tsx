'use client'

import { useActionState, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/client'
import { authAction } from '@/app/login/actions'
import { useFormStatus } from 'react-dom'
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
    </svg>
  )
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}
import { Button } from '@/shared/ui/core'
import { FormField } from '@/shared/ui/core'
import { GlassCard } from '@/shared/ui/core'

type AuthMode = 'login' | 'signup' | 'magic_link' | 'forgot_password'

function SubmitButton({ mode }: { mode: AuthMode }) {
  const { pending } = useFormStatus()

  const label =
    mode === 'login' ? 'Sign In' :
    mode === 'signup' ? 'Create Account' :
    mode === 'magic_link' ? 'Send Magic Link' :
    'Send Reset Link'

  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      rounded="full"
      loading={pending}
      className="w-full"
    >
      {!pending && label}
    </Button>
  )
}

export function AuthForm() {
  const searchParams = useSearchParams()
  const defaultMessage = searchParams.get('message')

  const [state, formAction] = useActionState(authAction, null)
  const [mode, setMode] = useState<AuthMode>('login')
  const [userType, setUserType] = useState<'aficionado' | 'fan'>('fan')
  const [checkboxError, setCheckboxError] = useState<string | null>(null)
  const [submittedMode, setSubmittedMode] = useState<AuthMode | null>(null)

  const switchMode = (next: AuthMode) => {
    setMode(next)
    setCheckboxError(null)
    setSubmittedMode(null)
  }

  const handleOAuth = async (provider: 'google' | 'github') => {
    if (mode === 'signup') {
      const termsChecked = (document.getElementById('terms') as HTMLInputElement | null)?.checked
      if (!termsChecked) {
        setCheckboxError(`You must accept the Terms of Service to sign up with ${provider}.`)
        return
      }
      if (userType === 'aficionado') {
        const creatorChecked = (document.getElementById('creator-agreement') as HTMLInputElement | null)?.checked
        if (!creatorChecked) {
          setCheckboxError('You must accept the Creator Monetization Agreement.')
          return
        }
      }
    }
    setCheckboxError(null)
    const supabase = createClient()
    const redirectParams = mode === 'signup' ? `?userType=${userType}` : ''
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback${redirectParams}` },
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (mode !== 'signup') return
    const form = e.currentTarget
    const termsChecked = (form.elements.namedItem('terms') as HTMLInputElement)?.checked
    const creatorChecked =
      userType !== 'aficionado' ||
      (form.elements.namedItem('creator-agreement') as HTMLInputElement)?.checked

    if (!termsChecked) {
      e.preventDefault()
      e.stopPropagation()
      setCheckboxError('You must accept the Terms of Service and Privacy Policy.')
      return
    }
    if (!creatorChecked) {
      e.preventDefault()
      e.stopPropagation()
      setCheckboxError('You must accept the Creator Monetization Agreement.')
      return
    }
    setCheckboxError(null)
    setSubmittedMode(mode)
  }

  const displayError =
    checkboxError ??
    (submittedMode === mode ? (state?.error ?? null) : null) ??
    (defaultMessage && !state?.success ? defaultMessage : null)

  const displaySuccess = submittedMode === mode ? (state?.success ?? null) : null

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <GlassCard
        variant="raised"
        className="w-full max-w-sm p-8 space-y-6 relative overflow-hidden"
      >
        {/* Ambient teal glow top-left */}
        <div
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: mode === 'signup'
              ? 'rgba(0,212,200,0.18)'
              : 'rgba(0,212,200,0.12)',
            filter: 'blur(60px)',
            transition: 'background 0.8s ease',
          }}
        />

        {/* Heading */}
        <div className="relative text-center space-y-1.5">
          <h1
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
          >
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Join Aficionado'}
            {mode === 'magic_link' && 'Magic Link'}
            {mode === 'forgot_password' && 'Reset Password'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === 'login' && 'Sign in to your account'}
            {mode === 'signup' && 'Create your account today'}
            {mode === 'magic_link' && 'Sign in without a password'}
            {mode === 'forgot_password' && "We'll send you reset instructions"}
          </p>
        </div>

        {/* Mode tabs — Trend agency pill toggle */}
        <div className="relative flex items-center rounded-2xl p-1 bg-[#121216] border border-white/10 shadow-lg">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={[
                'flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                mode === m
                  ? 'bg-primary text-primary-foreground shadow-[0_2px_12px_rgba(0,212,200,0.3)] font-bold'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {m === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        {displaySuccess ? (
          <div className="text-primary text-sm text-center p-4 bg-primary/10 border border-primary/20 rounded-xl animate-fade-in-up">
            {displaySuccess}
          </div>
        ) : (
          <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="mode" value={mode} />
            {mode === 'signup' && <input type="hidden" name="userType" value={userType} />}

            <FormField
              id="email-address"
              name="email"
              type="email"
              label="Email"
              placeholder="Email address (you@example.com)"
              autoComplete="email"
              required
            />

            {/* Fan / Creator toggle */}
            {mode === 'signup' && (
              <div className="animate-fade-in-up space-y-1.5">
                <span className="text-sm font-medium text-foreground/80">I am a…</span>
                <div
                  className="relative flex rounded-xl p-1 bg-[rgba(255,255,255,0.05)] border border-border"
                  style={{ isolation: 'isolate' }}
                >
                  {/* Sliding indicator */}
                  <div
                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-[rgba(255,255,255,0.08)] border border-border transition-transform duration-200 ease-out"
                    style={{ transform: `translateX(${userType === 'fan' ? '4px' : 'calc(100% + 0px)'})`}}
                    aria-hidden="true"
                  />
                  {(['fan', 'aficionado'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setUserType(t)}
                      aria-label={t === 'fan' ? "I'm a Fan" : "I'm an Aficionado"}
                      className={[
                        'relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors duration-150 focus-visible:outline-none',
                        userType === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80',
                      ].join(' ')}
                    >
                      {t === 'fan' ? "I'm a Fan" : "I'm a Creator"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(mode === 'login' || mode === 'signup') && (
              <div className="animate-fade-in-up">
                <FormField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password (••••••••)"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                />
              </div>
            )}

            {mode === 'signup' && (
              <div className="animate-fade-in-up">
                <FormField
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  label="Zip Code"
                  placeholder="Zip Code (90210)"
                  pattern="[0-9]{5}(-[0-9]{4})?"
                  title="5-digit ZIP code"
                  hint="Required for local community features"
                  required
                />
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-3 animate-fade-in-up">
                {/* Terms checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-border bg-[rgba(255,255,255,0.05)] text-primary focus:ring-primary focus:ring-offset-0 flex-shrink-0"
                  />
                  <span className="text-xs text-foreground/70 leading-relaxed">
                    I agree to the{' '}
                    <a href="/terms" target="_blank" className="text-primary hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" target="_blank" className="text-primary hover:underline">Privacy Policy</a>.
                    <span className="block text-muted-foreground mt-0.5">Includes strict prohibition of adult content.</span>
                  </span>
                </label>

                {userType === 'aficionado' && (
                  <label className="flex items-start gap-3 cursor-pointer animate-fade-in-up">
                    <input
                      id="creator-agreement"
                      name="creator-agreement"
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-border bg-[rgba(255,255,255,0.05)] text-primary focus:ring-primary flex-shrink-0"
                    />
                    <span className="text-xs text-foreground/70 leading-relaxed">
                      I agree to the{' '}
                      <a href="/creator-agreement" target="_blank" className="text-primary hover:underline">Creator Monetization Agreement</a>.
                    </span>
                  </label>
                )}
              </div>
            )}

            {/* Error / hint area */}
            <div className="min-h-[40px]">
              {displayError && (
                <div
                  role="alert"
                  className="text-xs text-destructive text-center p-3 rounded-xl animate-fade-in-up"
                  style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}
                >
                  {displayError}
                </div>
              )}
            </div>

            {/* Forgot / Magic link links */}
            {mode === 'login' && (
              <div className="flex items-center justify-between -mt-2">
                <button type="button" onClick={() => switchMode('forgot_password')} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Forgot password?
                </button>
                <button type="button" onClick={() => switchMode('magic_link')} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Use Magic Link
                </button>
              </div>
            )}
            {(mode === 'magic_link' || mode === 'forgot_password') && (
              <button type="button" onClick={() => switchMode('login')} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                ← Back to Sign In
              </button>
            )}

            <SubmitButton mode={mode} />
          </form>
        )}

        {/* OAuth */}
        {(mode === 'login' || mode === 'signup') && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground px-2 bg-[rgba(24,24,27,0.85)] rounded-full">
                or continue with
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="glass"
                size="default"
                className="w-full gap-2"
                onClick={() => handleOAuth('google')}
              >
                <GoogleIcon className="w-4 h-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="glass"
                size="default"
                className="w-full gap-2"
                onClick={() => handleOAuth('github')}
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
