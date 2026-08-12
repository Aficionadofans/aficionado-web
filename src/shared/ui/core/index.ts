/**
 * Shared UI Core — single-entry-point import
 *
 * @example
 *   import { Button, GlassCard, FormField } from '@/shared/ui/core'
 */

// ── Data Display ────────────────────────────────────────────────────────────
export { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from './avatar'
export { Badge } from './badge'

// ── Form Components ─────────────────────────────────────────────────────────
export { Button, buttonVariants } from './button'
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
export type { EmptyStateProps } from './empty-state'
export { EmptyState } from './empty-state'
export type { FormFieldProps } from './form-field'
export { FormField } from './form-field'
export type { GlassCardProps } from './glass-card'
// ── Layout Primitives ───────────────────────────────────────────────────────
export { GlassCard } from './glass-card'
export { HoldToAppreciate } from './HoldToAppreciate'
export { Input } from './input'
export { Label } from './label'
export type { SectionHeaderProps } from './section-header'
// ── Feedback & Structure ────────────────────────────────────────────────────
export { SectionHeader } from './section-header'
export type { StatCounterProps } from './stat-counter'

// ── Animation ───────────────────────────────────────────────────────────────
export { StatCounter } from './stat-counter'
export { Textarea } from './textarea'
