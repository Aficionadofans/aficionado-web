'use client'

import { useState, useRef } from 'react'
import { Heart } from 'lucide-react'

export function HoldToAppreciate() {
  const [isHolding, setIsHolding] = useState(false)
  const [appreciated, setAppreciated] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startHold = () => {
    if (appreciated) return
    setIsHolding(true)
    
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
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
    if (intervalRef.current) clearInterval(intervalRef.current)
    setProgress(0)
  }

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      className={`relative overflow-hidden flex items-center justify-center gap-2 px-4 py-2 mt-4 text-sm font-medium transition-all duration-300 border rounded-full select-none
        ${appreciated 
          ? 'bg-bio-teal/20 text-bio-teal border-bio-teal/30 shadow-[0_0_15px_rgba(0,240,181,0.2)]' 
          : 'bg-white/5 text-muted-foreground border-white/10 hover:border-white/20'
        }
      `}
    >
      {/* Progress background fill */}
      {!appreciated && (
        <div 
          className="absolute left-0 top-0 bottom-0 bg-bio-teal/20 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      )}
      
      <Heart 
        className={`w-4 h-4 z-10 transition-transform ${appreciated ? 'fill-bio-teal scale-110 animate-pulse' : isHolding ? 'scale-90' : ''}`} 
      />
      <span className="z-10 relative">
        {appreciated ? 'Appreciated' : 'Hold to Appreciate'}
      </span>
    </button>
  )
}
