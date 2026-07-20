/**
 * Shared domain types for the Aficionado platform.
 * Maps 1:1 to the Supabase database schema.
 *
 * Convention: import from '@/shared/types/database' — never
 * create ad-hoc inline types that duplicate schema columns.
 */

// ──────────────────────────────────────────
// Discriminated union literals
// ──────────────────────────────────────────

import { Database } from './supabase'

export type UserType = Database['public']['Enums']['user_type']
export type ContentVisibility = Database['public']['Enums']['content_visibility']
export type ModerationStatus = Database['public']['Enums']['moderation_status']
export type SubscriptionStatus = Database['public']['Enums']['subscription_status']

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Content = Database['public']['Tables']['content']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type WaitlistEntry = Database['public']['Tables']['creator_waitlists']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type CheckIn = Database['public']['Tables']['check_ins']['Row']
export type Circle = Database['public']['Tables']['circles']['Row']
export type LiveMessage = Database['public']['Tables']['live_messages']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']

export type ContentWithProfile = Content & {
  profiles: Pick<Profile, 'username' | 'avatar_url'> | null
}

export type PostWithProfile = Post & {
  profiles: Pick<Profile, 'avatar_url' | 'ai_tone'> | null
}
