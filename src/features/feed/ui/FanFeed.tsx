'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle, Compass } from 'lucide-react'
import { DropZoneCarousel, type Drop } from './DropZoneCarousel'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

export interface Video {
  id: string
  creator: string
  description: string
  playbackId: string
  likes: string
  comments: string
  isSubscribed: boolean
  unlocksAt?: string
  moderationStatus?: string
}

export function FanFeed({ videos, drops }: { videos: Video[]; drops: Drop[] }) {
  return (
    <div className="min-h-[100dvh] bg-[#0A0A0C]">
      {/* Drop Zone carousel at top */}
      <div className="sticky top-0 z-20 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/[0.06]">
        <DropZoneCarousel drops={drops} />
      </div>

      {/* Video card list */}
      <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">
        {videos.length === 0 ? (
          /* Empty state */
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="clipcut-card flex flex-col items-center text-center px-8 py-12 max-w-xs w-full">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: 'rgba(0,212,200,0.1)',
                  border: '1px solid rgba(0,212,200,0.25)',
                }}
              >
                <Compass
                  className="w-8 h-8 text-primary"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,200,0.6))' }}
                />
              </div>
              <h3
                className="text-xl font-bold text-foreground mb-2"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
              >
                Nothing here yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6 text-pretty">
                Follow some creators to see their latest drops here.
              </p>
              <Link
                href="/explore"
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-background transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                style={{
                  background: '#00D4C8',
                  boxShadow: '0 0 20px rgba(0,212,200,0.35)',
                }}
              >
                Explore Creators
              </Link>
            </div>
          </div>
        ) : (
          videos.map((video, index) => {
            const thumbnailUrl = `https://image.mux.com/${video.playbackId}/thumbnail.jpg?width=400`
            const card = (
              <div className="clipcut-card overflow-hidden group cursor-pointer">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#100F17]">
                  <Image
                    src={thumbnailUrl}
                    alt={`${video.creator} — ${video.description}`}
                    fill
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />

                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                  {/* Creator username — bottom-left overlay */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <Link
                      href={`/${video.creator}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-white text-sm font-semibold hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      @{video.creator}
                    </Link>
                  </div>

                  {/* Like + comment counts — bottom-right overlay */}
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-white/90 text-xs font-medium">
                      <Heart className="w-3.5 h-3.5" />
                      {video.likes}
                    </span>
                    <span className="flex items-center gap-1 text-white/90 text-xs font-medium">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {video.comments}
                    </span>
                  </div>
                </div>

                {/* Description — 2-line truncate */}
                <div className="px-4 py-3">
                  <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            )

            // Wrap first 8 cards in RevealSection with stagger
            if (index < 8) {
              return (
                <RevealSection key={video.id} delay={index * 80}>
                  {card}
                </RevealSection>
              )
            }

            return <div key={video.id}>{card}</div>
          })
        )}
      </div>
    </div>
  )
}
