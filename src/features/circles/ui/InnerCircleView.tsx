'use client'

import React, { useState } from 'react'
import { Lock, Star, MessageCircle, Send } from 'lucide-react'

export function InnerCircleView({ username }: { username: string }) {
  // Mocking the subscription state for the prototype
  const [isSubscribed, setIsSubscribed] = useState(false)

  if (!isSubscribed) {
    return (
      <div className="relative w-full h-[80dvh] flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Blurred Background Mock Content */}
        <div className="absolute inset-0 z-0 grid grid-cols-2 gap-2 opacity-30 blur-md pointer-events-none p-4">
          <div className="bg-white/10 rounded-xl h-40"></div>
          <div className="bg-white/10 rounded-xl h-40"></div>
          <div className="bg-white/10 rounded-xl h-40"></div>
          <div className="bg-white/10 rounded-xl h-40"></div>
        </div>

        {/* Paywall Overlay */}
        <div className="relative z-10 glass-panel p-8 rounded-3xl max-w-sm w-full text-center border-amber-500/30 bg-black/60 backdrop-blur-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 mx-auto flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Inner Circle</h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Unlock exclusive behind-the-scenes content, direct chat, and VIP co-watching with @{username}.
          </p>
          
          <button 
            onClick={() => setIsSubscribed(true)}
            className="w-full py-4 rounded-full bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
          >
            Subscribe - $9.99/mo
          </button>
        </div>
      </div>
    )
  }

  // VIP State
  return (
    <div className="w-full min-h-[80dvh] flex flex-col bg-amber-950/20 relative">
      <div className="flex-1 p-4 overflow-y-auto pb-24">
        {/* Welcome Message */}
        <div className="glass-panel p-4 rounded-2xl border-amber-500/20 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Star className="w-24 h-24 text-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-amber-500 flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 fill-amber-500" /> Welcome to the VIP Lounge
          </h3>
          <p className="text-sm text-white/90 relative z-10">
            You're in! Thanks for supporting @{username}. This space is for exclusive drops and real-time chat with the community.
          </p>
        </div>

        {/* Mock Chat Feed */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <img src={`https://i.pravatar.cc/150?u=${username}`} className="w-8 h-8 rounded-full border border-amber-500/50" alt="" />
            <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
              <span className="text-xs font-bold text-amber-500 block mb-1">@{username} <span className="text-white/50 text-[10px] ml-1 font-normal">Creator</span></span>
              <p className="text-sm text-white">Hey VIPs! Dropping a new exclusive video here tomorrow at 5PM. Be ready! 🔥</p>
            </div>
          </div>
          
          <div className="flex gap-3 flex-row-reverse">
            <img src="https://i.pravatar.cc/150?u=fan1" className="w-8 h-8 rounded-full" alt="" />
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-2xl rounded-tr-none p-3 max-w-[80%]">
              <p className="text-sm text-white">Can't wait!!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Chat with the Inner Circle..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 pr-12 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/30"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center hover:scale-105 transition-transform">
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
