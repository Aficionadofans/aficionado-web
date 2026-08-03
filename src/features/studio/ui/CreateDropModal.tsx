'use client'

import MuxUploader from '@mux/mux-uploader-react'
import { Film, ImagePlus, Send, Sparkles, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createPost } from '@/app/(app)/create/actions'
import { cn } from '@/lib/utils'
import { createClient } from '@/shared/lib/supabase/client'

function SubmitButton({ hasMedia, isUploading }: { hasMedia: boolean; isUploading: boolean }) {
  const { pending } = useFormStatus()
  const disabled = pending || isUploading

  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-all font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-95 disabled:opacity-50 disabled:active:scale-100"
    >
      <span>
        {pending
          ? 'Dropping...'
          : isUploading
            ? 'Uploading...'
            : hasMedia
              ? 'Drop It 🎬'
              : 'Drop It'}
      </span>
      <Send className="w-4 h-4 ml-1" />
    </button>
  )
}

export function CreateDropModal({ onClose }: { onClose: () => void }) {
  const [showUploader, setShowUploader] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [contentId, setContentId] = useState<string | null>(null)
  const [visibility, setVisibility] = useState<'public' | 'subscriber'>('subscriber')
  const supabase = createClient()

  // Mux uploader endpoint — creates a content record and returns the direct upload URL
  const getUploadUrl = async () => {
    try {
      setIsUploading(true)
      const { data, error } = await supabase.functions.invoke('api/mux/upload', {
        body: {
          title: 'Drop Media',
          description: '',
          visibility,
        },
      })
      if (error) throw error
      setContentId(data.contentId)
      return data.url
    } catch (e) {
      setIsUploading(false)
      console.error('Upload error:', e)
      throw e
    }
  }

  const handleUploadSuccess = () => {
    setIsUploading(false)
    setUploadComplete(true)
  }

  const handleRemoveMedia = () => {
    setShowUploader(false)
    setUploadComplete(false)
    setContentId(null)
    setIsUploading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel p-1 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black/60">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-500 fill-amber-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Lightning bolt"
            >
              <title>Lightning bolt</title>
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Create Drop
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form action={createPost}>
            <textarea
              name="content"
              className="w-full h-32 bg-transparent border-none resize-none text-white placeholder:text-muted-foreground focus:outline-none text-xl"
              placeholder="What's dropping?"
              required={!uploadComplete}
            ></textarea>

            {/* Hidden field to link content to the post */}
            {contentId && <input type="hidden" name="content_id" value={contentId} />}

            {/* Media Upload Section */}
            {showUploader && (
              <div className="animate-fade-in-up">
                <div className="h-px w-full bg-white/10 my-4"></div>

                {/* Visibility selector for media */}
                <div className="mb-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Media Visibility
                  </span>
                  <div className="flex gap-3">
                    {(['public', 'subscriber'] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setVisibility(v)}
                        disabled={isUploading || uploadComplete}
                        className={cn(
                          'px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border',
                          visibility === v
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : 'bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10 hover:text-white',
                          (isUploading || uploadComplete) && 'opacity-50 cursor-not-allowed',
                        )}
                      >
                        {v === 'subscriber' ? 'Subscribers Only' : 'Public'}
                      </button>
                    ))}
                  </div>
                </div>

                {uploadComplete ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Film className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-semibold">
                        ✓ Video attached — processing in background
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveMedia}
                      className="text-muted-foreground hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <Film className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <MuxUploader
                      endpoint={getUploadUrl}
                      onSuccess={handleUploadSuccess}
                      className="mux-uploader-custom mx-auto"
                    />
                    <p className="text-xs text-muted-foreground mt-3">
                      Upload a video to attach to your drop
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="h-px w-full bg-white/10 my-6"></div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowUploader(!showUploader)}
                disabled={isUploading}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                  showUploader
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white',
                  isUploading && 'opacity-50 cursor-not-allowed',
                )}
              >
                <ImagePlus className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {showUploader ? 'Hide Media' : 'Add Media'}
                </span>
              </button>

              <SubmitButton hasMedia={uploadComplete} isUploading={isUploading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
