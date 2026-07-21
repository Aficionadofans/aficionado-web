import { Suspense } from 'react'
import { AuthForm } from '@/features/auth/ui/AuthForm'

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* ── Immersive background blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px] animate-breathe-calm mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-bio-emerald/8 blur-[120px] animate-float mix-blend-screen" />
        <div className="absolute top-3/4 left-1/2 w-[300px] h-[300px] rounded-full bg-primary/6 blur-[100px] animate-float mix-blend-screen" style={{ animationDelay: '3s' }} />
      </div>

      {/* ── Brand section — visible on ≥ md ── */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center px-12 z-10">
        <div className="max-w-md animate-fade-in-up" style={{ animationDuration: '500ms', animationFillMode: 'both' }}>
          <h1
            className="text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
          >
            Aficionado
          </h1>
          <p className="mt-4 text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
            The anti-dopamine social network.
          </p>
        </div>
      </div>

      {/* ── Auth card ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 z-10">
        {/* Wordmark shown on mobile (< md) */}
        <div className="md:hidden mb-8 text-center animate-fade-in-up">
          <h1
            className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
          >
            Aficionado
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The anti-dopamine social network.
          </p>
        </div>

        <Suspense fallback={<div className="animate-pulse w-full max-w-sm h-96 bg-white/5 rounded-3xl" />}>
          <AuthForm />
        </Suspense>
      </div>
    </div>
  )
}
