import type * as React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.ComponentProps<'div'> {
  variant?: 'default' | 'raised' | 'panel'
  glow?: 'none' | 'primary' | 'monetization'
  interactive?: boolean
}

const variantClasses = {
  default: 'liquid-glass',
  raised: 'liquid-glass-raised',
  panel: 'liquid-glass-panel rounded-[var(--radius-lg)]',
} as const

function GlassCard({
  className,
  variant = 'default',
  glow = 'none',
  interactive = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      data-slot="glass-card"
      data-variant={variant}
      data-glow={glow}
      data-interactive={interactive}
      className={cn(
        // Token-backed glass tier
        variantClasses[variant],

        // Glow — uses design tokens
        glow === 'primary' && 'shadow-[var(--glass-glow-primary)]',
        glow === 'monetization' && 'shadow-[var(--glass-glow-monetization)]',

        // Interactive hover/active
        interactive && [
          'cursor-pointer',
          'hover:-translate-y-0.5 hover:scale-[1.01]',
          'hover:border-[var(--glass-hover-border)]',
          'hover:shadow-[var(--glass-hover-shadow)]',
          'active:scale-[0.99] active:translate-y-0',
        ],

        className,
      )}
      {...props}
    />
  )
}

export { GlassCard, type GlassCardProps }
