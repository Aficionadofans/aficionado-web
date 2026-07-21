import { createClient } from '@/shared/lib/supabase/server'
import { Users, FileVideo, ShieldAlert, TrendingUp, Mail, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from '@/shared/ui/core'
import { EmptyState } from '@/shared/ui/core'

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

  const stats = [
    { label: 'Total Users',          value: totalUsers ?? 0,          icon: Users,       color: 'text-blue-400',        bg: 'bg-blue-500/10',        border: 'border-blue-500/20' },
    { label: 'Creators',             value: totalCreators ?? 0,       icon: TrendingUp,  color: 'text-[#F59E0B]',       bg: 'bg-[#F59E0B]/10',       border: 'border-[#F59E0B]/20' },
    { label: 'Fans',                 value: totalFans ?? 0,           icon: Users,       color: 'text-primary',         bg: 'bg-primary/10',         border: 'border-primary/20' },
    { label: 'Active Subscriptions', value: activeSubscriptions ?? 0, icon: DollarSign,  color: 'text-[#F59E0B]',       bg: 'bg-[#F59E0B]/10',       border: 'border-[#F59E0B]/20' },
    { label: 'Total Content',        value: totalContent ?? 0,        icon: FileVideo,   color: 'text-purple-400',      bg: 'bg-purple-500/10',      border: 'border-purple-500/20' },
    { label: 'Flagged Content',      value: flaggedContent ?? 0,      icon: ShieldAlert, color: 'text-destructive',     bg: 'bg-destructive/10',     border: 'border-destructive/20' },
  ]

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dashboard"
        subtitle="Platform overview and key metrics"
        size="lg"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`p-4 rounded-xl border ${stat.bg} ${stat.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value.toLocaleString()}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Recent Signups */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <SectionHeader
            title="Recent Signups"
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

        {/* Flagged Content */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <SectionHeader
            title="Flagged Content"
            size="sm"
            className="mb-4"
            action={
              <Link href="/admin/moderation" className="text-xs text-primary hover:underline">
                View all
              </Link>
            }
          />
          {recentFlagged && recentFlagged.length > 0 ? (
            <div className="space-y-1">
              {recentFlagged.map(c => (
                <div key={c.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <Link href={`/content/${c.id}`} className="text-sm text-foreground hover:text-primary truncate max-w-[68%] transition-colors">
                    {c.title}
                  </Link>
                  <span className="text-[10px] text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-full font-medium">
                    {c.moderation_status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={ShieldAlert} title="No flagged content" description="The platform is clean." />
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { href: '/admin/email',      label: 'Send Email',    icon: Mail,       desc: 'Broadcast to users' },
          { href: '/admin/users',      label: 'Manage Users',  icon: Users,      desc: 'View & moderate accounts' },
          { href: '/admin/moderation', label: 'Moderation',    icon: ShieldAlert, desc: 'Review flagged content' },
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
