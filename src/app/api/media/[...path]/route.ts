import { NextRequest, NextResponse } from 'next/server';

// Proxy requests to Supabase storage with streaming support for videos
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const filePath = path.join('/');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const storageUrl = `${supabaseUrl}/storage/v1/object/public/product-media/${filePath}`;
    
    try {
        // Check if this is a video file
        const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(filePath);
        
        // Get the range header for video seeking support
        const range = request.headers.get('range');
        
        if (isVideo && range) {
            // Handle range request for video streaming
            // First, get the file size with a HEAD request
            const headResponse = await fetch(storageUrl, { method: 'HEAD' });
            
            if (!headResponse.ok) {
                return NextResponse.json({ error: 'File not found' }, { status: 404 });
            }
            
            const contentLength = parseInt(headResponse.headers.get('content-length') || '0', 10);
            const contentType = headResponse.headers.get('content-type') || 'video/mp4';
            
            // Parse range header (e.g., "bytes=0-1023")
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : contentLength - 1;
            const chunkSize = end - start + 1;
            
            // Fetch the requested range
            const rangeResponse = await fetch(storageUrl, {
                headers: {
                    'Range': `bytes=${start}-${end}`,
                },
            });
            
            if (!rangeResponse.ok && rangeResponse.status !== 206) {
                return NextResponse.json({ error: 'Failed to fetch range' }, { status: 500 });
            }
            
            const buffer = await rangeResponse.arrayBuffer();
            
            return new NextResponse(buffer, {
                status: 206,
                headers: {
                    'Content-Type': contentType,
                    'Content-Length': chunkSize.toString(),
                    'Content-Range': `bytes ${start}-${end}/${contentLength}`,
                    'Accept-Ranges': 'bytes',
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            });
        }
        
        // For non-range requests (images or full video download)
        const response = await fetch(storageUrl);
        
        if (!response.ok) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
        
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const contentLength = response.headers.get('content-length');
        const buffer = await response.arrayBuffer();
        
        const headers: Record<string, string> = {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        };
        
        // Add Accept-Ranges for videos so browser knows it can seek
        if (isVideo) {
            headers['Accept-Ranges'] = 'bytes';
            if (contentLength) {
                headers['Content-Length'] = contentLength;
            }
        }
        
        return new NextResponse(buffer, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error('Media proxy error:', error);
        return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
    }
}
