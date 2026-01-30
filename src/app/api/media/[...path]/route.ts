import { NextRequest, NextResponse } from 'next/server';

// Proxy requests to Supabase storage
// This allows us to serve storage files through HTTPS on the main domain
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const filePath = path.join('/');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const storageUrl = `${supabaseUrl}/storage/v1/object/public/product-media/${filePath}`;
    
    try {
        const response = await fetch(storageUrl);
        
        if (!response.ok) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
        
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const buffer = await response.arrayBuffer();
        
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Media proxy error:', error);
        return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
    }
}
