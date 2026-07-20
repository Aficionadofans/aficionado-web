'use client'

import React, { useState } from 'react'
import { X, DollarSign, Send } from 'lucide-react'
import { submitTip } from '@/app/monetization/actions'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/ui/core'

export function TipModal({ creatorId, onClose }: { creatorId: string; onClose: () => void }) {
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
      setTimeout(() => onClose(), 2000)
    } catch (e) {
      console.error(e)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(9,9,11,0.95)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Amber glow — monetization context */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)' }}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#F59E0B]" />
            Send a Tip
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting || success}
            aria-label="Close tip modal"
            className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.08)] transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 animate-fade-in-up gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}
              >
                <DollarSign className="w-7 h-7 text-[#F59E0B]" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">Tip Sent!</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Thanks for supporting @{creatorId}.</p>
              </div>
            </div>
          ) : (
            <form action={handleSubmit} className="flex flex-col gap-5">
              <input type="hidden" name="creatorId" value={creatorId} />
              <input type="hidden" name="amount" value={amount} />

              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-3">
                  Supporting <span className="font-semibold text-foreground">@{creatorId}</span>
                </p>
                {/* Big amount display */}
                <div
                  className="text-5xl font-bold tabular-nums mb-5"
                  style={{ color: '#F59E0B', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
                >
                  ${amount || 0}
                </div>

                {/* Preset grid */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {PRESETS.map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={cn(
                        'py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                        amount === preset && !customAmount
                          ? 'text-black scale-105'
                          : 'text-foreground hover:bg-[rgba(255,255,255,0.08)]',
                      )}
                      style={
                        amount === preset && !customAmount
                          ? { background: '#F59E0B', boxShadow: '0 0 14px rgba(245,158,11,0.35)' }
                          : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }
                      }
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                {/* Custom input */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">$</span>
                  <input
                    type="text"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full rounded-xl py-2.5 pl-7 pr-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: customAmount ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
              </div>

              <div className="h-px bg-border" />

              <textarea
                name="message"
                placeholder="Add a message (optional)"
                className="w-full h-20 rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />

              <Button
                type="submit"
                variant="monetization"
                size="lg"
                rounded="full"
                loading={isSubmitting}
                disabled={isSubmitting || amount === 0}
                className="w-full gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_28px_rgba(245,158,11,0.4)]"
              >
                {!isSubmitting && (
                  <>
                    Send ${amount || 0} Tip
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
