import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return !!session?.value;
}

// GET - List all videos
export async function GET() {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const supabase = getServiceSupabase();
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching videos:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Videos fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}

// POST - Create new video
export async function POST(request: NextRequest) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, description, video_url, thumbnail_url, category, sort_order, active } = body;

        if (!title || !video_url) {
            return NextResponse.json({ error: 'Title and video_url are required' }, { status: 400 });
        }

        const supabase = getServiceSupabase();
        const { data, error } = await supabase
            .from('videos')
            .insert({
                title,
                description: description || null,
                video_url,
                thumbnail_url: thumbnail_url || null,
                category: category || 'testimonial',
                sort_order: sort_order || 0,
                active: active !== false,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating video:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Video create error:', error);
        return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
    }
}
