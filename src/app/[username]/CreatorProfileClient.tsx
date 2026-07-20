'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { InnerCircleView } from '@/features/circles/ui/InnerCircleView'
import { ArrowLeft, Grip, Lock, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface Profile {
  id: string
  username: string
  bio?: string
  avatar_url?: string
  user_type?: string
}

interface ContentItem {
  id: string
  mux_playback_id?: string
  title: string
  description?: string
  visibility: string
}

interface Props {
  profile: Profile
  subscriberCount: number
  contentItems: ContentItem[]
  circleId: string
}

export function CreatorProfileClient({ profile, subscriberCount, contentItems, circleId }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'feed' | 'circle'>('feed')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formattedCount = subscriberCount >= 1000
    ? `${(subscriberCount / 1000).toFixed(1)}K`
    : subscriberCount.toString()

  return (
    <div className="min-h-[100dvh] bg-black text-white flex flex-col">
      {/* Header — shrinks on scroll */}
      <header
        className={cn(
          'sticky top-0 z-50 liquid-glass rounded-none border-t-0 border-l-0 border-r-0 border-b border-white/10 flex items-center transition-all duration-300 ease-out',
          scrolled ? 'px-3 py-1.5 gap-2' : 'px-4 py-3 gap-4'
        )}
      >
        <button
          onClick={() => router.back()}
          className={cn(
            'rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300',
            scrolled ? 'w-8 h-8' : 'w-10 h-10'
          )}
          aria-label="Go back"
        >
          <ArrowLeft className={cn('transition-all duration-300', scrolled ? 'w-4 h-4' : 'w-5 h-5')} />
        </button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {profile.avatar_url && (
            <Image
              src={profile.avatar_url}
              alt={profile.username}
              width={scrolled ? 28 : 36}
              height={scrolled ? 28 : 36}
              className={cn(
                'rounded-full object-cover flex-shrink-0 transition-all duration-300',
                scrolled ? 'w-7 h-7' : 'w-9 h-9'
              )}
            />
          )}
          <div className="min-w-0">
            <h1 className={cn(
              'font-bold truncate transition-all duration-300',
              scrolled ? 'text-sm' : 'text-base'
            )}>@{profile.username}</h1>
            <p className={cn(
              'text-muted-foreground transition-all duration-300',
              scrolled ? 'text-[10px] leading-tight' : 'text-xs'
            )}>
              {formattedCount} Subscriber{subscriberCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </header>

      {/* Bio */}
      {profile.bio && (
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-sm text-muted-foreground">{profile.bio}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('feed')}
          className={cn(
            'flex-1 py-4 text-sm font-bold uppercase tracking-wider relative transition-colors',
            activeTab === 'feed' ? 'text-white' : 'text-white/40 hover:text-white/60'
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Grip className="w-4 h-4" /> Public Feed
          </div>
          {activeTab === 'feed' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('circle')}
          className={cn(
            'flex-1 py-4 text-sm font-bold uppercase tracking-wider relative transition-colors',
            activeTab === 'circle' ? 'text-amber-500' : 'text-amber-500/40 hover:text-amber-500/60'
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" /> Inner Circle
          </div>
          {activeTab === 'circle' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {activeTab === 'feed' ? (
          contentItems.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
              No content yet.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-0.5 p-0.5">
              {contentItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/content/${item.id}`}
                  className="aspect-[9/16] bg-white/5 relative overflow-hidden group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.mux_playback_id ? (
                    <img
                      src={`https://image.mux.com/${item.mux_playback_id}/thumbnail.jpg?width=400`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 transition-transform duration-500 group-hover:scale-110" />
                  )}
                  {item.visibility === 'subscriber' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-amber-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <Play className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : circleId ? (
          <InnerCircleView username={profile.username} circleId={circleId} />
        ) : (
          <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
            This creator does not have an inner circle yet.
          </div>
        )}
      </div>
    </div>
  )
}
