import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'
import type { Metadata } from 'next'
import { AdminSidebar } from './AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Center — Aficionado',
  description: 'Administrative dashboard for the Aficionado platform.',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/admin')

  const { data: isAdmin } = await supabase.rpc('get_my_is_admin')
  if (!isAdmin) redirect('/home')

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-6 px-4 md:px-6 pb-20 md:pb-8 max-w-7xl mx-auto gap-6">
      {/* Admin sidebar panel */}
      <aside className="w-full md:w-56 shrink-0">
        <div className="sticky top-6 glass-panel rounded-[var(--radius-xl)] p-5">
          {/* Admin brand mark */}
          <div className="flex items-center gap-2.5 mb-2 px-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,200,0.2), rgba(0,240,181,0.1))',
                border: '1px solid rgba(0,212,200,0.35)',
              }}
            >
              <span className="text-xs font-black text-primary" style={{ textShadow: '0 0 8px rgba(0,212,200,0.7)' }}>
                A
              </span>
            </div>
            <div>
              <h2
                className="text-sm font-bold tracking-tight text-foreground flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
              >
                Admin Center
                <span className="px-1.5 py-0.5 rounded-full border border-[#F59E0B]/30 text-[9px] font-bold uppercase text-[#F59E0B]">
                  Admin
                </span>
              </h2>
            </div>
          </div>
          <div className="px-1 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            00 / ADMIN DASHBOARD
          </div>
          <AdminSidebar />
        </div>
      </aside>

      {/* Main content panel */}
      <main className="flex-1 min-w-0">
        <div
          className="rounded-[var(--radius-xl)] p-6 md:p-8 relative overflow-hidden"
          style={{
            background: 'rgba(9,9,11,0.88)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {/* Subtle teal orb */}
          <div
            className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: 'rgba(0,212,200,0.04)', filter: 'blur(80px)', zIndex: 0 }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
