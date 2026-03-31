import { createClient } from '@supabase/supabase-js'

// Use environment variables if available, otherwise fallback to the provided credentials
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || 'https://lzhvhtnshunwjpabzsge.supabase.co').trim()
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aHZodG5zaHVud2pwYWJ6c2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NjMwNTcsImV4cCI6MjA5MDUzOTA1N30.K7-AxXBGvE2DZsKOrZZm_KZowMlhj8hZ2BO9mSsMhUI').trim()

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials missing. Please check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
