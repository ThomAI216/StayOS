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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      places: {
        Row: {
          category: string
          created_at: string
          description: string | null
          distance_text: string | null
          emoji: string | null
          google_place_id: string | null
          id: string
          lat: number | null
          lng: number | null
          property_id: string
          status: Database["public"]["Enums"]["place_status"]
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          distance_text?: string | null
          emoji?: string | null
          google_place_id?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          property_id: string
          status?: Database["public"]["Enums"]["place_status"]
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          distance_text?: string | null
          emoji?: string | null
          google_place_id?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          property_id?: string
          status?: Database["public"]["Enums"]["place_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "places_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          check_in_time: string | null
          check_out_time: string | null
          created_at: string
          entry_instructions: string | null
          host_id: string
          house_rules: string | null
          id: string
          lat: number | null
          lng: number | null
          name: string
          parking_info: string | null
          slug: string
          wifi_network: string | null
          wifi_password: string | null
        }
        Insert: {
          address: string
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string
          entry_instructions?: string | null
          host_id: string
          house_rules?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name: string
          parking_info?: string | null
          slug: string
          wifi_network?: string | null
          wifi_password?: string | null
        }
        Update: {
          address?: string
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string
          entry_instructions?: string | null
          host_id?: string
          house_rules?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string
          parking_info?: string | null
          slug?: string
          wifi_network?: string | null
          wifi_password?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string
          description: string | null
          eta_message: string | null
          guest_name: string | null
          id: string
          issue_type: string
          property_id: string
          status: Database["public"]["Enums"]["ticket_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          eta_message?: string | null
          guest_name?: string | null
          id?: string
          issue_type: string
          property_id: string
          status?: Database["public"]["Enums"]["ticket_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          eta_message?: string | null
          guest_name?: string | null
          id?: string
          issue_type?: string
          property_id?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      upsell_requests: {
        Row: {
          created_at: string
          guest_name: string | null
          id: string
          property_id: string
          status: Database["public"]["Enums"]["upsell_request_status"]
          upsell_id: string
        }
        Insert: {
          created_at?: string
          guest_name?: string | null
          id?: string
          property_id: string
          status?: Database["public"]["Enums"]["upsell_request_status"]
          upsell_id: string
        }
        Update: {
          created_at?: string
          guest_name?: string | null
          id?: string
          property_id?: string
          status?: Database["public"]["Enums"]["upsell_request_status"]
          upsell_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "upsell_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upsell_requests_upsell_id_fkey"
            columns: ["upsell_id"]
            isOneToOne: false
            referencedRelation: "upsells"
            referencedColumns: ["id"]
          },
        ]
      }
      upsells: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean
          price_text: string
          property_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          price_text: string
          property_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          price_text?: string
          property_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "upsells_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      seed_stayos_demo_data: { Args: { p_host_id: string }; Returns: undefined }
    }
    Enums: {
      place_status: "draft" | "approve" | "hide" | "pin"
      ticket_status: "open" | "in_progress" | "resolved"
      upsell_request_status: "pending" | "approved" | "paid" | "declined"
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
  public: {
    Enums: {
      place_status: ["draft", "approve", "hide", "pin"],
      ticket_status: ["open", "in_progress", "resolved"],
      upsell_request_status: ["pending", "approved", "paid", "declined"],
    },
  },
} as const
