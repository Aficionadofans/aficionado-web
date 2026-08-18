'use client'

import {
  Baby,
  Compass,
  Cpu,
  Hash,
  MapPin,
  Mic,
  Music,
  PlusCircle,
  Search,
  Smile,
  Users,
  Utensils,
  Video,
  Waves,
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { CreateCircleModal } from '@/features/circles/ui/CreateCircleModal'
import { createClient } from '@/shared/lib/supabase/client'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

interface CircleItem {
  id: string
  name: string
  description: string | null
  owner_id: string
  created_at: string
  member_count?: number
}

// Icon helper based on circle name keywords
function getCircleIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('dive') || n.includes('diver') || n.includes('scuba') || n.includes('ocean')) {
    return { icon: Waves, color: 'text-sky-400', bg: 'bg-sky-500/20', border: 'border-sky-500/40' }
  }
  if (n.includes('tech') || n.includes('dev') || n.includes('code') || n.includes('ai')) {
    return {
      icon: Cpu,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/40',
    }
  }
  if (n.includes('music') || n.includes('audio') || n.includes('sound') || n.includes('beat')) {
    return {
      icon: Music,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
      border: 'border-purple-500/40',
    }
  }
  if (n.includes('film') || n.includes('video') || n.includes('cinema') || n.includes('photo')) {
    return {
      icon: Video,
      color: 'text-rose-400',
      bg: 'bg-rose-500/20',
      border: 'border-rose-500/40',
    }
  }
  if (n.includes('parent') || n.includes('mom') || n.includes('dad') || n.includes('kid')) {
    return {
      icon: Baby,
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/40',
    }
  }
  if (n.includes('food') || n.includes('cook') || n.includes('chef') || n.includes('bake')) {
    return {
      icon: Utensils,
      color: 'text-orange-400',
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/40',
    }
  }
  if (n.includes('voice') || n.includes('talk') || n.includes('pod') || n.includes('cast')) {
    return { icon: Mic, color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-500/40' }
  }
  if (
    n.includes('wellness') ||
    n.includes('mind') ||
    n.includes('solace') ||
    n.includes('health')
  ) {
    return {
      icon: Smile,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/20',
      border: 'border-indigo-500/40',
    }
  }
  return { icon: Hash, color: 'text-primary', bg: 'bg-primary/20', border: 'border-primary/40' }
}

export default function CommunitiesHub() {
  const [circles, setCircles] = useState<CircleItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCircles = useCallback(async () => {
    setIsLoading(true)
    const supabase = createClient()
    try {
      const { data } = await supabase
        .from('circles')
        .select('id, name, description, owner_id, created_at')
        .order('created_at', { ascending: false })

      if (data) {
        // Fetch member count for each circle
        const circlesWithCounts = await Promise.all(
          data.map(async (circle) => {
            const { count } = await supabase
              .from('circle_members')
              .select('*', { count: 'exact', head: true })
              .eq('circle_id', circle.id)

            return {
              ...circle,
              member_count: count ?? 1,
            }
          }),
        )
        setCircles(circlesWithCounts)
      }
    } catch (err) {
      console.error('Error fetching circles:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCircles()
  }, [fetchCircles])

  const filteredCircles = circles.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col items-center p-6 sm:p-12 relative overflow-hidden pb-20 md:pb-12">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-breathe-calm" />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-bio-emerald/10 rounded-full blur-[120px] pointer-events-none animate-breathe-calm"
        style={{ animationDelay: '2s' }}
      />

      <div className="z-10 text-center mb-8 sm:mb-10 animate-fade-in-up">
        <SectionHeader
          variant="editorial"
          number="01"
          label="COMMUNITIES"
          title="Community Circles"
          subtitle="Connect in dedicated spaces tailored to your life stage, your creative passions, and your exact coordinates."
          icon={<Compass className="w-5 h-5" />}
          className="justify-center"
        />
      </div>

      {/* Action & Search Bar */}
      <div className="z-10 w-full max-w-2xl mb-12 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up">
        <div className="flex-1 w-full liquid-glass flex items-center gap-3 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/60 transition-all">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search community circles by topic or interest…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,212,200,0.4)] hover:bg-primary-hover transition-all shrink-0 hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Circle</span>
        </button>
      </div>

      {/* Grid of Community Circles */}
      <div className="w-full max-w-5xl z-10">
        {/* Core Highlight: Local Square (Neighborhoods) */}
        <div className="mb-10">
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-4">
            Featured Neighborhood Square
          </h3>
          <Link
            href="/communities/neighborhood"
            className="group clipcut-card-hover p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:shadow-[0_0_30px_rgba(0,212,200,0.35)]"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_25px_rgba(0,212,200,0.4)] shrink-0">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-off-white tracking-tight">
                    Local Square
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-[10px] font-bold text-primary">
                    Verified Zip Code
                  </span>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
                  Hyper-local living communities for neighbors. Strictly segregated and verified by
                  your Zip Code.
                </p>
              </div>
            </div>
            <span className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold tracking-wider uppercase text-xs shrink-0 group-hover:bg-primary-hover transition-colors shadow-[0_0_20px_rgba(0,212,200,0.4)]">
              Enter Neighborhood →
            </span>
          </Link>
        </div>

        {/* Dynamic Community Circles */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">
              Active Circles ({filteredCircles.length})
            </h3>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="liquid-glass p-8 rounded-3xl animate-pulse h-48" />
              ))}
            </div>
          ) : filteredCircles.length === 0 ? (
            <div className="text-center py-16 liquid-glass rounded-3xl border border-white/10 p-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">No circles found</h4>
              <p className="text-xs text-muted-foreground mb-6">
                Be the first creator to launch a new community circle!
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-primary-hover transition-colors shadow-[0_0_20px_rgba(0,212,200,0.4)]"
              >
                <PlusCircle className="w-4 h-4" /> Create Circle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCircles.map((circle, idx) => {
                const style = getCircleIcon(circle.name)
                const IconComponent = style.icon

                return (
                  <RevealSection key={circle.id} delay={idx * 60}>
                    <Link
                      href={`/communities/${circle.id}`}
                      className="group clipcut-card-hover p-6 rounded-3xl flex flex-col justify-between h-full relative overflow-hidden border border-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-[0_0_24px_rgba(0,212,200,0.25)]"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-2xl ${style.bg} border ${style.border} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}
                          >
                            <IconComponent className={`w-6 h-6 ${style.color}`} />
                          </div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-muted-foreground">
                            <Users className="w-3 h-3 text-primary" /> {circle.member_count}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-off-white group-hover:text-primary transition-colors tracking-tight mb-2">
                          {circle.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                          {circle.description ||
                            'A vibrant community circle for like-minded aficionados.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/8 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                        <span>Enter Circle</span>
                        <span>→</span>
                      </div>
                    </Link>
                  </RevealSection>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Circle Modal */}
      <CreateCircleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchCircles()}
      />
    </div>
  )
}
