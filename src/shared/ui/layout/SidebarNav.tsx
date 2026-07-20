'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { logout } from '@/app/login/actions'
import { NavigationItems } from './Navigation'

export function SidebarNav({ navItems, pathname }: { navItems: NavigationItems, pathname: string }) {
  return (
    <aside 
      aria-label="Sidebar Navigation"
      className="fixed top-0 left-0 z-40 hidden w-64 h-screen transition-transform -translate-x-full md:translate-x-0 md:block bg-sidebar/90 backdrop-blur-3xl border-r border-sidebar-border shadow-[10px_0_40px_rgba(0,0,0,0.3)]"
    >
      <div className="h-full px-4 py-6 flex flex-col justify-between">
        <div>
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary/30 to-bio-teal/30 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <span className="text-primary font-black text-lg">A</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-off-white bg-clip-text text-transparent bg-gradient-to-r from-bio-teal via-off-white to-primary">
              Aficionado
            </span>
          </div>

          {/* Nav List */}
          <nav aria-label="Main Menu">
            <ul className="space-y-2 font-medium">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href))
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                        isActive 
                          ? 'bg-sidebar-accent text-primary font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                          : 'text-muted-foreground hover:bg-white/5 hover:text-off-white hover:pl-5'
                      }`}
                    >
                      {isActive && (
                        <div 
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-primary rounded-r-full shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                          aria-hidden="true"
                        />
                      )}
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-primary' : 'group-hover:scale-110 group-hover:text-primary'}`} />
                      <span className="ms-3 text-sm tracking-wide">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-sidebar-border">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/15 hover:text-destructive transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/60"
            >
              <LogOut className="w-5 h-5 transition duration-200 group-hover:scale-105" />
              <span className="ms-3">Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}

