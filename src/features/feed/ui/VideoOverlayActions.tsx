'use client'

import React, { useState } from 'react'
import { Heart, MessageCircle, DollarSign, Users, Share2, Check } from 'lucide-react'
import Link from 'next/link'

interface VideoOverlayActionsProps {
  videoId: string
  creator: string
  likes: string
  comments: string
  isLiked: boolean
  copiedId: string | null
  onToggleLike: (id: string) => void
  onOpenTipModal: (creator: string) => void
  onShare: (id: string, creator: string) => void
}

export function VideoOverlayActions({
  videoId,
  creator,
  likes,
  comments,
  isLiked,
  copiedId,
  onToggleLike,
  onOpenTipModal,
  onShare,
}: VideoOverlayActionsProps) {
  const [likeAnimating, setLikeAnimating] = useState(false)

  const handleLike = () => {
    if (!isLiked) {
      setLikeAnimating(true)
      setTimeout(() => setLikeAnimating(false), 400)
    }
    onToggleLike(videoId)
  }

  return (
    <div className="absolute right-3 bottom-24 flex flex-col items-center gap-6 z-20 pointer-events-auto">
      {/* Like */}
      <button
        onClick={handleLike}
        aria-label={isLiked ? 'Unlike video' : 'Like video'}
        className="flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full"
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
          style={
            isLiked
              ? {
                  background: 'rgba(236,72,153,0.2)',
                  border: '1px solid rgba(236,72,153,0.4)',
                  boxShadow: '0 0 14px rgba(236,72,153,0.35)',
                }
              : {
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }
          }
        >
          <Heart
            className={[
              'w-5 h-5 transition-all',
              isLiked ? 'fill-pink-500 text-pink-500' : 'text-white',
              likeAnimating ? 'animate-like-pulse' : isLiked ? 'scale-110' : '',
            ].join(' ')}
          />
        </div>
        <span className="text-[11px] font-medium text-white/80 drop-shadow-sm tabular-nums">
          {isLiked ? parseInt(likes || '0') + 1 : likes}
        </span>
      </button>

      {/* Comments */}
      <button
        aria-label="View comments"
        className="flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full group"
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 group-hover:border-white/20"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-[11px] font-medium text-white/80 drop-shadow-sm tabular-nums">{comments}</span>
      </button>

      {/* Tip — amber: monetization only */}
      <button
        onClick={() => onOpenTipModal(creator)}
        aria-label={`Send tip to ${creator}`}
        className="flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]/50 rounded-full group"
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
          style={{
            background: 'rgba(245,158,11,0.12)',
            border: '1px solid rgba(245,158,11,0.35)',
            boxShadow: '0 0 10px rgba(245,158,11,0.15)',
          }}
        >
          <DollarSign
            className="w-5 h-5 text-[#F59E0B] group-hover:scale-110 transition-transform"
            style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.7))' }}
          />
        </div>
        <span className="text-[11px] font-medium text-[#F59E0B] drop-shadow-sm">Tip</span>
      </button>

      {/* Spaces — teal: brand/social */}
      <Link
        href="/communities"
        aria-label="Open Spaces / Communities"
        className="flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full group"
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(0,212,200,0.35)]"
          style={{
            background: 'rgba(0,212,200,0.1)',
            border: '1px solid rgba(0,212,200,0.3)',
            boxShadow: '0 0 10px rgba(0,212,200,0.12)',
          }}
        >
          <Users
            className="w-5 h-5 text-primary group-hover:scale-110 transition-transform"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,200,0.7))' }}
          />
        </div>
        <span className="text-[11px] font-medium text-primary drop-shadow-sm">Spaces</span>
      </Link>

      {/* Share */}
      <button
        onClick={() => onShare(videoId, creator)}
        aria-label="Share video"
        className="flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full group"
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {copiedId === videoId ? (
            <Check className="w-5 h-5 text-bio-emerald" />
          ) : (
            <Share2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          )}
        </div>
        <span className="text-[11px] font-medium text-white/70">
          {copiedId === videoId ? 'Copied!' : 'Share'}
        </span>
      </button>
    </div>
  )
}
