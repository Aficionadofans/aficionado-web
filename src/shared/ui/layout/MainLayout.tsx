'use client'

import { usePathname } from 'next/navigation'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const hideNavRoutes = ['/login', '/update-password', '/auth', '/terms', '/privacy', '/creator-agreement']
  const isNavHidden = hideNavRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))

  return (
    <main className={`flex-1 transition-all duration-300 z-0 ${isNavHidden ? 'ml-0 pb-0' : 'md:ml-60 pb-16 md:pb-0'}`}>
      {children}
    </main>
  )
}
