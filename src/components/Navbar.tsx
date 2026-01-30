'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { openCart, items } = useCart();
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    useEffect(() => {
        if (isAdmin) return;
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAdmin]);

    // Hide navbar on admin pages
    if (isAdmin) {
        return null;
    }

    return (
        <nav
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center text-white">
                <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
                    DNOMO USA
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/#shop" className="text-sm uppercase tracking-widest hover:text-gray-300 transition-colors">
                        Shop
                    </Link>
                    <button onClick={openCart} className="relative group">
                        <ShoppingBag className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
