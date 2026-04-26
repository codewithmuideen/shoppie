import { createClient } from '@supabase/supabase-js'

// Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY at build time.
// If either is missing the storefront falls back to localStorage so the app
// keeps working in dev with no backend.

const url  = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anon)

export const supabase = isSupabaseConfigured
  ? createClient(url, anon, {
      auth: { persistSession: true, autoRefreshToken: true },
      realtime: { params: { eventsPerSecond: 5 } }
    })
  : null

// Storage bucket for admin-uploaded product imagery. Created via the SQL in
// supabase/schema.sql.
export const PRODUCT_BUCKET = 'product-images'
