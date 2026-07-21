import { createClient } from '@/shared/lib/supabase/server'
import { Users, FileVideo, ShieldCheck, Mail } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader, EmptyState, StatCounter } from '@/shared/ui/core'

export const metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: totalUsers },
    { count: totalContent },
    { count: flaggedContent },
    { count: activeSubscriptions },
    { count: totalCreators },
    { count: totalFans },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('content').select('*', { count: 'exact', head: true }),
    supabase.from('content').select('*', { count: 'exact', head: true }).eq('moderation_status', 'pending_review'),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('user_type', 'aficionado'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('user_type', 'fan'),
  ])

  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('id, username, user_type, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentFlagged } = await supabase
    .from('content')
    .select('id, title, moderation_status, created_at')
    .eq('moderation_status', 'pending_review')
    .order('created_at', { ascending: false })
    .limit(5)

  // suppress unused-variable warnings — these vars are kept for future use
  void activeSubscriptions
  void totalCreators
  void totalFans

  return (
    <div className="space-y-8">
      <SectionHeader
        variant="editorial"
        number="00"
        label="ADMIN DASHBOARD"
        title="Platform Overview"
      />

      {/* Stats Row */}
      <div className="clipcut-card flex flex-row items-center justify-around gap-6 p-6">
        <StatCounter target={totalUsers ?? 0} label="Total Users" />
        <StatCounter target={totalContent ?? 0} label="Total Content" />
        <StatCounter target={flaggedContent ?? 0} label="Pending Queue" />
      </div>

      <div className="section-divider" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Moderation Queue */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <SectionHeader
            variant="editorial"
            number="01"
            label="MODERATION QUEUE"
            title="Moderation Queue"
            size="sm"
            className="mb-4"
          />
          {recentFlagged && recentFlagged.length > 0 ? (
            <div className="space-y-1">
              {recentFlagged.map(c => (
                <div key={c.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0 gap-2">
                  <Link href={`/content/${c.id}`} className="text-sm text-foreground hover:text-primary truncate max-w-[50%] transition-colors">
                    {c.title}
                  </Link>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {}}
                      className="text-[11px] px-2.5 py-1 rounded-md font-semibold bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {}}
                      className="text-[11px] px-2.5 py-1 rounded-md font-semibold bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={ShieldCheck} title="Queue Clear" description="No content awaiting review." />
          )}
        </div>

        {/* User Management */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <SectionHeader
            variant="editorial"
            number="02"
            label="USER MANAGEMENT"
            title="User Management"
            size="sm"
            className="mb-4"
            action={
              <Link href="/admin/users" className="text-xs text-primary hover:underline">
                View all
              </Link>
            }
          />
          {recentUsers && recentUsers.length > 0 ? (
            <div className="space-y-1">
              {recentUsers.map(u => (
                <div key={u.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">@{u.username ?? 'unnamed'}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      u.user_type === 'aficionado'
                        ? 'bg-[rgba(245,158,11,0.15)] text-[#F59E0B]'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {u.user_type ?? 'unknown'}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Users} title="No signups yet" />
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { href: '/admin/email',      label: 'Send Email',    icon: Mail,       desc: 'Broadcast to users' },
          { href: '/admin/users',      label: 'Manage Users',  icon: Users,      desc: 'View & moderate accounts' },
          { href: '/admin/moderation', label: 'Moderation',    icon: ShieldCheck, desc: 'Review flagged content' },
        ].map(item => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,200,0.25)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
              }}
            >
              <Icon className="w-5 h-5 text-primary mb-2.5 transition-transform group-hover:scale-110" />
              <div className="text-sm font-semibold text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
