'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    // Hide footer on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="bg-black text-white py-12 border-t border-gray-900">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                <div className="mb-4 md:mb-0">
                    <p className="text-sm font-light tracking-wide">
                        &copy; {new Date().getFullYear()} DNOMO USA. All rights reserved.
                    </p>
                </div>
                <div className="flex gap-6 text-sm font-light tracking-wide uppercase">
                    <a href="#" className="hover:text-gray-300">Privacy</a>
                    <a href="#" className="hover:text-gray-300">Terms</a>
                    <a href="#" className="hover:text-gray-300">Contact</a>
                </div>
            </div>
        </footer>
    );
}
