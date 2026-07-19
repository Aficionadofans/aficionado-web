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
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Creator Studio</h1>
        <p className="mt-2 text-muted-foreground">Manage your content, engage your fans, and track growth.</p>
      </header>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl liquid-glass-hover bg-amber-500/10 border border-amber-500/30 group">
          <Upload className="w-8 h-8 text-amber-500 group-hover:-translate-y-1 transition-transform" />
          <span className="text-base font-bold text-amber-500">Upload Video</span>
        </button>

        <Link
          href={liveUrl}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl liquid-glass-hover bg-amber-500/10 border border-amber-500/30 group"
          aria-disabled={!username}
        >
          <Video className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
          <span className="text-base font-bold text-amber-500">Go Live</span>
        </Link>

        <button
          onClick={() => setIsDropModalOpen(true)}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl liquid-glass-hover bg-amber-500/20 border border-amber-500 group shadow-[0_0_15px_rgba(245,158,11,0.2)]"
        >
          <svg className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-base font-bold text-amber-500">Create Drop</span>
        </button>

        <button
          onClick={() => setIsTimeCapsuleModalOpen(true)}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl liquid-glass-hover bg-indigo-500/10 border border-indigo-500/30 group"
        >
          <Lock className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
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
