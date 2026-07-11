import { Suspense } from 'react'
import { AuthForm } from '@/features/auth/ui/AuthForm'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-white/5 rounded-3xl" />}>
        <AuthForm />
      </Suspense>
    </div>
  )
}
