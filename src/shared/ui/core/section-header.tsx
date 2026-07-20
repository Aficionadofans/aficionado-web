import * as React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function SectionHeader({ title, subtitle, action, size = 'md', className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex flex-col gap-0.5">
        {size === 'lg' && (
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>
            {title}
          </h1>
        )}
        {size === 'md' && (
          <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>
            {title}
          </h2>
        )}
        {size === 'sm' && (
          <h3 className="text-base font-semibold text-foreground">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0 self-center">{action}</div>
      )}
    </div>
  )
}

export { SectionHeader, type SectionHeaderProps }
