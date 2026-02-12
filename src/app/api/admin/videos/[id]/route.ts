import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return !!session?.value;
}

// GET - Get single video
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        const supabase = getServiceSupabase();
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Video fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
    }
}

// PUT - Update video
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await request.json();
        const updates: Record<string, unknown> = {};

        // Only include fields that are provided
        if (body.title !== undefined) updates.title = body.title;
        if (body.description !== undefined) updates.description = body.description;
        if (body.video_url !== undefined) updates.video_url = body.video_url;
        if (body.thumbnail_url !== undefined) updates.thumbnail_url = body.thumbnail_url;
        if (body.category !== undefined) updates.category = body.category;
        if (body.sort_order !== undefined) updates.sort_order = body.sort_order;
        if (body.active !== undefined) updates.active = body.active;

        updates.updated_at = new Date().toISOString();

        const supabase = getServiceSupabase();
        const { data, error } = await supabase
            .from('videos')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating video:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Video update error:', error);
        return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
    }
}

// DELETE - Delete video
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        const supabase = getServiceSupabase();
        const { error } = await supabase
            .from('videos')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting video:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Video delete error:', error);
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}
