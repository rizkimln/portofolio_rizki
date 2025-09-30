import { createClient } from '@supabase/supabase-js';

// Ambil dari .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

// Client publik (untuk frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ---- Project Type ----
export type Project = {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  demo_video_url?: string;
  technologies?: string[];
  category?: string;
  status?: string;
  featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
};
