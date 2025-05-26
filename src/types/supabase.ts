
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          price: number
          description: string | null
          image_url: string | null
          category_id: number | null
          created_at: string | null
          purchase_link: string | null
        }
        Insert: {
          id?: number
          name: string
          price: number
          description?: string | null
          image_url?: string | null
          category_id?: number | null
          created_at?: string | null
          purchase_link?: string | null
        }
        Update: {
          id?: number
          name?: string
          price?: number
          description?: string | null
          image_url?: string | null
          category_id?: number | null
          created_at?: string | null
          purchase_link?: string | null
        }
      }
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row'];
export type NewProduct = Database['public']['Tables']['products']['Insert'];
export type UpdateProduct = Database['public']['Tables']['products']['Update'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
