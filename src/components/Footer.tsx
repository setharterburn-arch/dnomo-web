'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Footer() {
    const pathname = usePathname();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    // Hide footer on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // For now just show success - can be connected to email service later
        setSubscribed(true);
    };

    return (
        <footer className="bg-gradient-to-b from-[#1a3a3a] to-[#0d1f1f] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-10">
                    
                    {/* Brand & Social */}
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold mb-4">:D NOMO</h3>
                        
                        {/* Social Links */}
                        <div className="flex justify-center md:justify-start gap-4 mb-6">
                            <a href="https://tiktok.com/@dnomo" target="_blank" rel="noopener noreferrer" className="text-[#40E0D0] hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                </svg>
                            </a>
                            <a href="https://facebook.com/dnomo" target="_blank" rel="noopener noreferrer" className="text-[#40E0D0] hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com/dnomo" target="_blank" rel="noopener noreferrer" className="text-[#40E0D0] hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://twitter.com/dnomo" target="_blank" rel="noopener noreferrer" className="text-[#40E0D0] hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                        </div>

                        {/* Client Testimonials Badge */}
                        <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-2">Client Testimonials</p>
                            <div className="flex justify-center md:justify-start gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-[#40E0D0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="bg-black/30 rounded-lg p-3 inline-block">
                            <div className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">🏷️</span>
                                <div>
                                    <p className="text-[#40E0D0] text-sm font-semibold">33% OFF CODE</p>
                                    <p className="font-bold">LHCEMBAK</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">●</span>
                                <Link href="/" className="hover:text-[#40E0D0] transition-colors">Home</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">●</span>
                                <Link href="/#shop" className="hover:text-[#40E0D0] transition-colors">Products</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">●</span>
                                <Link href="/about" className="hover:text-[#40E0D0] transition-colors">About Us</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">●</span>
                                <Link href="/contact" className="hover:text-[#40E0D0] transition-colors">Contact Us</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">●</span>
                                <Link href="/testimonials" className="hover:text-[#40E0D0] transition-colors">Testimonials</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Important Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">●</span>
                                <Link href="/returns" className="hover:text-[#40E0D0] transition-colors">Returns</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">●</span>
                                <Link href="/terms" className="hover:text-[#40E0D0] transition-colors">Limited Warranty and Liability Limitation</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#40E0D0]">●</span>
                                <Link href="/magnet-safety" className="hover:text-[#40E0D0] transition-colors">Magnet Safety</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">News Letter</h4>
                        {!subscribed ? (
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 bg-white text-black rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none text-sm"
                                />
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 bg-white text-black rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none text-sm"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                                >
                                    Subscribe
                                </button>
                            </form>
                        ) : (
                            <div className="bg-[#40E0D0]/10 border border-[#40E0D0] rounded-lg p-4 text-center">
                                <p className="text-[#40E0D0] font-semibold">Thanks for subscribing!</p>
                                <p className="text-sm text-gray-400">Stay tuned for updates.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">
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
