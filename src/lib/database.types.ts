export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          avatar_url: string | null
          birthday: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          relationship: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          birthday?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          relationship?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          birthday?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          relationship?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      deliveries: {
        Row: {
          created_at: string
          delivered_at: string | null
          id: string
          order_id: string
          status: string
          tracking: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          id?: string
          order_id: string
          status?: string
          tracking?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          id?: string
          order_id?: string
          status?: string
          tracking?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      generation_jobs: {
        Row: {
          created_at: string
          error: string | null
          id: string
          output_asset_id: string | null
          status: Database["public"]["Enums"]["job_status"]
          subject_id: string | null
          template_id: string | null
          token_cost: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          output_asset_id?: string | null
          status?: Database["public"]["Enums"]["job_status"]
          subject_id?: string | null
          template_id?: string | null
          token_cost?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          output_asset_id?: string | null
          status?: Database["public"]["Enums"]["job_status"]
          subject_id?: string | null
          template_id?: string | null
          token_cost?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generation_jobs_output_asset_id_fkey"
            columns: ["output_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generation_jobs_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generation_jobs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          created_at: string
          id: string
          job_id: string | null
          kind: Database["public"]["Enums"]["asset_kind"]
          status: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id?: string | null
          kind?: Database["public"]["Enums"]["asset_kind"]
          status?: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string | null
          kind?: Database["public"]["Enums"]["asset_kind"]
          status?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "generation_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      occasions: {
        Row: {
          contact_id: string
          created_at: string
          date: string
          id: string
          recurring: boolean
          reminder_days: number
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          date: string
          id?: string
          recurring?: boolean
          reminder_days?: number
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          date?: string
          id?: string
          recurring?: boolean
          reminder_days?: number
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "occasions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          asset_id: string | null
          id: string
          label: string
          order_id: string
          price_cents: number
          qty: number
        }
        Insert: {
          asset_id?: string | null
          id?: string
          label: string
          order_id: string
          price_cents?: number
          qty?: number
        }
        Update: {
          asset_id?: string | null
          id?: string
          label?: string
          order_id?: string
          price_cents?: number
          qty?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          channel: string | null
          created_at: string
          id: string
          recipient_contact_id: string | null
          status: string
          total_cents: number
          updated_at: string
          user_id: string
        }
        Insert: {
          channel?: string | null
          created_at?: string
          id?: string
          recipient_contact_id?: string | null
          status?: string
          total_cents?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          channel?: string | null
          created_at?: string
          id?: string
          recipient_contact_id?: string | null
          status?: string
          total_cents?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_recipient_contact_id_fkey"
            columns: ["recipient_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          default_tone: string
          display_name: string | null
          id: string
          timezone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_tone?: string
          display_name?: string | null
          id: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_tone?: string
          display_name?: string | null
          id?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      shares: {
        Row: {
          asset_id: string
          created_at: string
          expires_at: string | null
          id: string
          is_public: boolean
          slug: string
          user_id: string
        }
        Insert: {
          asset_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_public?: boolean
          slug: string
          user_id: string
        }
        Update: {
          asset_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_public?: boolean
          slug?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shares_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["subject_kind"]
          name: string
          reference_asset_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["subject_kind"]
          name: string
          reference_asset_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["subject_kind"]
          name?: string
          reference_asset_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_reference_asset_id_fkey"
            columns: ["reference_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          aesthetic: string | null
          created_at: string
          creator_id: string | null
          description: string | null
          id: string
          is_public: boolean
          scene_prompt: string
          title: string
          updated_at: string
        }
        Insert: {
          aesthetic?: string | null
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          scene_prompt: string
          title: string
          updated_at?: string
        }
        Update: {
          aesthetic?: string | null
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          scene_prompt?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      token_ledger: {
        Row: {
          created_at: string
          delta: number
          id: string
          job_id: string | null
          reason: Database["public"]["Enums"]["ledger_reason"]
          user_id: string
        }
        Insert: {
          created_at?: string
          delta: number
          id?: string
          job_id?: string | null
          reason: Database["public"]["Enums"]["ledger_reason"]
          user_id: string
        }
        Update: {
          created_at?: string
          delta?: number
          id?: string
          job_id?: string | null
          reason?: Database["public"]["Enums"]["ledger_reason"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_ledger_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "generation_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_order: {
        Args: {
          channel: string | null
          items: Json
          recipient_contact_id: string | null
        }
        Returns: {
          channel: string | null
          created_at: string
          id: string
          recipient_contact_id: string | null
          status: string
          total_cents: number
          updated_at: string
          user_id: string
        }
      }
    }
    Enums: {
      asset_kind: "image" | "video" | "reference"
      job_status: "queued" | "running" | "succeeded" | "failed"
      ledger_reason: "purchase" | "grant" | "job_debit" | "job_refund"
      subject_kind: "person" | "pet"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      asset_kind: ["image", "video", "reference"],
      job_status: ["queued", "running", "succeeded", "failed"],
      ledger_reason: ["purchase", "grant", "job_debit", "job_refund"],
      subject_kind: ["person", "pet"],
    },
  },
} as const
