import { createClient } from '@/shared/lib/supabase/server'
import { Shield, User } from 'lucide-react'
import { SectionHeader, EmptyState } from '@/shared/ui/core'

export const metadata = { title: 'Users — Admin' }

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('profiles')
    .select('id, username, user_type, is_admin, zip_code, strikes, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Users"
        subtitle="Most recent 50 accounts"
        size="lg"
      />

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-border"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {['Username', 'Type', 'Zip', 'Strikes', 'Role', 'Joined'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((u, i) => (
                <tr
                  key={u.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-primary/5"
                  style={i % 2 !== 0 ? { background: 'rgba(255,255,255,0.01)' } : undefined}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      @{u.username ?? <span className="text-muted-foreground italic">unnamed</span>}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      u.user_type === 'aficionado'
                        ? 'bg-[rgba(245,158,11,0.15)] text-[#F59E0B]'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {u.user_type ?? '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{u.zip_code ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold text-sm ${
                      (u.strikes ?? 0) >= 3 ? 'text-destructive' :
                      (u.strikes ?? 0) > 0 ? 'text-orange-400' :
                      'text-muted-foreground'
                    }`}>
                      {u.strikes ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.is_admin ? (
                      <span className="flex items-center gap-1 text-xs text-primary">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">User</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyState icon={User} title="No users found" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
