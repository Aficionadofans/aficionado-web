'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, DollarSign, Star, User } from 'lucide-react'
import { createClient } from '@/shared/lib/supabase/client'
import Image from 'next/image'

interface Profile {
  username: string
  avatar_url?: string
}

interface Message {
  id: string
  author_id: string
  text: string
  is_tip?: boolean
}

export function LiveChatSidebar({ username }: { username: string }) {
  const [messages, setMessages] = useState<Message[]>([])
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
        const newMessage = payload.new as Message
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
              <div 
                key={msg.id} 
                className={`flex gap-3 text-xs leading-relaxed animate-fade-in ${
                  msg.is_tip 
                    ? 'p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-500/5 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                    : ''
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center relative overflow-hidden border border-white/10">
                  {author?.avatar_url ? (
                    <Image src={author.avatar_url} alt="" width={28} height={28} className="object-cover" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`font-bold ${isCreator ? 'text-amber-400' : 'text-off-white'}`}>
                      @{author?.username || 'user'}
                    </span>
                    {isCreator && (
                      <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-amber-500/20 border border-amber-500/40 text-[9px] text-amber-400 font-bold">
                        <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" /> Host
                      </span>
                    )}
                    {msg.is_tip && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[9px]">
                        <DollarSign className="w-2.5 h-2.5" /> Tip
                      </span>
                    )}
                  </div>
                  <p className={msg.is_tip ? 'text-amber-200 font-semibold' : 'text-muted-foreground font-medium'}>
                    {msg.text}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-black/40 flex items-center gap-2">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message…"
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isSubmitting}
          className="w-9 h-9 rounded-full bg-amber-500 text-black flex items-center justify-center disabled:opacity-50 hover:bg-amber-400 transition-colors shadow-[0_0_10px_rgba(245,158,11,0.3)]"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
