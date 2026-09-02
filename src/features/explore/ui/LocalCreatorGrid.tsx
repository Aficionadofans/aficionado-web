'use client'

import { MapPin, Sparkles, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/core/avatar'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

interface LocalCreator {
  id: string
  username: string | null
  avatar_url: string | null
  bio: string | null
  zip_code: string | null
}

interface LocalCreatorGridProps {
  creators: LocalCreator[]
  userZip: string
}

export function LocalCreatorGrid({ creators, userZip }: LocalCreatorGridProps) {
  if (creators.length === 0) {
    return (
      <div className="p-8 rounded-2xl liquid-glass-panel text-center border border-white/8">
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-7 h-7 text-primary" />
        </div>
        <h3
          className="text-lg font-bold text-white mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          No creators in {userZip} yet
        </h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto leading-relaxed">
          Be the first creator in your area. Local fans are waiting to discover you.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground font-bold text-xs tracking-wide hover:bg-primary-hover transition-all shadow-[0_0_16px_rgba(0,212,200,0.3)] hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Start Creating
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {creators.map((creator, index) => (
        <RevealSection key={creator.id} delay={index * 80}>
          <Link
            href={`/${creator.username || creator.id}`}
            className="clipcut-card-hover flex items-center gap-4 p-5 cursor-pointer group"
          >
            {/* Avatar */}
            <Avatar className="w-14 h-14 border border-white/20 shadow-[0_0_16px_rgba(0,212,200,0.15)] flex-shrink-0">
              <AvatarImage src={creator.avatar_url || ''} alt={creator.username || 'Creator'} />
              <AvatarFallback className="bg-white/10">
                <UserCircle2 className="w-7 h-7 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  @{creator.username || 'creator'}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-wider text-primary flex-shrink-0">
                  <MapPin className="w-2.5 h-2.5" />
                  {creator.zip_code}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {creator.bio || 'Local creator building their community.'}
              </p>
            </div>

            {/* Connect CTA */}
            <div className="flex-shrink-0">
              <span className="clipcut-pill text-[10px] font-bold uppercase tracking-[0.05em] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Connect
              </span>
            </div>
          </Link>
        </RevealSection>
      ))}
    </div>
  )
}
