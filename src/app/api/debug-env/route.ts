import { NextResponse } from 'next/server';

export async function GET() {
    const envStatus = {
        POSTGRES_URL: process.env.POSTGRES_URL ? 'Present' : 'MISSING',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Present' : 'MISSING',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'MISSING',
        ADMIN_USER: process.env.ADMIN_USER || 'Default',
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'Present' : 'MISSING',
        NODE_ENV: process.env.NODE_ENV,
    };

    return NextResponse.json(envStatus);
}
