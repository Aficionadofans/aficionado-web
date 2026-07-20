'use client'

import Link from 'next/link'
import { NavigationItems } from './Navigation'

export function BottomNav({ navItems, pathname }: { navItems: NavigationItems; pathname: string }) {
  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md md:hidden"
    >
      <div
        className="grid grid-cols-5 h-16 items-center px-2 rounded-full border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 20, 24, 0.88) 0%, rgba(10, 10, 12, 0.94) 100%)',
          backdropFilter: 'blur(32px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== '/home' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'inline-flex flex-col items-center justify-center h-12 py-1 px-1 relative rounded-full',
                'transition-all duration-200 active:scale-95',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {/* Active ambient glow pill */}
              {isActive && (
                <div
                  className="absolute inset-1 rounded-full z-0 pointer-events-none transition-all"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,212,200,0.18) 0%, transparent 80%)',
                  }}
                  aria-hidden="true"
                />
              )}
              <Icon
                className="w-5 h-5 relative z-10 transition-transform duration-200"
                style={
                  isActive
                    ? { filter: 'drop-shadow(0 0 8px rgba(0,212,200,0.8))', transform: 'scale(1.1)' }
                    : undefined
                }
              />
              <span
                className={[
                  'text-[10px] font-semibold mt-0.5 tracking-tight relative z-10',
                  isActive ? 'text-primary font-bold' : 'text-muted-foreground/80',
                ].join(' ')}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
