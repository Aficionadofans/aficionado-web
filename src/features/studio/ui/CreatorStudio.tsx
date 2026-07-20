'use client'

import React, { useState } from 'react'
import { Upload, Video, TrendingUp, ShieldCheck, AlertTriangle, Lock, FileVideo } from 'lucide-react'
import { CreateDropModal } from './CreateDropModal'
import { TimeCapsuleModal } from './TimeCapsuleModal'
import Link from 'next/link'

interface FlaggedItem {
  id: string
  title: string
  moderation_status: string
  created_at: string
}

interface CreatorStudioProps {
  username: string
  activeSubscribers?: number
  totalContent?: number
  flaggedContent?: FlaggedItem[]
}

export function CreatorStudio({
  username,
  activeSubscribers = 0,
  totalContent = 0,
  flaggedContent = [],
}: CreatorStudioProps) {
  const [isDropModalOpen, setIsDropModalOpen] = useState(false)
  const [isTimeCapsuleModalOpen, setIsTimeCapsuleModalOpen] = useState(false)

  const liveUrl = username ? `/live/${username}` : '#'

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass border-primary/20 text-xs font-bold text-primary uppercase tracking-widest mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Creator Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-off-white drop-shadow-md">Creator Studio</h1>
        <p className="mt-2 text-muted-foreground text-sm font-medium leading-relaxed">Manage your content, engage your fans, and track community growth.</p>
      </header>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl liquid-glass-hover border-amber-500/30 group relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Upload className="w-7 h-7 text-amber-500" />
          </div>
          <span className="text-base font-bold text-amber-400">Upload Video</span>
        </button>

        <Link
          href={liveUrl}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl liquid-glass-hover border-amber-500/30 group relative overflow-hidden"
          aria-disabled={!username}
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Video className="w-7 h-7 text-amber-500" />
          </div>
          <span className="text-base font-bold text-amber-400">Go Live</span>
        </Link>

        <button
          onClick={() => setIsDropModalOpen(true)}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl liquid-glass-hover border-bio-teal/30 group relative overflow-hidden shadow-[0_0_20px_rgba(0,240,181,0.15)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-bio-teal/10 border border-bio-teal/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,240,181,0.25)]">
            <svg className="w-7 h-7 text-bio-teal" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-base font-bold text-bio-teal">Create Drop</span>
        </button>

        <button
          onClick={() => setIsTimeCapsuleModalOpen(true)}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl liquid-glass-hover border-indigo-500/30 group relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Lock className="w-7 h-7 text-indigo-400" />
          </div>
          <span className="text-base font-bold text-indigo-400">Time Capsule</span>
        </button>
      </section>

      {isDropModalOpen && <CreateDropModal onClose={() => setIsDropModalOpen(false)} />}
      {isTimeCapsuleModalOpen && <TimeCapsuleModal onClose={() => setIsTimeCapsuleModalOpen(false)} />}

      {/* Stats */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" /> Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-6 rounded-2xl flex flex-col">
            <span className="text-sm font-medium text-muted-foreground mb-1">Active Subscribers</span>
            <span className="text-3xl font-bold text-white">{activeSubscribers.toLocaleString()}</span>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col">
            <span className="text-sm font-medium text-muted-foreground mb-1">Total Content</span>
            <span className="text-3xl font-bold text-white">{totalContent.toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* Moderation Inbox */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Moderation Inbox
          </h2>
          <span className="text-xs text-muted-foreground">Automated by Aficionado AI</span>
        </div>
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          {flaggedContent.length === 0 ? (
            <div className="flex items-center gap-3 p-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">All uploads passed moderation checks.</span>
            </div>
          ) : (
            flaggedContent.map(item => (
              <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white mb-1 truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    This content is under review and hidden from the public feed.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href={`/content/${item.id}`}
                      className="px-4 py-2 text-xs font-bold rounded-full bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
