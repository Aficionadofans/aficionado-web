'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { InnerCircleView } from '@/features/circles/ui/InnerCircleView'
import { ArrowLeft, Grip, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CreatorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string
  const [activeTab, setActiveTab] = useState<'feed' | 'circle'>('feed')

  return (
    <div className="min-h-[100dvh] bg-black text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">@{username}</h1>
          <p className="text-xs text-muted-foreground">34.2K Subscribers</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('feed')}
          className={cn(
            "flex-1 py-4 text-sm font-bold uppercase tracking-wider relative transition-colors",
            activeTab === 'feed' ? "text-white" : "text-white/40 hover:text-white/60"
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
            "flex-1 py-4 text-sm font-bold uppercase tracking-wider relative transition-colors",
            activeTab === 'circle' ? "text-amber-500" : "text-amber-500/40 hover:text-amber-500/60"
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

      {/* Tab Content */}
      <div className="flex-1 relative">
        {activeTab === 'feed' ? (
          <div className="grid grid-cols-3 gap-1 p-1">
            {/* Mock grid of videos */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="aspect-[9/16] bg-white/5 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        ) : (
          <InnerCircleView username={username} />
        )}
      </div>
    </div>
  )
}
