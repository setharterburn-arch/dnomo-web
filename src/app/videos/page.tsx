import { getServiceSupabase } from '@/lib/supabase';
import VideoGallery from '@/components/VideoGallery';

export const revalidate = 60;

export const metadata = {
    title: 'Videos & Testimonials | DNOMO USA',
    description: 'Watch product demonstrations and customer testimonials for DNOMO USA accessories.',
};

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

async function getVideos(): Promise<VideoItem[]> {
    const supabase = getServiceSupabase();
    
    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });
    
    if (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
    
    return data || [];
}

export default async function VideosPage() {
    const videos = await getVideos();
    
    return (
        <div className="bg-black min-h-screen text-white">
            {/* Hero Section */}
            <div className="pt-32 pb-16 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                    Videos & Testimonials
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    See DNOMO in action. Watch product demonstrations and hear from our satisfied customers.
                </p>
            </div>
            
            {/* Video Gallery */}
            <div className="container mx-auto px-6 pb-24">
                {videos.length > 0 ? (
                    <VideoGallery videos={videos} />
                ) : (
                    <div className="text-center py-24">
                        <p className="text-gray-500 text-lg">Videos coming soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
