'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            username,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError('Invalid credentials');
        } else {
            router.push('/admin');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6 uppercase tracking-wider">Admin Login</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-black transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-black transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 transition-colors uppercase tracking-widest"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
