'use client'

import React, { useState } from 'react'
import {
  X,
  Sparkles,
  PlusCircle,
  Compass,
  Music,
  Video,
  Cpu,
  HeartHandshake,
  Utensils,
  Smile,
  Waves,
  Mic,
} from 'lucide-react'
import { createClient } from '@/shared/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface CreateCircleModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (newCircleId: string) => void
}

const CATEGORIES = [
  {
    id: 'music',
    label: 'Music & Audio',
    icon: Music,
    color: 'text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-500/20',
  },
  {
    id: 'film',
    label: 'Film & Motion',
    icon: Video,
    color: 'text-amber-400',
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/20',
  },
  {
    id: 'tech',
    label: 'Tech & AI',
    icon: Cpu,
    color: 'text-cyan-400',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-500/20',
  },
  {
    id: 'diving',
    label: 'Diving & Ocean',
    icon: Waves,
    color: 'text-sky-400',
    border: 'border-sky-500/40',
    bg: 'bg-sky-500/20',
  },
  {
    id: 'speaking',
    label: 'Public Speaking',
    icon: Mic,
    color: 'text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/20',
  },
  {
    id: 'parenting',
    label: 'Parenting & Family',
    icon: HeartHandshake,
    color: 'text-pink-400',
    border: 'border-pink-500/40',
    bg: 'bg-pink-500/20',
  },
  {
    id: 'culinary',
    label: 'Culinary Arts',
    icon: Utensils,
    color: 'text-emerald-400',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/20',
  },
  {
    id: 'wellness',
    label: 'Mindfulness',
    icon: Smile,
    color: 'text-indigo-400',
    border: 'border-indigo-500/40',
    bg: 'bg-indigo-500/20',
  },
]

export function CreateCircleModal({ isOpen, onClose, onSuccess }: CreateCircleModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('music')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError('You must be logged in to create a circle.')
        setIsSubmitting(false)
        return
      }

      // 1. Insert circle
      const { data: circle, error: insertError } = await supabase
        .from('circles')
        .insert({
          name: name.trim(),
          description: description.trim() || undefined,
          owner_id: user.id,
        })
        .select('id')
        .single()

      if (insertError) {
        throw insertError
      }

      // 2. Add owner as member
      if (circle?.id) {
        await supabase.from('circle_members').insert({
          circle_id: circle.id,
          user_id: user.id,
        })

        if (onSuccess) onSuccess(circle.id)
        onClose()
        router.push(`/communities/${circle.id}`)
        router.refresh()
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create circle. Please try again.'
      setError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg liquid-glass border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,212,200,0.3)]">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Create New Circle
            </h2>
            <p className="text-xs text-muted-foreground">
              Launch a dedicated space for your fans and community aficionados.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Circle Name */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Circle Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acoustic Sessions & Stems"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Select Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const isSelected = category === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? `${cat.bg} ${cat.border} ${cat.color} shadow-sm ring-1 ring-primary/40`
                        : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this circle about? Who is invited to join?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,212,200,0.4)] hover:bg-primary-hover disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{isSubmitting ? 'Creating…' : 'Launch Circle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
