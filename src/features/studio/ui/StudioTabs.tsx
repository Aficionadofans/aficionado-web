'use client'

import { PenSquare, Video } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ComposeForm } from './ComposeForm'
import { VideoUploadForm } from './VideoUploadForm'

export function StudioTabs() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'video' ? 'video' : 'post'
  const [activeTab, setActiveTab] = useState<'post' | 'video'>(initialTab)

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8 animate-fade-in-up">
        <div className="bg-white/5 p-1 rounded-xl flex gap-1 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('post')}
            className={cn(
              'flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
              activeTab === 'post'
                ? 'bg-primary text-primary-foreground shadow-[0_2px_10px_0_rgba(0,240,181,0.3)]'
                : 'text-muted-foreground hover:text-off-white hover:bg-white/5',
            )}
          >
            <PenSquare className="w-4 h-4" />
            Text Post
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={cn(
              'flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
              activeTab === 'video'
                ? 'bg-primary text-primary-foreground shadow-[0_2px_10px_0_rgba(0,240,181,0.3)]'
                : 'text-muted-foreground hover:text-off-white hover:bg-white/5',
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
