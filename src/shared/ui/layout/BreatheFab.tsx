'use client'

import Link from 'next/link'
import { Wind } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function BreatheFab() {
  const pathname = usePathname()
  
  // Don't show on login or if already on the breathe page
  if (pathname === '/login' || pathname === '/breathe') return null

  return (
    <Link
      href="/breathe"
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,240,181,0.4)] hover:scale-110 transition-transform duration-300 group"
      aria-label="Urge Surfing"
    >
      <span className="absolute inline-flex w-full h-full rounded-full opacity-50 animate-ping bg-primary group-hover:opacity-75"></span>
      <Wind className="w-6 h-6 relative z-10 animate-pulse-slow" />
    </Link>
  )
}
