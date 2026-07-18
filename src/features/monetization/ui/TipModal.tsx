'use client'

import React, { useState } from 'react'
import { X, DollarSign, Send } from 'lucide-react'
import { submitTip } from '@/app/monetization/actions'
import { cn } from '@/lib/utils'

export function TipModal({ creatorId, onClose }: { creatorId: string, onClose: () => void }) {
  const [amount, setAmount] = useState<number>(10)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const PRESETS = [5, 10, 20, 50]

  const handlePresetClick = (val: number) => {
    setAmount(val)
    setCustomAmount('')
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (/^\d*$/.test(val)) {
      setCustomAmount(val)
      setAmount(Number(val) || 0)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await submitTip(formData)
      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (e) {
      console.error(e)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm glass-panel p-1 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black/80">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-500" />
            Send Tip
          </h2>
          <button 
            onClick={onClose}
            disabled={isSubmitting || success}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Tip Sent!</h3>
              <p className="text-muted-foreground text-center">Thanks for supporting @{creatorId}.</p>
            </div>
          ) : (
            <form action={handleSubmit} className="flex flex-col gap-6">
              <input type="hidden" name="creatorId" value={creatorId} />
              <input type="hidden" name="amount" value={amount} />
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Show some love to <span className="font-bold text-white">@{creatorId}</span></p>
                <div className="text-5xl font-black text-amber-500 mb-6 drop-shadow-md tracking-tighter">
                  ${amount || 0}
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  {PRESETS.map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={cn(
                        "py-3 rounded-xl font-bold text-lg transition-all",
                        amount === preset && !customAmount
                          ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105"
                          : "bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                  <input 
                    type="text" 
                    placeholder="Custom amount" 
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-colors font-bold"
                  />
                </div>
              </div>

              <div className="h-px w-full bg-white/10"></div>

              <div>
                <textarea 
                  name="message"
                  placeholder="Add a message (optional)" 
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-amber-500/50 transition-colors resize-none text-sm"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || amount === 0}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] disabled:opacity-50 disabled:active:scale-100 active:scale-95"
              >
                <span>{isSubmitting ? 'Processing...' : 'Send Tip'}</span>
                {!isSubmitting && <Send className="w-4 h-4 ml-1" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
