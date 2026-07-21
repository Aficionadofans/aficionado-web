import * as React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
  // Editorial variant props
  variant?: 'default' | 'editorial'
  number?: string
  label?: string
  icon?: React.ReactNode
}

function SectionHeader({
  title,
  subtitle,
  action,
  size = 'md',
  className,
  variant = 'default',
  number,
  label,
  icon,
}: SectionHeaderProps) {
  if (variant === 'editorial') {
    return (
      <div className={cn('clipcut-section-header mb-5', className)}>
        {/* Teal icon tile */}
        {icon && (
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: '#121216',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              boxShadow: '0 0 20px rgba(0, 212, 200, 0.25)',
            }}
          >
            <span className="text-primary">{icon}</span>
          </div>
        )}
        <div>
          {(number || label) && (
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E8501A] block mb-2 font-mono">
              {number && label ? `${number} • ${label}` : number || label}
            </span>
          )}
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[-0.035em] leading-[1.05]"
            style={{ fontFamily: 'var(--font-bricolage), var(--font-heading)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-muted-foreground mt-2 font-sans font-normal max-w-2xl">{subtitle}</p>
          )}

        </div>
        {action && (
          <div className="ml-auto flex-shrink-0 self-center">{action}</div>
        )}
      </div>
    )
  }

  // Default variant (unchanged)
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex flex-col gap-0.5">
        {size === 'lg' && (
          <h1
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
          >
            {title}
          </h1>
        )}
        {size === 'md' && (
          <h2
            className="text-xl font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
          >
            {title}
          </h2>
        )}
        {size === 'sm' && (
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        )}
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0 self-center">{action}</div>}
    </div>
  )
}

export { SectionHeader, type SectionHeaderProps }
