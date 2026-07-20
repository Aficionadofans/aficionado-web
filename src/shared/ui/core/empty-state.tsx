import * as React from 'react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      {Icon && (
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-[rgba(0,212,200,0.08)] border border-[rgba(0,212,200,0.2)]">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs text-pretty">{description}</p>
      )}
      {action && (
        <div className="mt-6">{action}</div>
      )}
    </div>
  )
}

export { EmptyState, type EmptyStateProps }
