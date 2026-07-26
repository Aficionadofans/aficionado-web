'use client'

import { useState } from 'react'
import { ComposeForm } from './ComposeForm'
import { VideoUploadForm } from './VideoUploadForm'
import { PenSquare, Video } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StudioTabs() {
  const [activeTab, setActiveTab] = useState<'post' | 'video'>('post')

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8 animate-fade-in-up">
        <div className="bg-white/5 p-1 rounded-xl flex gap-1 border border-white/10">
          <button
            onClick={() => setActiveTab('post')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
              activeTab === 'post' 
                ? "bg-primary text-primary-foreground shadow-[0_2px_10px_0_rgba(0,240,181,0.3)]" 
                : "text-muted-foreground hover:text-off-white hover:bg-white/5"
            )}
          >
            <PenSquare className="w-4 h-4" />
            Text Post
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
              activeTab === 'video' 
                ? "bg-primary text-primary-foreground shadow-[0_2px_10px_0_rgba(0,240,181,0.3)]" 
                : "text-muted-foreground hover:text-off-white hover:bg-white/5"
            )}
          >
            <Video className="w-4 h-4" />
            Video Content
          </button>
        </div>
      </div>

      <div className="transition-all duration-500">
        {activeTab === 'post' ? <ComposeForm /> : <VideoUploadForm />}
      </div>
    </div>
  )
}
