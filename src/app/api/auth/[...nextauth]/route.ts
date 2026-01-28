import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const adminUser = process.env.ADMIN_USER || 'admin';
                const adminPass = process.env.ADMIN_PASSWORD;

                if (!adminPass) {
                    throw new Error('ADMIN_PASSWORD not set in environment');
                }

                if (
                    credentials?.username === adminUser &&
                    credentials?.password === adminPass
                ) {
                    return { id: '1', name: 'Admin', email: 'admin@dnomo.com' };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
});

export { handler as GET, handler as POST };
