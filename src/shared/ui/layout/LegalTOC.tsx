'use client'

import { useState, useEffect } from 'react'
import type { LegalHeading } from './LegalPage'

interface LegalTOCProps {
  headings: LegalHeading[]
}

export function LegalTOC({ headings }: LegalTOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="glass-panel rounded-2xl p-5"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
        Contents
      </p>
      <ul className="flex flex-col gap-1.5">
        {headings.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={[
                'block text-sm py-1 px-2 rounded-lg transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                activeId === id
                  ? 'text-primary font-semibold bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
