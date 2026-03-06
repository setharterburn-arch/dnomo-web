'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    // Hide footer on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="bg-black text-white py-12 border-t border-gray-900">
            <div className="container mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">DNOMO USA</h3>
                        <p className="text-gray-400 text-sm">
                            Your Phone, Wallet and Key Solution. Take back control of your everyday essentials.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[#40E0D0]">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/#shop" className="hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="/videos" className="hover:text-white transition-colors">Videos</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[#40E0D0]">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[#40E0D0]">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/terms#warranty" className="hover:text-white transition-colors">Warranty</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Returns</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} DNOMO USA / Alfreds Connection, INC. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="mailto:Alfredsconnection@gmail.com" className="text-gray-400 hover:text-[#40E0D0] transition-colors text-sm">
                            Alfredsconnection@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
