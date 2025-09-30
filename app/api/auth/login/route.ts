import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs'; // pastikan sudah install: npm install bcryptjs

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // cari user di supabase
    const { data: users, error } = await supabase.from('users').select('*').eq('username', username).single();

    if (error || !users) {
      return NextResponse.json({ success: false, message: 'User tidak ditemukan' }, { status: 401 });
    }

    // cek password hash
    const valid = await bcrypt.compare(password, users.password);
    if (!valid) {
      return NextResponse.json({ success: false, message: 'Password salah' }, { status: 401 });
    }

    // sukses → cukup balikin success
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
