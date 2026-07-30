export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          author_id: string
          circle_id: string
          created_at: string
          id: string
          text: string
        }
        Insert: {
          author_id: string
          circle_id: string
          created_at?: string
          id?: string
          text: string
        }
        Update: {
          author_id?: string
          circle_id?: string
          created_at?: string
          id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: 'chat_messages_circle_id_fkey'
            columns: ['circle_id']
            isOneToOne: false
            referencedRelation: 'circles'
            referencedColumns: ['id']
          },
        ]
      }
      check_ins: {
        Row: {
          author_id: string
          created_at: string
          id: string
          journal: string | null
          mood: string | null
          urge_level: number | null
        }
        Insert: {
          author_id: string
          created_at?: string
          id?: string
          journal?: string | null
          mood?: string | null
          urge_level?: number | null
        }
        Update: {
          author_id?: string
          created_at?: string
          id?: string
          journal?: string | null
          mood?: string | null
          urge_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'check_ins_user_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      circle_members: {
        Row: {
          circle_id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          circle_id: string
          joined_at?: string
          user_id: string
        }
        Update: {
          circle_id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'circle_members_circle_id_fkey'
            columns: ['circle_id']
            isOneToOne: false
            referencedRelation: 'circles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'circle_members_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      circles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          owner_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'circles_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      content: {
        Row: {
          author_id: string
          boost_factor: number | null
          created_at: string | null
          description: string | null
          engagement_score: number | null
          id: string
          moderation_status: string | null
          mux_asset_id: string | null
          mux_playback_id: string | null
          nsfw_score: number | null
          price_ppv: number | null
          required_tier: number | null
          status: string
          title: string
          visibility: string | null
        }
        Insert: {
          author_id: string
          boost_factor?: number | null
          created_at?: string | null
          description?: string | null
          engagement_score?: number | null
          id?: string
          moderation_status?: string | null
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          nsfw_score?: number | null
          price_ppv?: number | null
          required_tier?: number | null
          status?: string
          title: string
          visibility?: string | null
        }
        Update: {
          author_id?: string
          boost_factor?: number | null
          created_at?: string | null
          description?: string | null
          engagement_score?: number | null
          id?: string
          moderation_status?: string | null
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          nsfw_score?: number | null
          price_ppv?: number | null
          required_tier?: number | null
          status?: string
          title?: string
          visibility?: string | null
        }
        Relationships: []
      }
      creator_spotlights: {
        Row: {
          color: string
          created_at: string
          description: string
          gradient: string
          id: string
          is_active: boolean | null
          profile_id: string | null
          role: string
          video_url: string
        }
        Insert: {
          color: string
          created_at?: string
          description: string
          gradient: string
          id?: string
          is_active?: boolean | null
          profile_id?: string | null
          role: string
          video_url: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          gradient?: string
          id?: string
          is_active?: boolean | null
          profile_id?: string | null
          role?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'creator_spotlights_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      creator_waitlists: {
        Row: {
          created_at: string | null
          creator_id: string
          fan_email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          fan_email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          fan_email?: string
          id?: string
        }
        Relationships: []
      }
      fan_invitations: {
        Row: {
          created_at: string | null
          creator_id: string
          email: string
          id: string
          name: string | null
          source: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          email: string
          id?: string
          name?: string | null
          source: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          email?: string
          id?: string
          name?: string | null
          source?: string
          status?: string | null
        }
        Relationships: []
      }
      live_messages: {
        Row: {
          author_id: string
          created_at: string
          id: string
          is_tip: boolean | null
          text: string
        }
        Insert: {
          author_id: string
          created_at?: string
          id?: string
          is_tip?: boolean | null
          text: string
        }
        Update: {
          author_id?: string
          created_at?: string
          id?: string
          is_tip?: boolean | null
          text?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string
          circle_id: string | null
          content: string | null
          created_at: string
          id: string
          media_url: string | null
          requires_support: boolean | null
        }
        Insert: {
          author_id: string
          circle_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          media_url?: string | null
          requires_support?: boolean | null
        }
        Update: {
          author_id?: string
          circle_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          media_url?: string | null
          requires_support?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: 'posts_circle_id_fkey'
            columns: ['circle_id']
            isOneToOne: false
            referencedRelation: 'circles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_user_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          ai_tone: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          goal: string | null
          id: string
          is_admin: boolean
          platform_fee_percent: number | null
          strictness: string | null
          strikes: number | null
          user_type: string | null
          username: string | null
          waitlist_goal_reached: boolean | null
          zip_code: string | null
        }
        Insert: {
          ai_tone?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          goal?: string | null
          id: string
          is_admin?: boolean
          platform_fee_percent?: number | null
          strictness?: string | null
          strikes?: number | null
          user_type?: string | null
          username?: string | null
          waitlist_goal_reached?: boolean | null
          zip_code?: string | null
        }
        Update: {
          ai_tone?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          goal?: string | null
          id?: string
          is_admin?: boolean
          platform_fee_percent?: number | null
          strictness?: string | null
          strikes?: number | null
          user_type?: string | null
          username?: string | null
          waitlist_goal_reached?: boolean | null
          zip_code?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          creator_id: string
          current_period_end: string
          fan_id: string
          id: string
          status: string
          stripe_subscription_id: string
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          current_period_end: string
          fan_id: string
          id?: string
          status: string
          stripe_subscription_id: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          current_period_end?: string
          fan_id?: string
          id?: string
          status?: string
          stripe_subscription_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_is_admin: { Args: never; Returns: boolean }
      increment_creator_strike: {
        Args: { target_user_id: string }
        Returns: number
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
