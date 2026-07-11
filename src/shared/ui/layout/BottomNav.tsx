'use client'

import Link from 'next/link'
import { NavigationItems } from './Navigation'

export function BottomNav({ navItems, pathname }: { navItems: NavigationItems, pathname: string }) {
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-20 bg-sidebar backdrop-blur-3xl border-t border-sidebar-border md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-white/5 group transition-all duration-300 relative"
            >
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-primary rounded-b-full shadow-[0_0_10px_rgba(0,240,181,0.5)]"></div>
              )}
              <Icon
                className={`w-6 h-6 mb-1 transition-transform duration-300 group-hover:-translate-y-1 ${
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/80'
                }`}
              />
              <span
                className={`text-[10px] transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/80'
                }`}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
