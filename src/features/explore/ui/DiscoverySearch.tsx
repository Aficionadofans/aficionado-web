'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/shared/ui/core/input'
import { TopicPills } from './TopicPills'

export function DiscoverySearch() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null)
      setQuery('')
    } else {
      setActiveFilter(filter)
      setQuery(filter)
    }
  }

  return (
    <div className="space-y-4 mb-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10 pointer-events-none" />
        <Input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (activeFilter && e.target.value !== activeFilter) {
              setActiveFilter(null)
            }
          }}
          placeholder="Discover specific topics, creators, or circles..." 
          className="w-full pl-12 pr-10 py-6 bg-white/5 border-white/10 rounded-2xl text-off-white placeholder:text-muted-foreground focus-visible:ring-primary/60 focus-visible:border-primary/60 focus-visible:shadow-[0_0_25px_rgba(0,212,200,0.25)] transition-all duration-300 text-sm font-medium"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setActiveFilter(null)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-off-white transition-colors p-1 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <TopicPills activeFilter={activeFilter} onFilterClick={handleFilterClick} />
    </div>
  )
}
