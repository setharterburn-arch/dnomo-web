'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoItem {
    id: string;
    title: string;
    description: string | null;
    video_url: string;
    thumbnail_url: string | null;
    category: 'testimonial' | 'demo' | 'review';
    sort_order: number;
    active: boolean;
}

interface VideoGalleryProps {
    videos: VideoItem[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
    const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
    const [filter, setFilter] = useState<'all' | 'testimonial' | 'demo' | 'review'>('all');

    const filteredVideos = filter === 'all' 
        ? videos 
        : videos.filter(v => v.category === filter);

    const categories = [
        { key: 'all', label: 'All' },
        { key: 'testimonial', label: 'Testimonials' },
        { key: 'demo', label: 'Demos' },
        { key: 'review', label: 'Reviews' },
    ];

    return (
        <>
            {/* Category Filter */}
            <div className="flex justify-center gap-4 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        onClick={() => setFilter(cat.key as typeof filter)}
                        className={`px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
                            filter === cat.key
                                ? 'bg-white text-black'
                                : 'bg-transparent text-white border border-white/30 hover:border-white'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map(video => (
                    <div
                        key={video.id}
                        className="group cursor-pointer"
                        onClick={() => setActiveVideo(video)}
                    >
                        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                            {video.thumbnail_url ? (
                                <img
                                    src={video.thumbnail_url}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                            )}
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-black ml-1" fill="black" />
                                </div>
                            </div>
                            
                            {/* Category Badge */}
                            <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-xs font-bold uppercase tracking-wider">
                                {video.category}
                            </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-1">{video.title}</h3>
                        {video.description && (
                            <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                        )}
                    </div>
                ))}
            </div>

            {filteredVideos.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No videos in this category yet.</p>
                </div>
            )}

            {/* Video Modal */}
            {activeVideo && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                    onClick={() => setActiveVideo(null)}
                >
                    <button
                        onClick={() => setActiveVideo(null)}
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    
                    <div 
                        className="w-full max-w-5xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <video
                            src={activeVideo.video_url}
                            controls
                            autoPlay
                            playsInline
                            className="w-full rounded-lg"
                        >
                            <source src={activeVideo.video_url} type="video/mp4" />
                        </video>
                        
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold">{activeVideo.title}</h2>
                            {activeVideo.description && (
                                <p className="text-gray-400 mt-2">{activeVideo.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
