'use client'

import { useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { Input } from "@/shared/ui/core/input";

const TOPIC_FILTERS = [
  "Musicians",
  "Writers",
  "Parenting",
  "Visual Art",
  "Tech & Design",
  "Wellness"
];

export function DiscoverySearch() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setQuery("");
    } else {
      setActiveFilter(filter);
      setQuery(filter);
    }
  };

  return (
    <div className="space-y-4 mb-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10 pointer-events-none" />
        <Input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (activeFilter && e.target.value !== activeFilter) {
              setActiveFilter(null);
            }
          }}
          placeholder="Discover specific topics, creators, or circles..." 
          className="w-full pl-12 pr-10 py-6 bg-white/5 border-white/10 rounded-2xl text-off-white placeholder:text-muted-foreground focus-visible:ring-primary/60 focus-visible:border-primary/60 focus-visible:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-all duration-300 text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setActiveFilter(null);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-off-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20 shrink-0">
          <Sparkles className="w-3 h-3 text-primary" />
          <span>Topics</span>
        </div>
        {TOPIC_FILTERS.map((topic) => {
          const isActive = activeFilter === topic;
          return (
            <button
              key={topic}
              onClick={() => handleFilterClick(topic)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all duration-200 ${
                isActive 
                  ? 'bg-primary text-black font-semibold shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-off-white border border-white/5'
              }`}
            >
              #{topic}
            </button>
          );
        })}
      </div>
    </div>
  );
}

