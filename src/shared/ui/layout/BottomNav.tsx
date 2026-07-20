'use client'

import Link from 'next/link'
import { NavigationItems } from './Navigation'

export function BottomNav({ navItems, pathname }: { navItems: NavigationItems, pathname: string }) {
  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 z-40 w-full h-16 bg-sidebar/95 backdrop-blur-3xl border-t border-white/10 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.6)]"
    >
      <div className="grid h-full max-w-md grid-cols-5 mx-auto font-medium px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex flex-col items-center justify-center min-h-[44px] py-1 px-2 group transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl ${
                isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-off-white'
              }`}
            >
              {isActive && (
                <div 
                  className="absolute top-0 w-10 h-1 bg-gradient-to-r from-bio-teal to-primary rounded-b-full shadow-[0_0_15px_rgba(245,158,11,0.9)]"
                  aria-hidden="true"
                />
              )}
              <Icon
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive ? 'scale-110 text-primary drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'group-hover:scale-110'
                }`}
              />
              <span
                className={`text-[10px] tracking-wide mt-1 font-semibold transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
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


