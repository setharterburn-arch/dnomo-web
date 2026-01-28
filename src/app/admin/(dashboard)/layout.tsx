import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-black">
            <nav className="bg-white shadow">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/admin" className="text-xl font-bold uppercase tracking-wider">
                        DNOMO Admin
                    </Link>
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <Link href="/" target="_blank" className="text-gray-500 hover:text-black">
                            View Site
                        </Link>
                        <span className="text-gray-300">|</span>
                        <span>{session.user?.name || 'Admin'}</span>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
