'use client'

import React from 'react'
import { ShieldCheck, AlertTriangle, FileVideo } from 'lucide-react'

interface FlaggedItem {
  id: string
  title: string
  moderation_status: string
  created_at: string
}

interface StudioMetricCardsProps {
  activeSubscribers?: number
  totalContent?: number
  flaggedContent?: FlaggedItem[]
}

export function StudioMetricCards({
  activeSubscribers = 0,
  totalContent = 0,
  flaggedContent = [],
}: StudioMetricCardsProps) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="liquid-glass p-6 rounded-3xl border border-white/10 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Active VIP Subscribers</div>
          <div className="text-4xl font-black text-amber-400 drop-shadow-md">{activeSubscribers}</div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">Supporters with active subscriptions</p>
        </div>

        <div className="liquid-glass p-6 rounded-3xl border border-white/10 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Drops Published</div>
          <div className="text-4xl font-black text-bio-teal drop-shadow-md">{totalContent}</div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">Active media drops across your spaces</p>
        </div>
      </div>

      {/* Content Integrity Shield */}
      <div className="liquid-glass p-6 rounded-3xl border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-bio-emerald/10 border border-bio-emerald/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-bio-emerald" />
            </div>
            <div>
              <h3 className="text-lg font-black text-off-white tracking-tight">Content Integrity Shield</h3>
              <p className="text-xs text-muted-foreground font-medium">AI Automated Safety Audit Status</p>
            </div>
          </div>
          {flaggedContent.length === 0 ? (
            <span className="px-3 py-1 rounded-full bg-bio-emerald/10 border border-bio-emerald/30 text-xs font-bold text-bio-emerald uppercase tracking-wider">
              100% Compliant
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-destructive/10 border border-destructive/30 text-xs font-bold text-destructive uppercase tracking-wider">
              {flaggedContent.length} Action Needed
            </span>
          )}
        </div>

        {flaggedContent.length > 0 && (
          <div className="space-y-3 mt-4 pt-4 border-t border-white/5">
            {flaggedContent.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-xs">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <span className="font-bold text-off-white truncate max-w-xs">{item.title}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-destructive bg-destructive/20 px-2 py-0.5 rounded-full">
                  {item.moderation_status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
