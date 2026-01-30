import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return !!session?.value;
}

export async function POST(request: NextRequest) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'images';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

        const supabase = getServiceSupabase();
        
        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        const { data, error } = await supabase.storage
            .from('product-media')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            console.error('Upload error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Return proxied URL through our API (avoids mixed content issues)
        // Instead of http://ip:8000/storage/... we return /api/media/...
        const proxiedUrl = `/api/media/${data.path}`;

        return NextResponse.json({ 
            url: proxiedUrl,
            path: data.path 
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
