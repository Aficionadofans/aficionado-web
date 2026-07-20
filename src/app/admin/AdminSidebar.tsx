'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Mail, Users, ShieldAlert } from 'lucide-react'

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Moderation', href: '/admin/moderation', icon: ShieldAlert },
  { name: 'Send Email', href: '/admin/email', icon: Mail },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {adminNavItems.map((item) => {
        const Icon = item.icon
        const isActive =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative text-sm font-medium',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
              isActive
                ? 'text-primary'
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
            {isActive && (
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                style={{
                  background: 'linear-gradient(to bottom, #00D4C8, #00F0B5)',
                  boxShadow: '0 0 8px rgba(0,212,200,0.7)',
                }}
                aria-hidden="true"
              />
            )}
            <Icon
              className="w-4 h-4 flex-shrink-0"
              style={isActive ? { filter: 'drop-shadow(0 0 5px rgba(0,212,200,0.7))' } : undefined}
            />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
