'use client'

import * as React from 'react'
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cn } from '@/lib/utils'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarRing = 'none' | 'primary' | 'monetization'
type AvatarStatus = 'online' | 'offline' | 'away' | 'none'

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-14',
  xl: 'size-20',
}

const fallbackTextSize: Record<AvatarSize, string> = {
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
  xl: 'text-2xl',
}

const statusDotSize: Record<AvatarSize, string> = {
  xs: 'size-1.5',
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-3',
  xl: 'size-3.5',
}

interface AvatarProps extends AvatarPrimitive.Root.Props {
  size?: AvatarSize
  ring?: AvatarRing
  status?: AvatarStatus
  src?: string
  alt?: string
  name?: string
  className?: string
  children?: React.ReactNode
}

function Avatar({
  size = 'md',
  ring = 'none',
  status = 'none',
  src,
  alt,
  name,
  className,
  children,
  ...props
}: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : alt?.slice(0, 1).toUpperCase() ?? '?'

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex shrink-0 rounded-full select-none',
        sizeClasses[size],

        // Ring styles
        ring === 'primary' && [
          'ring-2 ring-primary ring-offset-2 ring-offset-background',
        ],
        ring === 'monetization' && [
          'ring-2 ring-[#F59E0B] ring-offset-2 ring-offset-background',
        ],

        className
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {src && (
            <AvatarPrimitive.Image
              src={src}
              alt={alt ?? name ?? 'Avatar'}
              className="aspect-square size-full rounded-full object-cover"
            />
          )}
          <AvatarPrimitive.Fallback
            className={cn(
              'flex size-full items-center justify-center rounded-full font-bold',
              'bg-primary/10 text-primary',
              fallbackTextSize[size]
            )}
          >
            {initials}
          </AvatarPrimitive.Fallback>
        </>
      )}

      {/* Status indicator */}
      {status !== 'none' && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            statusDotSize[size],
            status === 'online' && 'bg-bio-emerald shadow-[0_0_6px_rgba(16,185,129,0.7)]',
            status === 'offline' && 'bg-muted-foreground',
            status === 'away' && 'bg-yellow-500'
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </AvatarPrimitive.Root>
  )
}

// Keep legacy sub-components for backwards compat
function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full rounded-full object-cover', className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold',
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn('group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background', className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
