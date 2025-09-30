import { createClient } from '@supabase/supabase-js';

// Ambil dari environment variable
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // atau anon key untuk read
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    // Query super ringan via RPC 'ping' (tidak menyentuh tabel)
    const { data, error } = await supabase.rpc('ping');

    if (error) throw error;

    res.status(200).json({ status: 'ok', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}
