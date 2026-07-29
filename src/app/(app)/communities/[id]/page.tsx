import { createClient } from '@/shared/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Users, ArrowLeft, ShieldCheck, Sparkles, Hash } from 'lucide-react'
import { InnerCircleView } from '@/features/circles/ui/InnerCircleView'

export default async function CommunityCircleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Fetch circle details
  const { data: circle } = await supabase
    .from('circles')
    .select('id, name, description, owner_id, created_at, profiles!inner(username, avatar_url)')
    .eq('id', id)
    .single()

  if (!circle) {
    notFound()
  }

  // 2. Count members
  const { count: memberCount } = await supabase
    .from('circle_members')
    .select('*', { count: 'exact', head: true })
    .eq('circle_id', id)

  const ownerProfile = Array.isArray(circle.profiles) ? circle.profiles[0] : circle.profiles
  const ownerUsername = (ownerProfile as { username?: string })?.username ?? 'aficionado'

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col items-center relative overflow-hidden pb-20 md:pb-12">
      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent pointer-events-none blur-3xl" />

      {/* Top Header Bar */}
      <div className="w-full max-w-5xl px-4 py-6 z-10">
        <Link
          href="/communities"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Communities</span>
        </Link>

        {/* Circle Card Banner */}
        <div className="liquid-glass border border-white/12 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_24px_rgba(0,212,200,0.4)] shrink-0">
                <Hash className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1
                    className="text-2xl sm:text-3xl font-black text-off-white tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {circle.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-[10px] font-bold text-primary">
                    <Sparkles className="w-3 h-3" /> Verified Circle
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                  {circle.description || 'A vibrant community circle for like-minded aficionados.'}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-primary" /> Members
                </span>
                <span className="text-lg font-extrabold text-foreground">{memberCount ?? 1}</span>
              </div>
              <div className="flex flex-col ml-4 sm:ml-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Host
                </span>
                <span className="text-sm font-bold text-foreground">@{ownerUsername}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat / Inner Circle Component */}
        <div className="liquid-glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <InnerCircleView username={ownerUsername} circleId={circle.id} />
        </div>
      </div>
    </div>
  )
}
