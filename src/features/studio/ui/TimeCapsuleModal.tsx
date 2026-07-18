'use client'

import React, { useState } from 'react'
import { X, UploadCloud, Clock, Calendar, Lock } from 'lucide-react'

export function TimeCapsuleModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [unlockDate, setUnlockDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !unlockDate) return

    setIsSubmitting(true)
    
    // Mock upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setSuccess(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel p-1 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black/80">
        
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            Bury Time Capsule
          </h2>
          <button 
            onClick={onClose}
            disabled={isSubmitting || success}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Capsule Buried!</h3>
              <p className="text-muted-foreground text-center">Your fans will be eagerly awaiting the unlock date.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Upload Video</label>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group relative overflow-hidden">
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {file ? (
                    <div className="text-center">
                      <div className="text-indigo-400 font-bold mb-1">{file.name}</div>
                      <div className="text-xs text-muted-foreground">Ready to seal</div>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-muted-foreground group-hover:text-indigo-400 mb-3 transition-colors" />
                      <p className="text-white font-medium mb-1">Click or drag video to upload</p>
                      <p className="text-xs text-muted-foreground">MP4, WebM up to 1GB</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Unlock Date
                </label>
                <input 
                  type="datetime-local" 
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Teaser Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell your fans what they're waiting for..." 
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-indigo-500/50 transition-colors resize-none text-sm"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !file || !unlockDate}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-indigo-500 text-white font-bold tracking-wider hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] disabled:opacity-50 disabled:active:scale-100 active:scale-95"
              >
                <span>{isSubmitting ? 'Sealing Capsule...' : 'Bury Capsule'}</span>
                {!isSubmitting && <Lock className="w-4 h-4 ml-1" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
