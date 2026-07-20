'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Users, MessageCircle, Send, DollarSign, X, Star, User } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/shared/lib/supabase/client'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Profile {
  username: string
  avatar_url?: string
}

export function WatchPartyTheater({ username }: { username: string }) {
  const [messages, setMessages] = useState<{ id: string; author_id: string; text: string; is_tip?: boolean }[]>([])
  const [profilesCache, setProfilesCache] = useState<Record<string, Profile>>({})
  const [input, setInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

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

  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    const fetchInitial = async () => {
      const { data } = await supabase
        .from('live_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      
      if (data) {
        const reversed = data.reverse()
        setMessages(reversed)
        hydrateProfiles(reversed.map(m => m.author_id))
        setTimeout(scrollToBottom, 100)
      }
    }
    fetchInitial()

    const channel = supabase
      .channel('live_chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_messages' }, payload => {
        const newMessage = payload.new as { id: string; author_id: string; text: string; is_tip?: boolean }
        setMessages(prev => [...prev, newMessage].slice(-50))
        hydrateProfiles([newMessage.author_id])
        setTimeout(scrollToBottom, 100)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase.from('live_messages').insert({
        author_id: user.id,
        text: input.trim(),
        is_tip: false
      })

      setInput('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-[100dvh] w-full flex flex-col md:flex-row bg-background overflow-hidden relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-[40vw] h-[40vw] bg-amber-500/10 rounded-full blur-[100px] animate-breathe-calm"></div>
        <div className="absolute bottom-10 right-[350px] w-[30vw] h-[30vw] bg-red-500/5 rounded-full blur-[100px] animate-breathe-calm" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Theater Area */}
      <div className="flex-1 relative flex flex-col z-10">
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 flex items-center justify-between bg-gradient-to-b from-background/90 via-background/40 to-transparent pb-10">
          <div className="flex items-center gap-3">
            <Link href="/home">
              <button 
                aria-label="Close watch party" 
                className="w-10 h-10 rounded-full liquid-glass-hover flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                <h1 className="text-white font-bold drop-shadow-md tracking-wide text-sm sm:text-base">LIVE: @{username}&apos;s Watch Party</h1>
              </div>
              <p className="text-xs text-amber-500 font-semibold tracking-widest uppercase mt-0.5">VIP Event</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass border border-white/10 shadow-md">
            <Users className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-white">1,204</span>
          </div>
        </div>

        {/* Video Player Shell */}
        <div className="flex-1 bg-black/60 backdrop-blur-sm flex items-center justify-center relative border-r border-white/5">
          {/* Mock live stream placeholder */}
          <div className="text-center animate-pulse p-6">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
              <span className="text-amber-500 font-black tracking-widest text-sm">STREAM</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium tracking-wide">Connecting to video feed...</p>
          </div>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-full h-[45vh] md:h-full md:w-[380px] flex flex-col liquid-glass border-l-0 md:border-l border-white/10 z-20 rounded-none rounded-t-3xl md:rounded-none shadow-[-20px_0_50px_rgba(0,0,0,0.5)] bg-background/40 backdrop-blur-[40px]">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
              <MessageCircle className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="text-white font-bold tracking-wide text-sm sm:text-base">Live Chat</h2>
          </div>
          <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Real-Time</span>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth hide-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-xs py-8">
              <p>No messages yet. Say hello!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const author = profilesCache[msg.author_id]
              const isCreator = author?.username === username

              return (
                <div key={msg.id} className="animate-fade-in flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {author?.avatar_url ? (
                      <Image src={author.avatar_url} alt={author.username} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-sm" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                        <User className="w-3.5 h-3.5 text-white/60" />
                      </div>
                    )}
                  </div>

                  {msg.is_tip ? (
                    <div className="flex-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-gradient-to-r from-amber-500/25 to-amber-500/10 border border-amber-500/40 shadow-[0_5px_15px_rgba(245,158,11,0.15)]">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1 mb-1">
                        <DollarSign className="w-3.5 h-3.5" /> {author?.username ? `@${author.username}` : 'Fan'} sent a tip!
                      </span>
                      <span className="text-white text-sm font-medium leading-normal">{msg.text}</span>
                    </div>
                  ) : (
                    <div className="flex-1 min-w-0">
                      <span className={cn("text-xs font-bold block mb-0.5 truncate", isCreator ? "text-amber-400" : "text-white/70")}>
                        {author?.username ? `@${author.username}` : 'Anonymous'}
                        {isCreator && <Star className="inline w-3 h-3 ml-1 mb-0.5 fill-amber-400 text-amber-400" />}
                      </span>
                      <p className="text-white/95 text-xs sm:text-sm break-words leading-relaxed">{msg.text}</p>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Chat Input */}
        <div className="p-3 sm:p-4 border-t border-white/5 bg-background/50 backdrop-blur-md">
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <button 
              type="button" 
              aria-label="Send tip"
              className="w-10 h-10 flex-shrink-0 rounded-full liquid-glass-hover bg-amber-500/10 border-amber-500/30 text-amber-500 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <DollarSign className="w-5 h-5 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
            </button>
            <div className="relative flex-1 glass-panel rounded-full p-1 border border-white/10 shadow-inner flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Say something..." 
                className="w-full bg-transparent border-none py-2 px-3 pr-10 text-xs sm:text-sm text-white focus:outline-none focus:ring-0 placeholder:text-white/40"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isSubmitting}
                aria-label="Send message"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_10px_rgba(245,158,11,0.4)] focus-visible:outline-none"
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
