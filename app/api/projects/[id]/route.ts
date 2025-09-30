import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { v4 as uuidv4 } from 'uuid';

// ✅ UPDATE PROJECT (support multipart/form-data + file upload)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const formData = await request.formData();

    // ambil field text
    const title = formData.get('title')?.toString() || null;
    const description = formData.get('description')?.toString() || null;
    const long_description = formData.get('long_description')?.toString() || null;
    const demo_url = formData.get('demo_url')?.toString() || null;
    const github_url = formData.get('github_url')?.toString() || null;
    const demo_video_url = formData.get('demo_video_url')?.toString() || null;
    const category = formData.get('category')?.toString() || null;
    const status = formData.get('status')?.toString() || null;
    const featured = formData.get('featured') === 'true';
    const sort_order = formData.get('sort_order') ? Number(formData.get('sort_order')) : null;

    // parse technologies
    const technologiesRaw = formData.get('technologies')?.toString() || '';
    const technologies = technologiesRaw ? technologiesRaw.split(/[, ]+/).filter(Boolean) : [];

    // ✅ handle file upload
    let image_url: string | null = null;
    const file = formData.get('file') as File | null;

    if (file) {
      const ext = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${ext}`;

      const { error: uploadError } = await supabaseAdmin.storage.from('project-images').upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
      }

      const { data } = supabaseAdmin.storage.from('project-images').getPublicUrl(fileName);

      image_url = data.publicUrl;
    } else {
      image_url = formData.get('image_url')?.toString() || null;
    }

    // update project
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .update({
        title,
        description,
        long_description,
        image_url,
        demo_url,
        github_url,
        demo_video_url,
        technologies,
        category,
        status,
        featured,
        sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (projectError) {
      console.error('❌ Update project error:', projectError);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (err) {
    console.error('❌ Update project catch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ✅ DELETE PROJECT
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const { error: projectError } = await supabaseAdmin.from('projects').delete().eq('id', params.id);

    if (projectError) {
      console.error('❌ Delete project error:', projectError);
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('❌ Delete project catch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
