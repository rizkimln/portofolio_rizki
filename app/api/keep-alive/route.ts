// app/api/keep-alive/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Panggil function keep_alive di database
    const { data, error } = await supabaseAdmin.rpc('keep_alive');

    if (error) {
      console.error('Keep-alive database error:', error);
    }

    // Juga lakukan query sederhana untuk memastikan koneksi aktif
    const { data: projects, error: projectError } = await supabaseAdmin.from('projects').select('id').limit(1);

    const response = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database_ping: !error,
      projects_accessible: !projectError,
    };

    console.log('Keep-alive executed:', response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Keep-alive error:', error);
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Keep-alive failed',
      },
      { status: 500 }
    );
  }
}

// POST method juga untuk fleksibilitas
export async function POST(request: NextRequest) {
  return GET(request);
}
