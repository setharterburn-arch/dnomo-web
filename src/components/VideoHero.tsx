'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VideoHero() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            >
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center text-white px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">
                        Take Control
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <p className="text-xl md:text-2xl font-light tracking-widest uppercase mb-10 text-gray-200">
                        All Day. Every Day.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    <Link
                        href="/shop"
                        className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300"
                    >
                        Shop Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
