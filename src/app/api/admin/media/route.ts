import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return !!session?.value;
}

// GET - List all files in storage
export async function GET(request: NextRequest) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const supabase = getServiceSupabase();
        const folders = ['images', 'gallery', 'videos'];
        const allFiles: Array<{
            name: string;
            folder: string;
            size: number;
            created_at: string;
            url: string;
        }> = [];

        for (const folder of folders) {
            const { data, error } = await supabase.storage
                .from('product-media')
                .list(folder, {
                    limit: 100,
                    sortBy: { column: 'created_at', order: 'desc' }
                });

            if (error) {
                console.error(`Error listing ${folder}:`, error);
                continue;
            }

            if (data) {
                for (const file of data) {
                    if (file.name === '.emptyFolderPlaceholder') continue;
                    allFiles.push({
                        name: file.name,
                        folder,
                        size: file.metadata?.size || 0,
                        created_at: file.created_at || '',
                        url: `/api/media/${folder}/${file.name}`
                    });
                }
            }
        }

        return NextResponse.json({ files: allFiles });
    } catch (error) {
        console.error('List media error:', error);
        return NextResponse.json({ error: 'Failed to list media' }, { status: 500 });
    }
}

// DELETE - Delete a file from storage
export async function DELETE(request: NextRequest) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { path } = await request.json();
        
        if (!path) {
            return NextResponse.json({ error: 'Path required' }, { status: 400 });
        }

        const supabase = getServiceSupabase();
        
        const { error } = await supabase.storage
            .from('product-media')
            .remove([path]);

        if (error) {
            console.error('Delete error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete media error:', error);
        return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
    }
}
