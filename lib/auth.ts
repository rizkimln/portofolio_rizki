// lib/auth.ts
import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function verifyAuth(request: NextRequest) {
  const accessToken = request.cookies.get('sb-access-token')?.value;

  if (!accessToken) {
    throw new Error('No authentication token');
  }

  // Gunakan supabase client yang sama dengan yang di /lib/supabase.ts
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    throw new Error('Invalid authentication token');
  }

  return user;
}
