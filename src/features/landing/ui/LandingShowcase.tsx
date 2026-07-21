'use client'

import { useState } from 'react'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'
import { Play, Radio, Headphones, Video, Sparkles } from 'lucide-react'

interface ShowcaseItem {
  id: string
  category: 'video' | 'podcast' | 'circle' | 'live'
  title: string
  creator: string
  role: string
  avatarText: string
  subscribers: string
  duration: string
  thumbnailGradient: string
  description: string
}

const items: ShowcaseItem[] = [
  {
    id: '1',
    category: 'video',
    title: 'Building a $50k/mo Sovereign Media Brand',
    creator: 'Julian Hayes',
    role: 'Tech & Media Creator',
    avatarText: 'JH',
    subscribers: '14.8k',
    duration: '12:40',
    thumbnailGradient: 'from-cyan-950/80 via-[#0B1520] to-[#070709]',
    description: 'Exclusive masterclass on leaving legacy algorithmic platforms to build direct subscriber circles.',
  },
  {
    id: '2',
    category: 'live',
    title: 'Live Q&A: Anti-Dopamine Content Architecture',
    creator: 'Maya Lin',
    role: 'Wellness & Design Strategist',
    avatarText: 'ML',
    subscribers: '22.1k',
    duration: 'LIVE',
    thumbnailGradient: 'from-teal-950/80 via-[#0D1C1B] to-[#070709]',
    description: 'Interactive broadcast exploring finite social design, audience retention, and well-being.',
  },
  {
    id: '3',
    category: 'podcast',
    title: 'The Unfiltered Sovereign Podcast #042',
    creator: 'Kaelen Vance',
    role: 'Audiobook & Spoken Word Host',
    avatarText: 'KV',
    subscribers: '9.3k',
    duration: '45:10',
    thumbnailGradient: 'from-emerald-950/80 via-[#0C1A16] to-[#070709]',
    description: 'Behind-the-scenes deep dive on direct audio distribution and fan-supported subscriptions.',
  },
  {
    id: '4',
    category: 'circle',
    title: 'Inner Circle VIP Vault: Private Stems & Clips',
    creator: 'Aria Moreau',
    role: 'Music Producer & Visual Artist',
    avatarText: 'AM',
    subscribers: '31.5k',
    duration: 'Gated',
    thumbnailGradient: 'from-blue-950/80 via-[#0C1628] to-[#070709]',
    description: 'Subscriber-only access to unreleased project files, sample packs, and private video drops.',
  },
]

export function LandingShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'live' | 'podcast' | 'circle'>('all')

  const filteredItems = activeTab === 'all'
    ? items
    : items.filter((item) => item.category === activeTab)

  return (
    <section id="showcase" className="py-24 px-4 relative z-10 bg-[#060608]/80 border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionHeader
            variant="editorial"
            number="03"
            label="CREATOR SHOWCASE"
            title="See what sovereign creators are dropping."
            className="mb-4"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Explore real video drops, live broadcasts, and gated inner circles powered by Aficionado.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(0,212,200,0.4)]'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`}
            >
              All Drops
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'video'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(0,212,200,0.4)]'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`}
            >
              <Video className="w-3.5 h-3.5" /> Video Drops
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'live'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(0,212,200,0.4)]'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`}
            >
              <Radio className="w-3.5 h-3.5" /> Live Streams
            </button>
            <button
              onClick={() => setActiveTab('podcast')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'podcast'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(0,212,200,0.4)]'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" /> Audio & Podcast
            </button>
            <button
              onClick={() => setActiveTab('circle')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'circle'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(0,212,200,0.4)]'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Inner Circles
            </button>
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item, index) => (
            <RevealSection key={item.id} delay={index * 80}>
              <div className="liquid-glass-card glass-shimmer-sweep p-5 flex flex-col justify-between gap-6 group">
                {/* Media card thumbnail frame */}
                <div className={`relative aspect-video rounded-xl bg-gradient-to-br ${item.thumbnailGradient} border border-white/10 overflow-hidden flex flex-col justify-between p-4 group-hover:border-primary/40 transition-all duration-300`}>
                  {/* Top tags */}
                  <div className="flex items-center justify-between z-10">
                    <span className="clipcut-pill px-3 py-1 text-[10px]">
                      {item.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-white/80">
                      {item.duration}
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <div className="my-auto flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,212,200,0.35)] cursor-pointer">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content details */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                        {item.avatarText}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground leading-none">{item.creator}</h4>
                        <span className="text-[11px] text-muted-foreground">{item.role}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-primary font-bold">{item.subscribers} fans</span>
                  </div>

                  <h3
                    className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}
