'use client'

import React from 'react'
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
  return (
    <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-20 pointer-events-auto">
      {/* Like Button */}
      <button 
        onClick={() => onToggleLike(videoId)}
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
          {isLiked ? parseInt(likes || '0') + 1 : likes}
        </span>
      </button>

      {/* Comments Button */}
      <button 
        aria-label="Comments"
        className="flex flex-col items-center gap-1 group focus-visible:outline-none"
      >
        <div className="w-12 h-12 rounded-full liquid-glass-hover flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-xs font-semibold text-white/90 drop-shadow-md">{comments}</span>
      </button>

      {/* Tip Button */}
      <button 
        onClick={() => onOpenTipModal(creator)}
        aria-label={`Send tip to ${creator}`}
        className="flex flex-col items-center gap-1 group focus-visible:outline-none"
      >
        <div className="w-12 h-12 rounded-full liquid-glass-hover border-amber-500/40 bg-amber-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <DollarSign className="w-6 h-6 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-xs font-semibold text-amber-500 drop-shadow-md">Tip</span>
      </button>

      {/* Spaces Link */}
      <Link href="/communities" className="flex flex-col items-center gap-1 group focus-visible:outline-none">
        <div className="w-12 h-12 rounded-full liquid-glass-hover border-bio-teal/40 bg-bio-teal/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,181,0.2)]">
          <Users className="w-6 h-6 text-bio-teal drop-shadow-[0_0_8px_rgba(0,240,181,0.8)] group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-xs font-semibold text-bio-teal drop-shadow-md">Spaces</span>
      </Link>

      {/* Share Button */}
      <button 
        onClick={() => onShare(videoId, creator)}
        aria-label="Share video link"
        className="flex flex-col items-center gap-1 group focus-visible:outline-none"
      >
        <div className="w-12 h-12 rounded-full liquid-glass-hover flex items-center justify-center">
          {copiedId === videoId ? (
            <Check className="w-6 h-6 text-bio-emerald" />
          ) : (
            <Share2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          )}
        </div>
        <span className="text-[10px] font-medium text-white/80">
          {copiedId === videoId ? 'Copied' : 'Share'}
        </span>
      </button>
    </div>
  )
}
