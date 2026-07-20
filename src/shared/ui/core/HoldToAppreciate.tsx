'use client'

import { useState, useRef } from 'react'
import { Heart, Sparkles } from 'lucide-react'

export function HoldToAppreciate() {
  const [isHolding, setIsHolding] = useState(false)
  const [appreciated, setAppreciated] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startHold = () => {
    if (appreciated || intervalRef.current) return
    setIsHolding(true)
    
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setAppreciated(true)
          setIsHolding(false)
          return 100
        }
        return p + 5 // 5% per 50ms = 1 second hold
      })
    }, 50)
  }

  const endHold = () => {
    if (appreciated) return
    setIsHolding(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setProgress(0)
  }

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      onKeyDown={(e) => {
        if ((e.key === ' ' || e.key === 'Enter') && !isHolding) {
          e.preventDefault()
          startHold()
        }
      }}
      onKeyUp={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          endHold()
        }
      }}
      aria-label={appreciated ? "Appreciated drop" : "Hold button to appreciate drop"}
      aria-pressed={appreciated}
      className={`relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 mt-4 text-xs sm:text-sm font-semibold transition-all duration-300 border rounded-full select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bio-teal/60
        ${appreciated 
          ? 'bg-bio-teal/20 text-bio-teal border-bio-teal/40 shadow-[0_0_20px_rgba(0,240,181,0.3)] scale-105' 
          : isHolding
          ? 'bg-bio-teal/10 text-off-white border-bio-teal/30 scale-95'
          : 'bg-white/5 text-muted-foreground border-white/10 hover:border-white/20 hover:text-off-white'
        }
      `}
    >
      {/* Progress background fill */}
      {!appreciated && (
        <div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-bio-teal/30 to-bio-teal/50 transition-all duration-75 ease-linear pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      )}
      
      {appreciated ? (
        <Sparkles className="w-4 h-4 z-10 text-bio-teal animate-pulse" />
      ) : (
        <Heart 
          className={`w-4 h-4 z-10 transition-transform ${isHolding ? 'scale-125 text-bio-teal fill-bio-teal/50' : 'group-hover:scale-110'}`} 
        />
      )}
      
      <span className="z-10 relative tracking-wide">
        {appreciated ? 'Appreciated' : isHolding ? `Holding... ${progress}%` : 'Hold to Appreciate'}
      </span>
    </button>
  )
}

