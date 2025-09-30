import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false });

    if (error) {
      console.error('Fetch projects error:', error);
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Get projects error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const status = (formData.get('status') as string) || 'active';
    const technologies = (formData.get('technologies') as string).split(',').map((t: string) => t.trim());
    const github_url = formData.get('github_url') as string;
    const demo_url = formData.get('demo_url') as string;
    const demo_video_url = formData.get('demo_video_url') as string;

    const file = formData.get('file') as File | null;

    let image_url = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('project-images').upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }

      const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);

      image_url = data.publicUrl;
    }

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('projects')
      .insert([
        {
          title,
          description,
          status,
          technologies,
          github_url,
          demo_url,
          demo_video_url,
          image_url,
        },
      ])
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
    }

    return NextResponse.json(inserted[0], { status: 201 });
  } catch (err) {
    console.error('Create project error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
