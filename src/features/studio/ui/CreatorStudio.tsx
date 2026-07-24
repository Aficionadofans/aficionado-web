'use client'

import React, { useState } from 'react'
import {
  Upload,
  Video,
  Users,
  UserCog,
  ShieldCheck,
  AlertTriangle,
  FileText,
  UserPlus,
  Share2
} from 'lucide-react'
import Link from 'next/link'
import { SectionHeader, StatCounter } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { CreateDropModal } from './CreateDropModal'
import { TimeCapsuleModal } from './TimeCapsuleModal'
import { ImportFansModal } from './ImportFansModal'
import { StudioQuickActions } from './StudioQuickActions'
import { StudioMetricCards } from './StudioMetricCards'

interface FlaggedItem {
  id: string
  title: string
  moderation_status: string
  created_at: string
}

interface CreatorStudioProps {
  username: string
  activeSubscribers?: number
  totalContent?: number
  flaggedContent?: FlaggedItem[]
}

// ─── Moderation badge ─────────────────────────────────────────────────────────

function ModerationBadge({ status }: { status: string }) {
  if (status === 'approved') {
    return (
      <span className="clipcut-pill text-[10px] px-2 py-0.5">approved</span>
    )
  }
  if (status === 'pending_review') {
    return (
      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
        pending
      </span>
    )
  }
  return (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-destructive/10 border border-destructive/30 text-destructive">
      {status}
    </span>
  )
}

// ─── Quick action card data ───────────────────────────────────────────────────

