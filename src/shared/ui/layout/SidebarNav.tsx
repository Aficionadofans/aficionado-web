'use client'

import Link from 'next/link'
import { LogOut, Sparkles } from 'lucide-react'
import { logout } from '@/app/login/actions'
import { NavigationItems } from './Navigation'

export function SidebarNav({ navItems, pathname }: { navItems: NavigationItems; pathname: string }) {
  return (
    <aside
      aria-label="Sidebar Navigation"
      className="fixed top-0 left-0 z-40 hidden w-60 h-screen md:flex flex-col"
      style={{
        background: 'rgba(8, 8, 8, 0.88)',
        backdropFilter: 'blur(40px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="h-full px-3 py-5 flex flex-col justify-between overflow-y-auto hide-scrollbar">
        <div>
          {/* Logo & Brand */}
          <Link
            href="/home"
            className="flex items-center gap-3 mb-7 px-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,200,0.2), rgba(0,240,181,0.1))',
                border: '1px solid rgba(0,212,200,0.4)',
                boxShadow: '0 0 16px rgba(0,212,200,0.2)',
              }}
            >
              <span
                className="font-black text-lg text-primary"
                style={{ textShadow: '0 0 10px rgba(0,212,200,0.8)' }}
              >
                A
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className="text-xl font-bold tracking-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, #00D4C8, #ffffff, #00F0B5)',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.03em',
                }}
              >
                Aficionado
              </span>
              <span className="text-[9px] font-semibold tracking-[0.15em] text-primary/70 uppercase flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Finite Social
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav aria-label="Main Menu">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/home' && pathname.startsWith(item.href))

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden group',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:translate-x-0.5',
                      ].join(' ')}
                      style={
                        isActive
                          ? {
                              background: 'rgba(0,212,200,0.08)',
                              border: '1px solid rgba(0,212,200,0.25)',
                            }
                          : { border: '1px solid transparent' }
                      }
                    >
                      {/* Active left bar */}
                      {isActive && (
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                          style={{
                            background: 'linear-gradient(to bottom, #00D4C8, #00F0B5)',
                            boxShadow: '0 0 8px rgba(0,212,200,0.8)',
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className={[
                          'w-5 h-5 flex-shrink-0 transition-all duration-200',
                          isActive
                            ? 'text-primary'
                            : 'group-hover:text-foreground',
                        ].join(' ')}
                        style={
                          isActive
                            ? { filter: 'drop-shadow(0 0 6px rgba(0,212,200,0.7))' }
                            : undefined
                        }
                      />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Sign Out */}
        <div className="pt-4 border-t border-border">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
