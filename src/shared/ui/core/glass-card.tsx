import * as React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.ComponentProps<'div'> {
  variant?: 'default' | 'raised' | 'panel'
  glow?: 'none' | 'primary' | 'monetization'
  interactive?: boolean
}

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
        // Base glass styles
        'backdrop-blur-2xl border transition-all duration-250',

        // Variant styles
        variant === 'default' && [
          'bg-[rgba(17,17,19,0.70)] border-[rgba(255,255,255,0.08)]',
          'rounded-[var(--radius-xl)]',
          'shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]',
          'backdrop-saturate-130',
        ],

        variant === 'raised' && [
          'bg-[rgba(24,24,27,0.85)] border-[rgba(255,255,255,0.12)]',
          'rounded-[var(--radius-xl)]',
          'shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)]',
          'backdrop-blur-3xl backdrop-saturate-140',
        ],

        variant === 'panel' && [
          'bg-[rgba(9,9,11,0.92)] border-[rgba(255,255,255,0.06)]',
          'rounded-[var(--radius-lg)]',
          'shadow-[0_8px_28px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]',
          'backdrop-blur-xl',
        ],

        // Glow styles
        glow === 'primary' && 'shadow-[0_0_40px_rgba(0,212,200,0.12)]',
        glow === 'monetization' && 'shadow-[0_0_40px_rgba(245,158,11,0.12)]',

        // Interactive hover/active
        interactive && [
          'cursor-pointer',
          'hover:-translate-y-0.5 hover:scale-[1.01]',
          'hover:border-[rgba(0,212,200,0.25)]',
          'hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.65),0_0_20px_rgba(0,212,200,0.08)]',
          'active:scale-[0.99] active:translate-y-0',
        ],

        className
      )}
      style={{ backdropFilter: 'blur(24px) saturate(1.3)', WebkitBackdropFilter: 'blur(24px) saturate(1.3)' }}
      {...props}
    />
  )
}

export { GlassCard, type GlassCardProps }
