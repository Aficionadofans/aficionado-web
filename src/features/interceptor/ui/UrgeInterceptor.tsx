'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function UrgeInterceptor() {
  const pathname = usePathname()
  const [isTriggered, setIsTriggered] = useState(false)
  const navigationTimes = useRef<number[]>([])
  
  // Settings for the friction trigger
  const TRIGGER_THRESHOLD = 6 // number of rapid navigations
  const TIME_WINDOW_MS = 15000 // 15 seconds
  const BREATHE_DURATION_MS = 15000 // Force 15 seconds of breathing

  useEffect(() => {
    if (isTriggered) return;

    const now = Date.now()
    navigationTimes.current.push(now)
    
    // Remove times outside the window
    navigationTimes.current = navigationTimes.current.filter(t => now - t < TIME_WINDOW_MS)
    
    if (navigationTimes.current.length >= TRIGGER_THRESHOLD) {
      setIsTriggered(true)
      navigationTimes.current = [] // reset
      
      // Auto-dismiss after the breathing exercise completes
      setTimeout(() => {
        setIsTriggered(false)
      }, BREATHE_DURATION_MS)
    }
  }, [pathname])

  if (!isTriggered) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal/95 backdrop-blur-md animate-fade-in transition-all">
      <div className="max-w-md w-full px-6 text-center">
        <h2 className="text-2xl font-bold text-off-white mb-2">You're moving fast.</h2>
        <p className="text-muted-foreground mb-16">
          We noticed you're jumping between pages quickly. Let's take a 15-second breathing break to center your mind.
        </p>

        {/* Liquid Glass Breathing Ring */}
        <div className="relative w-48 h-48 mx-auto mb-16">
          {/* Base static ring */}
          <div className="absolute inset-0 rounded-full border border-white/5 bg-white/5"></div>
          
          {/* Expanding animated ring */}
          <div 
            className="absolute inset-0 rounded-full bg-primary/20"
            style={{
              animation: 'ping 5s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          ></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-primary font-medium tracking-widest uppercase text-sm"
              style={{
                animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              Breathe
            </span>
          </div>
        </div>

        <p className="text-sm text-primary/50 animate-pulse">
          Unlocking in a moment...
        </p>
      </div>
    </div>
  )
}
