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
        </div>
    );
}
