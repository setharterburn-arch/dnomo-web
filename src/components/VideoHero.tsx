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
                <source src="/videos/hero.mp4?v=2" type="video/mp4" />
            </video>

            {/* Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-end text-center text-white px-4 pb-32">
                {/* Text Removed */}

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    <Link
                        href="/#shop"
                        className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300"
                    >
                        Shop Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
