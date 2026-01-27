import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DNOMO USA | Total Control',
    description: 'Premium magnetic accessories for your lifestyle.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-black text-white">
            <body className={inter.className}>
                <CartProvider>
                    <Navbar />
                    <CartDrawer />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}
