import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create supabase client - use placeholder during build if not configured
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY5MzY4MDAsImV4cCI6MTk2MjUxMjgwMH0.placeholder';

export const supabase: SupabaseClient = createClient(url, key);

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase credentials missing! Check environment variables.');
}

// Database types
export interface SongRequestDB {
  id: string;
  user_id: number;
  user_name: string;
  mode: 'solo' | 'duet' | 'suffer';
  duet_partner_id?: number;
  duet_partner_name?: string;
  song_title: string;
  artist: string;
  created_at: string;
}

