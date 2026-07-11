'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { logout } from '@/app/login/actions'
import { NavigationItems } from './Navigation'

export function SidebarNav({ navItems, pathname }: { navItems: NavigationItems, pathname: string }) {
  return (
    <aside className="fixed top-0 left-0 z-40 hidden w-64 h-screen transition-transform -translate-x-full md:translate-x-0 md:block bg-sidebar backdrop-blur-3xl border-r border-sidebar-border shadow-[10px_0_40px_rgba(0,0,0,0.3)]">
      <div className="h-full px-3 py-4 flex flex-col">
        <div className="flex items-center mb-10 pl-2 mt-4">
          <span className="text-2xl font-bold tracking-tight text-off-white bg-clip-text text-transparent bg-gradient-to-r from-bio-teal to-bio-emerald">Aficionado</span>
        </div>
        <ul className="space-y-2 font-medium flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-xl group transition-all duration-300 relative overflow-hidden ${
                    isActive ? 'bg-sidebar-accent text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-primary hover:pl-5'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(0,240,181,0.5)]"></div>
                  )}
                  <Icon className="w-5 h-5 transition duration-300 group-hover:scale-110" />
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center w-full p-3 rounded-xl group text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-5 h-5 transition duration-75 group-hover:animate-pulse" />
              <span className="ms-3">Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
