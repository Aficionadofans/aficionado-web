'use client'

import Link from 'next/link'
import { LogOut, Sparkles } from 'lucide-react'
import { logout } from '@/app/login/actions'
import { NavigationItems } from './Navigation'

export function SidebarNav({ navItems, pathname }: { navItems: NavigationItems, pathname: string }) {
  return (
    <aside 
      aria-label="Sidebar Navigation"
      className="fixed top-0 left-0 z-40 hidden w-64 h-screen transition-transform -translate-x-full md:translate-x-0 md:block bg-sidebar/90 backdrop-blur-3xl border-r border-white/10 shadow-[10px_0_40px_rgba(0,0,0,0.4)]"
    >
      <div className="h-full px-4 py-6 flex flex-col justify-between">
        <div>
          {/* Logo & Brand Header */}
          <Link href="/home" className="flex items-center gap-3 mb-8 px-2 group focus-visible:outline-none">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary/30 via-bio-teal/20 to-primary/10 border border-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-105 group-hover:border-primary transition-all duration-300">
              <span className="text-primary font-black text-xl drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-off-white bg-clip-text text-transparent bg-gradient-to-r from-bio-teal via-off-white to-primary">
                Aficionado
              </span>
              <span className="text-[10px] font-bold tracking-widest text-primary/80 uppercase flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Finite Social
              </span>
            </div>
          </Link>

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
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                        isActive 
                          ? 'liquid-glass border-primary/40 text-primary font-bold shadow-[0_0_25px_rgba(245,158,11,0.2)]' 
                          : 'text-muted-foreground hover:bg-white/5 hover:text-off-white hover:translate-x-1'
                      }`}
                    >
                      {isActive && (
                        <div 
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-bio-teal to-primary rounded-r-full shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                          aria-hidden="true"
                        />
                      )}
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-primary drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'group-hover:scale-110 group-hover:text-primary'}`} />
                      <span className="ms-3 text-sm tracking-wide font-semibold">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center w-full px-4 py-3 rounded-2xl text-sm font-semibold text-muted-foreground hover:bg-destructive/15 hover:text-destructive transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/60 hover:scale-[1.02] active:scale-[0.98]"
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


