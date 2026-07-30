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

export type UserType = 'fan' | 'creator' | 'admin'
export type ContentVisibility = 'public' | 'subscriber'
export type ModerationStatus = 'pending' | 'approved' | 'rejected'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due'

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
