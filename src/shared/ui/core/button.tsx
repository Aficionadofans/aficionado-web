import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base
  [
    'group/button inline-flex shrink-0 items-center justify-center gap-1.5',
    'font-medium whitespace-nowrap select-none',
    'border border-transparent bg-clip-padding',
    'transition-all duration-200 outline-none',
    'focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring',
    'active:not-aria-[haspopup]:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-40',
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        // Trend agency high-impact button
        trend: [
          'bg-white text-[#0A0A0C] font-semibold',
          'hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)]',
          'active:scale-[0.97] transition-all duration-200',
        ],
        // Teal — primary actions
        primary: [
          'bg-primary text-primary-foreground font-semibold',
          'hover:bg-[var(--color-primary-hover)]',
          'hover:shadow-[0_0_24px_var(--color-primary-glow)]',
          'active:scale-[0.97]',
        ],
        // Amber — monetization only (tips, subscriptions, payments)
        monetization: [
          'bg-[#F59E0B] text-[#080808]',
          'hover:bg-[#D97706]',
          'hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]',
          'active:scale-[0.98]',
          'font-semibold',
        ],
        // Standard dark default
        default: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_8%)]',
        ],
        outline: [
          'border-border bg-background',
          'hover:bg-muted hover:text-foreground',
          'aria-expanded:bg-muted',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]',
        ],
        ghost: [
          'hover:bg-muted hover:text-foreground',
          'aria-expanded:bg-muted',
        ],
        'ghost-primary': [
          'text-primary hover:bg-[rgba(0,212,200,0.08)] hover:border-[rgba(0,212,200,0.25)]',
        ],
        glass: [
          'bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.1)] text-foreground',
          'hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.18)]',
          'backdrop-blur-sm',
        ],
        destructive: [
          'bg-destructive/10 text-destructive',
          'hover:bg-destructive/20',
          'focus-visible:border-destructive/40 focus-visible:ring-destructive/20',
        ],
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 text-sm rounded-xl',
        xs: 'h-6 px-2 text-xs rounded-lg gap-1 [&_svg:not([class*=\'size-\'])]:size-3',
        sm: 'h-7 px-3 text-xs rounded-lg [&_svg:not([class*=\'size-\'])]:size-3.5',
        lg: 'h-11 px-6 text-sm rounded-xl',
        xl: 'h-13 px-8 text-base rounded-2xl',
        icon: 'size-9 rounded-xl',
        'icon-xs': 'size-6 rounded-md [&_svg:not([class*=\'size-\'])]:size-3',
        'icon-sm': 'size-7 rounded-lg [&_svg:not([class*=\'size-\'])]:size-3.5',
        'icon-lg': 'size-11 rounded-xl',
      },
      rounded: {
        default: '',
        full: '!rounded-full',
        xl: '!rounded-xl',
        '2xl': '!rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
)

interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  loading?: boolean
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  rounded = 'default',
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="size-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {children}
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