interface QuickAction {
  icon: React.ReactNode
  title: string
  description: string
  onClick?: () => void
  href?: string
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CreatorStudio({
  username,
  activeSubscribers = 0,
  totalContent = 0,
  flaggedContent = [],
}: CreatorStudioProps) {
  const [isDropModalOpen, setIsDropModalOpen] = useState(false)
  const [isTimeCapsuleModalOpen, setIsTimeCapsuleModalOpen] = useState(false)
  const [isImportFansModalOpen, setIsImportFansModalOpen] = useState(false)

  const liveUrl = username ? `/live/${username}` : '#'

  const quickActions: QuickAction[] = [
    {
      icon: <Upload className="w-5 h-5 text-primary" />,
      title: 'Upload Content',
      description: 'Publish a new video drop to your channel',
    },
    {
      icon: <Video className="w-5 h-5 text-primary" />,
      title: 'Go Live',
      description: 'Start a live stream for your subscribers',
      href: liveUrl,
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      title: 'Manage Subscriptions',
      description: 'View and manage your subscriber tiers',
      href: '/settings',
    },
    {
      icon: <UserCog className="w-5 h-5 text-primary" />,
      title: 'Edit Profile',
      description: 'Update your bio, avatar, and display name',
      href: '/settings',
    },
    {
      icon: <UserPlus className="w-5 h-5 text-emerald-500" />,
      title: 'Import Fans',
      description: 'Upload a CSV to invite your existing audience',
      onClick: () => setIsImportFansModalOpen(true),
    },
    {
      icon: <Share2 className="w-5 h-5 text-amber-500" />,
      title: 'Invite Fans',
      description: 'Share your Inner Circle link on social media',
      onClick: () => {
        const url = `${window.location.origin}/${username}`
        if (navigator.share) {
          navigator.share({
            title: `Join my Inner Circle`,
            text: `Unlock exclusive behind-the-scenes content and direct chat with me!`,
            url: url
          }).catch(console.error)
        } else {
          navigator.clipboard.writeText(url)
          alert('Link copied to clipboard!')
        }
      },
    }
  ]

  // Placeholder recent content items (first 5 from flagged + padding with stubs)
  const recentContentItems: Array<{ id: string; title: string; moderation_status: string }> =
    flaggedContent.length > 0
      ? flaggedContent.slice(0, 5)
      : []

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 pb-20 md:pb-12">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative rounded-3xl overflow-hidden mb-8 p-8 md:p-12">
        {/* Gradient overlay */}
        <div className="absolute inset-0 clipcut-hero-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-[#0A0A0C]/60 pointer-events-none" />

        <div className="relative z-10 animate-fade-in-up">
          {/* Editorial label */}
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
            00 / CREATOR STUDIO
          </p>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl font-black text-off-white leading-none tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Welcome back, @{username}
          </h1>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-[#0A0A0C] text-sm font-bold glow-teal hover:brightness-110 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => setIsDropModalOpen(true)}
            >
              <Upload className="w-4 h-4" />
              Upload Content
            </button>

            <Link
              href={liveUrl}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-bold text-off-white hover:bg-white/10 hover:border-primary/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Video className="w-4 h-4" />
              Go Live
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Row ────────────────────────────────────────────────────── */}
      <RevealSection className="mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 lg:gap-24 py-8 clipcut-card rounded-3xl">
          <StatCounter label="Active Subscribers" target={activeSubscribers} />
          <StatCounter label="Total Content" target={totalContent} />
          <StatCounter label="Flagged for Review" target={flaggedContent.length} />
        </div>
      </RevealSection>

      <div className="section-divider my-8" />

      {/* ── 01 / Quick Actions ───────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="mb-6">
          <SectionHeader
            variant="editorial"
            number="01"
            label="QUICK ACTIONS"
            title="Quick Actions"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const inner = (
              <>
                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  {action.icon}
                </div>
                <div className="text-left">
                  <p
                    className="text-sm font-semibold text-off-white leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                </div>
              </>
            )

            const sharedClass =
              'clipcut-card-hover flex items-center gap-4 p-5 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all duration-200'

            return (
              <RevealSection key={action.title} delay={index * 80}>
                {action.href ? (
                  <Link href={action.href} className={sharedClass}>
                    {inner}
                  </Link>
                ) : (
                  <button
                    className={sharedClass + ' w-full'}
                    onClick={action.onClick}
                  >
                    {inner}
                  </button>
                )}
              </RevealSection>
            )
          })}
        </div>
      </section>

      <div className="section-divider my-8" />

      {/* ── 02 / Recent Content ──────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="mb-6">
          <SectionHeader
            variant="editorial"
            number="02"
            label="RECENT CONTENT"
            title="Recent Content"
          />
        </div>

        {recentContentItems.length > 0 ? (
          <div className="space-y-3">
            {recentContentItems.map((item, index) => (
              <RevealSection key={item.id} delay={index * 60}>
                <div className="clipcut-card flex items-center justify-between gap-4 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <span
                      className="text-sm font-semibold text-off-white truncate max-w-xs"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <ModerationBadge status={item.moderation_status} />
                </div>
              </RevealSection>
            ))}
          </div>
        ) : (
          <div className="clipcut-card flex flex-col items-center justify-center gap-3 py-12 rounded-3xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary/60" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground">No content published yet</p>
          </div>
        )}
      </section>

      <div className="section-divider my-8" />

      {/* ── 03 / Flagged for Review ──────────────────────────────────────── */}
      <section className="mb-10">
        <div className="mb-6">
          <SectionHeader
            variant="editorial"
            number="03"
            label="FLAGGED FOR REVIEW"
            title="Flagged for Review"
          />
        </div>

        {flaggedContent.length > 0 ? (
          <div className="space-y-3">
            {flaggedContent.map((item, index) => (
              <RevealSection key={item.id} delay={index * 60}>
                <div
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl border"
                  style={{
                    background: 'rgba(244,63,94,0.15)',
                    borderColor: 'rgba(244,63,94,0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span
                      className="text-sm font-bold text-off-white truncate max-w-xs"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-destructive/20 border border-destructive/30 text-destructive flex-shrink-0">
                    {item.moderation_status}
                  </span>
                </div>
              </RevealSection>
            ))}
          </div>
        ) : (
          <RevealSection>
            <div className="clipcut-card flex flex-col items-center justify-center gap-3 py-12 rounded-3xl text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <p
                className="text-base font-bold text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                All Clear
              </p>
              <p className="text-xs text-muted-foreground">No content flagged for review</p>
            </div>
          </RevealSection>
        )}
      </section>

      {/* ── Legacy sections (preserved) ─────────────────────────────────── */}
      <div className="section-divider my-8" />

      <StudioQuickActions
        username={username}
        onOpenDropModal={() => setIsDropModalOpen(true)}
        onOpenTimeCapsuleModal={() => setIsTimeCapsuleModalOpen(true)}
        onOpenImportFansModal={() => setIsImportFansModalOpen(true)}
      />

      <StudioMetricCards
        activeSubscribers={activeSubscribers}
        totalContent={totalContent}
        flaggedContent={flaggedContent}
      />

      {/* Modals */}
      {isDropModalOpen && <CreateDropModal onClose={() => setIsDropModalOpen(false)} />}
      {isTimeCapsuleModalOpen && <TimeCapsuleModal onClose={() => setIsTimeCapsuleModalOpen(false)} />}
      {isImportFansModalOpen && <ImportFansModal onClose={() => setIsImportFansModalOpen(false)} username={username} />}
    </div>
  )
}
