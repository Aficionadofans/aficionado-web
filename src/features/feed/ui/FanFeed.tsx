'use client'

import React, { useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import { Heart, MessageCircle, Share2, DollarSign, Star, Lock, Clock, EyeOff, Users, Check } from 'lucide-react'
import Link from 'next/link'
import { DropZoneCarousel, type Drop } from './DropZoneCarousel'
import { TipModal } from '@/features/monetization/ui/TipModal'

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

export function FanFeed({ videos, drops }: { videos: Video[], drops: Drop[] }) {
  const [activeVideo, setActiveVideo] = useState(0)
  const [tipModalCreator, setTipModalCreator] = useState<string | null>(null)
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})
  const [subscribedMap, setSubscribedMap] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const index = Math.round(container.scrollTop / container.clientHeight)
    if (index !== activeVideo) {
      setActiveVideo(index)
    }
  }

  const toggleLike = (id: string) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleSubscribe = (creator: string) => {
    setSubscribedMap(prev => ({ ...prev, [creator]: !prev[creator] }))
  }

  const handleShare = (id: string) => {
    navigator.clipboard?.writeText?.(`${window.location.origin}/content/${id}`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="h-full w-full max-w-md mx-auto relative bg-background">
      {/* Absolute top Drop Zone Carousel */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/90 to-transparent pt-2">
        <DropZoneCarousel drops={drops} />
      </div>

      {/* Main scrolling video feed */}
      <div 
        className="h-full w-full relative snap-y snap-mandatory overflow-y-scroll hide-scrollbar bg-background"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
      {videos.map((video, idx) => {
        const isLocked = video.unlocksAt && new Date(video.unlocksAt) > new Date();
        const unlockDateString = video.unlocksAt ? new Date(video.unlocksAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
        const isNsfw = video.moderationStatus === 'rejected';
        const isLiked = likedMap[video.id];
        const isSubscribed = video.isSubscribed || subscribedMap[video.creator];
        
        const autoPlayVideo = !isLocked && !isNsfw && idx === activeVideo;

        return (
        <div key={video.id} className="h-full w-full snap-start relative bg-background flex justify-center items-center overflow-hidden">
          
          {isNsfw ? (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-background">
              <div className="w-20 h-20 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center mb-6">
                <EyeOff className="w-10 h-10 text-destructive" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-widest drop-shadow-lg">Content Removed</h3>
              <p className="text-destructive/80 font-medium max-w-[80%] text-sm text-pretty">
                This content was removed for violating our strict Community Guidelines against adult material.
              </p>
            </div>
          ) : (
            <>
              {/* Video Player */}
              <div className={`absolute inset-0 transition-all duration-1000 ${isLocked ? 'blur-[40px] scale-125 opacity-40' : ''}`}>
                <MuxPlayer
                  playbackId={video.playbackId}
                  className="h-full w-full object-cover pointer-events-none"
                  loop
                  muted={false}
                  autoPlay={autoPlayVideo ? "any" : false}
                  streamType="on-demand"
                  style={{ '--controls': 'none' } as any}
                />
              </div>

              {isLocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
                  {/* VIP Glows for Time Capsule */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] animate-breathe-calm pointer-events-none"></div>
                  
                  <div className="relative z-10 w-24 h-24 rounded-full liquid-glass border border-indigo-500/40 mx-auto flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
                    <Lock className="w-10 h-10 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                  </div>
                  <h3 className="relative z-10 text-3xl font-black text-white mb-2 uppercase tracking-widest drop-shadow-lg">Time Capsule</h3>
                  <p className="relative z-10 text-indigo-200/80 font-medium mb-8 max-w-[80%] text-pretty">This exclusive drop is sealed and waiting for the right moment.</p>
                  
                  <div className="relative z-10 liquid-glass px-6 py-5 rounded-[2rem] flex items-center gap-4 mb-8 border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <Clock className="w-6 h-6 text-indigo-400 animate-pulse" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-indigo-200/70 font-bold uppercase tracking-widest mb-1">Unlocks On</div>
                      <div className="text-xl font-bold text-white tracking-tight">{unlockDateString}</div>
                    </div>
                  </div>

                  <button className="relative z-10 px-8 py-4 rounded-full bg-indigo-500 text-white font-bold tracking-wider hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:-translate-y-1 uppercase text-sm">
                    Set Reminder
                  </button>
                </div>
              )}
            </>
          )}

          {/* Overlay UI (Liquid Glass) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/20 via-transparent to-background/90" />

          {/* Right Floating Actions */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-10 pointer-events-auto">
            <button 
              onClick={() => toggleLike(video.id)}
              aria-label={isLiked ? "Unlike video" : "Like video"}
              className="flex flex-col items-center gap-1 group focus-visible:outline-none"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isLiked 
                  ? 'bg-pink-500/20 border border-pink-500/40 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] scale-110' 
                  : 'liquid-glass-hover text-white'
              }`}>
                <Heart className={`w-6 h-6 transition-transform ${isLiked ? 'fill-pink-500 text-pink-500 scale-110' : 'group-hover:scale-110'}`} />
              </div>
              <span className="text-xs font-semibold text-white/90 drop-shadow-md">
                {isLiked ? parseInt(video.likes || '0') + 1 : video.likes}
              </span>
            </button>

            <button 
              aria-label="Comments"
              className="flex flex-col items-center gap-1 group focus-visible:outline-none"
            >
              <div className="w-12 h-12 rounded-full liquid-glass-hover flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-semibold text-white/90 drop-shadow-md">{video.comments}</span>
            </button>

            <button 
              onClick={() => setTipModalCreator(video.creator)}
              aria-label={`Send tip to ${video.creator}`}
              className="flex flex-col items-center gap-1 group focus-visible:outline-none"
            >
              <div className="w-12 h-12 rounded-full liquid-glass-hover border-amber-500/40 bg-amber-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <DollarSign className="w-6 h-6 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-semibold text-amber-500 drop-shadow-md">Tip</span>
            </button>

            <Link href="/communities" className="flex flex-col items-center gap-1 group focus-visible:outline-none">
              <div className="w-12 h-12 rounded-full liquid-glass-hover border-bio-teal/40 bg-bio-teal/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,181,0.2)]">
                <Users className="w-6 h-6 text-bio-teal drop-shadow-[0_0_8px_rgba(0,240,181,0.8)] group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-semibold text-bio-teal drop-shadow-md">Spaces</span>
            </Link>

            <button 
              onClick={() => handleShare(video.id)}
              aria-label="Share video link"
              className="flex flex-col items-center gap-1 group focus-visible:outline-none"
            >
              <div className="w-12 h-12 rounded-full liquid-glass-hover flex items-center justify-center">
                {copiedId === video.id ? (
                  <Check className="w-6 h-6 text-bio-emerald" />
                ) : (
                  <Share2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                )}
              </div>
              <span className="text-[10px] font-medium text-white/80">
                {copiedId === video.id ? 'Copied' : 'Share'}
              </span>
            </button>
          </div>

          {/* Bottom Left Info */}
          <div className="absolute left-4 bottom-20 max-w-[70%] z-10 pointer-events-auto">
            <div className="flex items-center gap-3 mb-2">
              <Link href={`/${video.creator}`}>
                <h2 className="text-lg font-bold text-white drop-shadow-lg hover:underline decoration-amber-500">@{video.creator}</h2>
              </Link>
              {!isSubscribed ? (
                <button 
                  onClick={() => toggleSubscribe(video.creator)}
                  className="px-4 py-1.5 text-xs font-bold rounded-full bg-amber-500 text-black uppercase tracking-wider hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105"
                >
                  Subscribe
                </button>
              ) : (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full liquid-glass border-amber-500/40 bg-amber-500/10">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">VIP</span>
                </div>
              )}
            </div>
            <p className="text-sm text-white/90 drop-shadow-md text-pretty line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          </div>
        </div>
        );
      })}
      </div>

      {tipModalCreator && (
        <TipModal 
          creatorId={tipModalCreator} 
          onClose={() => setTipModalCreator(null)} 
        />
      )}
    </div>
  )
}

