/**
 * Shared UI Core — single-entry-point import
 *
 * @example
 *   import { Button, GlassCard, FormField } from '@/shared/ui/core'
 */

// ── Layout Primitives ───────────────────────────────────────────────────────
export { GlassCard } from './glass-card'
export type { GlassCardProps } from './glass-card'

// ── Form Components ─────────────────────────────────────────────────────────
export { Button, buttonVariants } from './button'
export { FormField } from './form-field'
export type { FormFieldProps } from './form-field'
export { Input } from './input'
export { Label } from './label'
export { Textarea } from './textarea'

// ── Data Display ────────────────────────────────────────────────────────────
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from './avatar'
export { Badge } from './badge'
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardAction } from './card'

// ── Feedback & Structure ────────────────────────────────────────────────────
export { SectionHeader } from './section-header'
export type { SectionHeaderProps } from './section-header'
export { EmptyState } from './empty-state'
export type { EmptyStateProps } from './empty-state'
export { HoldToAppreciate } from './HoldToAppreciate'
