'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    const navLinks = [
        { href: '/#shop', label: 'Shop' },
        { href: '/about', label: 'About' },
        { href: '/videos', label: 'Videos' },
        { href: '/contact', label: 'Contact' },
    ];

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

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href} 
                            className="text-sm uppercase tracking-widest hover:text-[#40E0D0] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button onClick={openCart} className="relative group">
                        <ShoppingBag className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#40E0D0] text-[10px] font-bold text-black">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Mobile Nav Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={openCart} className="relative">
                        <ShoppingBag className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#40E0D0] text-[10px] font-bold text-black">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-md">
                    <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                className="text-lg uppercase tracking-widest hover:text-[#40E0D0] transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
