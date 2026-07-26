'use client'

import { useState } from 'react'
import { Sparkles, Video } from 'lucide-react'
import MuxUploader from '@mux/mux-uploader-react'
import { cn } from '@/lib/utils'

export function VideoUploadForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'subscriber' | 'ppv'>('subscriber')
  const [pricePpv, setPricePpv] = useState<string>('')
  
  // Custom endpoint logic for the Mux uploader to fetch the upload URL from our backend
  const getUploadUrl = async () => {
    try {
      const res = await fetch('/api/mux/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || 'Untitled Video',
          description,
          visibility,
          pricePpv: visibility === 'ppv' ? parseFloat(pricePpv) : null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to get upload URL')
      return data.url
    } catch (e) {
      console.error('Upload error:', e)
      throw e
    }
  }

  const [isSuccess, setIsSuccess] = useState(false)

  const handleUploadSuccess = () => {
    setIsSuccess(true)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="liquid-glass p-6 animate-fade-in-up">
      {isSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-semibold flex items-center justify-between animate-fade-in">
          <span>✓ Video uploaded successfully! It is currently processing and will appear on the feed shortly.</span>
          <button 
            type="button" 
            onClick={() => setIsSuccess(false)}
            className="text-xs underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <input 
            type="text"
            className="w-full bg-transparent border-none text-off-white placeholder:text-muted-foreground focus:outline-none text-2xl font-bold"
            placeholder="Video Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <textarea 
            className="w-full h-24 bg-transparent border-none resize-none text-off-white placeholder:text-muted-foreground focus:outline-none text-base"
            placeholder="Tell your fans about this video..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="h-px w-full bg-white/10 my-4"></div>
        
        <div className="mb-6">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3 h-3 text-primary" />
            Visibility
          </label>
          <div className="flex flex-wrap gap-3">
            {(['public', 'subscriber', 'ppv'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVisibility(v)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border",
                  visibility === v 
                    ? "bg-primary/20 text-primary border-primary/30" 
                    : "bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10 hover:text-off-white"
                )}
              >
                {v === 'subscriber' ? 'Subscribers' : v === 'ppv' ? 'Pay-Per-View' : 'Public'}
              </button>
            ))}
          </div>
          
          {visibility === 'ppv' && (
            <div className="mt-4 animate-fade-in-up">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">
                Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input 
                  type="number"
                  min="1"
                  step="0.01"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-7 pr-4 text-off-white focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="5.00"
                  value={pricePpv}
                  onChange={e => setPricePpv(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="h-px w-full bg-white/10 my-4"></div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <Video className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <MuxUploader 
            endpoint={getUploadUrl}
            onSuccess={handleUploadSuccess}
            className="mux-uploader-custom mx-auto"
          />
          <p className="text-xs text-muted-foreground mt-4">
            Uploading will immediately create and publish this content based on your visibility settings.
          </p>
        </div>
      </div>
    </div>
  )
}
