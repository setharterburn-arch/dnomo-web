import VideoHero from '@/components/VideoHero';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/lib/products';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
    const products = await getAllProducts();

    return (
        <div>
            <VideoHero />
            <section className="py-24 bg-black text-white" id="shop">
                <div className="container mx-auto px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
                            The Collection
                        </h2>
                        <div className="w-24 h-1 bg-white mx-auto" />
                    </div>

                    <ProductGrid products={products} />
                </div>
            </section>

            {/* Product Showcase Video */}
            <section className="py-24 bg-zinc-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">
                            See It In Action
                        </h2>
                        <div className="w-24 h-1 bg-white mx-auto" />
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full rounded-lg shadow-2xl"
                        >
                            <source src="/videos/product-showcase.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </section>
        </div>
    );
}
