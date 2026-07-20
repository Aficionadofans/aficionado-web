'use client'

import React from 'react'
import { Upload, Video, Lock } from 'lucide-react'
import Link from 'next/link'

interface StudioQuickActionsProps {
  username: string
  onOpenDropModal: () => void
  onOpenTimeCapsuleModal: () => void
}

export function StudioQuickActions({
  username,
  onOpenDropModal,
  onOpenTimeCapsuleModal,
}: StudioQuickActionsProps) {
  const liveUrl = username ? `/live/${username}` : '#'

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl liquid-glass-hover border-primary/30 group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,212,200,0.2)]">
          <Upload className="w-7 h-7 text-primary" />
        </div>
        <span className="text-base font-bold text-primary tracking-tight">Upload Video</span>
      </button>

      <Link
        href={liveUrl}
        className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl liquid-glass-hover border-primary/30 group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        aria-disabled={!username}
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,212,200,0.2)]">
          <Video className="w-7 h-7 text-primary" />
        </div>
        <span className="text-base font-bold text-primary tracking-tight">Go Live</span>
      </Link>

      <button
        onClick={onOpenDropModal}
        className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl liquid-glass-hover border-bio-teal/30 group relative overflow-hidden shadow-[0_0_20px_rgba(0,240,181,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-teal"
      >
        <div className="w-14 h-14 rounded-2xl bg-bio-teal/10 border border-bio-teal/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,240,181,0.25)]">
          <svg className="w-7 h-7 text-bio-teal" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-base font-bold text-bio-teal tracking-tight">Create Drop</span>
      </button>

      <button
        onClick={onOpenTimeCapsuleModal}
        className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl liquid-glass-hover border-indigo-500/30 group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]">
          <Lock className="w-7 h-7 text-indigo-400" />
        </div>
        <span className="text-base font-bold text-indigo-400 tracking-tight">Time Capsule</span>
      </button>
    </section>
  )
}
