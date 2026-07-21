'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { logout } from '@/app/login/actions'
import { NavigationItems } from './Navigation'

export function SidebarNav({ navItems, pathname }: { navItems: NavigationItems; pathname: string }) {
  return (
    <aside
      aria-label="Sidebar Navigation"
      className="fixed top-0 left-0 z-40 hidden w-60 h-screen md:flex flex-col"
      style={{
        background: '#0A0A0C',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="h-full px-4 py-6 flex flex-col justify-between overflow-y-auto hide-scrollbar">
        <div>
          {/* Logo & Brand */}
          <Link
            href="/home"
            className="flex items-center gap-3 mb-8 px-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,200,0.25), rgba(0,212,200,0.08))',
                border: '1px solid rgba(0,212,200,0.5)',
                boxShadow: '0 0 20px rgba(0,212,200,0.3)',
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
                className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, #00D4C8, #FFFFFF, #00D4C8)',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.04em',
                }}
              >
                Aficionado
              </span>

            </div>
          </Link>

          {/* Section title */}
          <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            01 / Navigation
          </div>

          {/* Nav Items */}
          <nav aria-label="Main Menu">
            <ul className="flex flex-col gap-1.5">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/home' && pathname.startsWith(item.href))

                return (
                  <li
                    key={item.name}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden group',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:translate-x-1',
                      ].join(' ')}
                      style={
                        isActive
                          ? {
                              background: '#121216',
                              border: '1px solid rgba(0,212,200,0.3)',
                              boxShadow: '0 4px 16px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.06)',
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
                            boxShadow: '0 0 10px rgba(0,212,200,0.9)',
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className={[
                          'w-4.5 h-4.5 flex-shrink-0 transition-all duration-200',
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
                      <span className="text-sm tracking-tight">{item.name}</span>
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
              className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
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
