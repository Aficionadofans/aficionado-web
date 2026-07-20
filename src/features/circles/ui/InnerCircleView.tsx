'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Lock, Star, Send, DollarSign, User } from 'lucide-react'
import { TipModal } from '@/features/monetization/ui/TipModal'
import { createClient } from '@/shared/lib/supabase/client'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Profile {
  username: string
  avatar_url?: string
}

export function InnerCircleView({ username, circleId }: { username: string, circleId: string }) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isTipModalOpen, setIsTipModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [messages, setMessages] = useState<{ id: string; author_id: string; text: string }[]>([])
  const [profilesCache, setProfilesCache] = useState<Record<string, Profile>>({})
  const [input, setInput] = useState('')
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    const checkSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('circle_members')
        .select('*')
        .eq('circle_id', circleId)
        .eq('user_id', user.id)
        .maybeSingle()

      if (data) {
        setIsSubscribed(true)
      }
    }
    checkSubscription()
  }, [circleId, supabase])

  // Hydrate profiles helper
  const hydrateProfiles = async (authorIds: string[]) => {
    const unknownIds = [...new Set(authorIds)].filter(id => !profilesCache[id])
    if (unknownIds.length === 0) return

    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .in('id', unknownIds)

    if (profilesData) {
      setProfilesCache(prev => ({
        ...prev,
        ...Object.fromEntries(profilesData.map(p => [p.id, { username: p.username, avatar_url: p.avatar_url }]))
      }))
    }
  }

  useEffect(() => {
    if (!isSubscribed) return

    // 1. Fetch initial messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('id, author_id, text')
        .eq('circle_id', circleId)
        .order('created_at', { ascending: true })
      
      if (data) {
        setMessages(data)
        hydrateProfiles(data.map(m => m.author_id))
        setTimeout(scrollToBottom, 100)
      }
    }
    fetchMessages()

    // 2. Subscribe to new messages
    const channel = supabase.channel(`circle_${circleId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `circle_id=eq.${circleId}`
      }, (payload) => {
        const newMessage = payload.new as { id: string; author_id: string; text: string }
        setMessages(prev => [...prev, newMessage])
        hydrateProfiles([newMessage.author_id])
        setTimeout(scrollToBottom, 100)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [isSubscribed, circleId, supabase])

  const handleSend = async () => {
    if (!input.trim() || isSubmitting) return
    setIsSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase.from('chat_messages').insert({
        circle_id: circleId,
        author_id: user.id,
        text: input.trim()
      })
      setInput('')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isSubscribed) {
    return (
      <div className="relative w-full h-[75dvh] flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Blurred Background Mock Content */}
        <div className="absolute inset-0 z-0 flex flex-col gap-6 opacity-30 blur-[40px] pointer-events-none p-4" aria-hidden="true">
          <div className="bg-gradient-to-r from-amber-500/50 to-purple-500/40 rounded-3xl h-32 w-3/4 self-end animate-breathe-calm"></div>
          <div className="bg-gradient-to-r from-blue-500/30 to-amber-500/50 rounded-3xl h-48 w-full"></div>
          <div className="bg-white/20 rounded-3xl h-24 w-2/3 animate-breathe-calm" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Paywall Overlay */}
        <div className="relative z-10 liquid-glass p-8 rounded-[2rem] max-w-sm w-full text-center border border-amber-500/30 animate-fade-in-up shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 mx-auto flex items-center justify-center mb-6 animate-float shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <Lock className="w-10 h-10 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Inner Circle</h2>
          <p className="text-white/70 mb-8 text-xs sm:text-sm leading-relaxed text-pretty">
            Unlock exclusive behind-the-scenes content, direct chat, and VIP co-watching with @{username}.
          </p>
          
          <button 
            onClick={() => setIsSubscribed(true)}
            className="w-full py-3.5 rounded-full bg-amber-500 text-black font-black uppercase tracking-widest text-xs sm:text-sm transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Subscribe - $9.99/mo
          </button>
        </div>
      </div>
    )
  }

  // VIP State
  return (
    <div className="w-full min-h-[75dvh] flex flex-col bg-background relative overflow-hidden">

      <div 
        ref={chatScrollRef}
        className="flex-1 p-4 overflow-y-auto pb-28 relative z-10 flex flex-col hide-scrollbar"
        aria-label="Inner Circle VIP Lounge Messages"
      >
        {/* Welcome Message */}
        <div className="liquid-glass p-5 rounded-2xl border-amber-500/30 mb-6 relative overflow-hidden animate-fade-in-up flex-shrink-0 shadow-lg">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-20 blur-2xl pointer-events-none">
            <div className="w-32 h-32 bg-amber-500 rounded-full animate-pulse" />
          </div>
          <div className="absolute top-0 right-4 p-4 opacity-10 pointer-events-none">
            <Star className="w-20 h-20 text-amber-500 animate-float" />
          </div>
          <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 mb-1.5 relative z-10">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" /> VIP Lounge
          </h3>
          <p className="text-xs sm:text-sm text-white/85 relative z-10 leading-relaxed text-pretty max-w-[90%]">
            You're in! Thanks for supporting @{username}. This space is for exclusive drops and real-time chat with the community.
          </p>
        </div>

        {/* Chat Feed */}
        <div className="flex flex-col gap-4 justify-end flex-1">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground text-xs py-8">
              No messages yet in this Inner Circle. Be the first to start the conversation!
            </div>
          ) : (
            messages.map((msg, idx) => {
              const author = profilesCache[msg.author_id]
              const isCreator = author?.username === username

              return (
                <div key={msg.id} className="flex gap-3 animate-fade-in-up" style={{ animationDelay: `${Math.min(idx * 0.05, 0.5)}s` }}>
                  <div className="flex-shrink-0 mt-1">
                    {author?.avatar_url ? (
                      <Image src={author.avatar_url} alt={author.username} width={36} height={36} className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-sm" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                        <User className="w-4 h-4 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className={cn(
                    "liquid-glass rounded-2xl rounded-tl-sm p-3.5 max-w-[85%] shadow-md",
                    isCreator ? "border-amber-500/40 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]" : ""
                  )}>
                    <span className={cn("text-xs font-bold block mb-1", isCreator ? "text-amber-400" : "text-white/70")}>
                      {author?.username ? `@${author.username}` : 'Member'}
                      {isCreator && <Star className="inline w-3 h-3 ml-1 mb-0.5 fill-amber-400 text-amber-400" />}
                    </span>
                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed break-words">{msg.text}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 pb-6 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-20">
        <div className="relative flex items-center gap-2 pointer-events-auto max-w-2xl mx-auto w-full glass-panel p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10">
          <button 
            onClick={() => setIsTipModalOpen(true)}
            aria-label="Send Tip"
            className="w-10 h-10 flex-shrink-0 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center hover:bg-amber-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <DollarSign className="w-4 h-4 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
          </button>
          
          <div className="relative flex-1">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Chat with the Inner Circle..." 
              className="w-full bg-transparent py-2 px-4 pr-10 text-xs sm:text-sm text-white focus:outline-none placeholder:text-white/40"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isSubmitting}
              aria-label="Send message"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_10px_rgba(245,158,11,0.4)] focus-visible:outline-none"
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {isTipModalOpen && (
        <div className="absolute inset-0 z-50">
          <TipModal 
            creatorId={username} 
            onClose={() => setIsTipModalOpen(false)} 
          />
        </div>
      )}
    </div>
  )
}

