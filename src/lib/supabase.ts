import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials missing! Check .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

