import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session');
        
        if (!session?.value) {
            return NextResponse.json({ authenticated: false });
        }

        // Verify session is valid (basic check - could add more validation)
        try {
            const decoded = Buffer.from(session.value, 'base64').toString('utf-8');
            const [userId, timestamp] = decoded.split(':');
            
            if (!userId || !timestamp) {
                return NextResponse.json({ authenticated: false });
            }

            // Check if session is not older than 1 week
            const sessionAge = Date.now() - parseInt(timestamp);
            if (sessionAge > 7 * 24 * 60 * 60 * 1000) {
                return NextResponse.json({ authenticated: false });
            }

            return NextResponse.json({ authenticated: true });
        } catch {
            return NextResponse.json({ authenticated: false });
        }
    } catch {
        return NextResponse.json({ authenticated: false });
    }
}
