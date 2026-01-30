'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VideoHero() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-contain opacity-90"
            >
                <source src="/videos/hero.mp4?v=2" type="video/mp4" />
            </video>

            {/* Mute/Unmute Button */}
            <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>

            {/* Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center text-white px-4">
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
