'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
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
      {/* Search input with liquid-glass container */}
      <div className="relative liquid-glass rounded-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (activeFilter && e.target.value !== activeFilter) {
              setActiveFilter(null)
            }
          }}
          placeholder="Discover specific topics, creators, or circles..."
          className="w-full bg-transparent pl-12 pr-10 py-4 text-sm font-medium text-foreground placeholder:text-muted-foreground rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setActiveFilter(null)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
