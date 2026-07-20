'use client'

import Link from 'next/link'
import { NavigationItems } from './Navigation'

export function BottomNav({ navItems, pathname }: { navItems: NavigationItems; pathname: string }) {
  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 z-40 w-full md:hidden"
      style={{
        background: 'rgba(8, 8, 8, 0.92)',
        backdropFilter: 'blur(40px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="grid h-16 grid-cols-5 max-w-md mx-auto px-2">
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
                'inline-flex flex-col items-center justify-center min-h-[44px] py-1 px-2 relative',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {/* Active top indicator */}
              {isActive && (
                <div
                  className="absolute top-0 w-8 h-0.5 rounded-b-full"
                  style={{
                    background: 'linear-gradient(to right, #00D4C8, #00F0B5)',
                    boxShadow: '0 0 8px rgba(0,212,200,0.6)',
                  }}
                  aria-hidden="true"
                />
              )}
              <Icon
                className="w-5 h-5 transition-all duration-200"
                style={
                  isActive
                    ? { filter: 'drop-shadow(0 0 6px rgba(0,212,200,0.7))' }
                    : undefined
                }
              />
              <span
                className={[
                  'text-[11px] font-medium mt-0.5 tracking-normal',
                  isActive ? 'text-primary' : 'text-muted-foreground',
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
