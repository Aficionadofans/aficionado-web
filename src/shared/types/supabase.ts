export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Enums: {
      user_type: "fan" | "creator" | "admin"
      content_visibility: "public" | "subscriber"
      moderation_status: "pending" | "approved" | "rejected"
      subscription_status: "active" | "canceled" | "past_due"
    }
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string
          avatar_url: string | null
          bio: string | null
          goal: string | null
          strictness: string | null
          ai_tone: string | null
          user_type: "fan" | "creator" | "admin"
          platform_fee_percent: number | null
          waitlist_goal_reached: boolean | null
        }
      }
      circles: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          owner_id: string
        }
      }
      circle_members: {
        Row: {
          circle_id: string
          user_id: string
          joined_at: string
        }
      }
      check_ins: {
        Row: {
          id: string
          created_at: string
          author_id: string
          mood: string | null
          urge_level: number | null
          journal: string | null
          location: string | null
        }
      }
      posts: {
        Row: {
          id: string
          created_at: string
          author_id: string
          circle_id: string | null
          content: string | null
          media_url: string | null
        }
      }
      content: {
        Row: {
          id: string
          created_at: string
          author_id: string
          title: string
          description: string | null
          mux_playback_id: string | null
          mux_asset_id: string | null
          visibility: "public" | "subscriber"
          moderation_status: "pending" | "approved" | "rejected"
        }
      }
      subscriptions: {
        Row: {
          id: string
          created_at: string
          creator_id: string
          subscriber_id: string
          status: "active" | "canceled" | "past_due"
          current_period_end: string | null
          stripe_subscription_id: string | null
        }
      }
      creator_waitlists: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: "pending" | "approved" | "rejected"
          portfolio_url: string | null
          social_links: Json | null
        }
      }
      live_messages: {
        Row: {
          id: string
          created_at: string
          author_id: string
          text: string
          is_tip?: boolean | null
        }
      }
      chat_messages: {
        Row: {
          id: string
          created_at: string
          author_id: string
          text: string
          circle_id: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
