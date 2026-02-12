import { getAllProducts, getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Check } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen text-black">
            <div className="container mx-auto px-6 py-12 md:py-24">
                <Link href="/#shop" className="inline-flex items-center text-sm font-bold uppercase tracking-widest mb-12 hover:text-gray-500 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Image Section */}
                    <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                        {product.image && (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-2xl md:text-3xl font-light text-gray-600 mb-8">
                            ${product.price.toFixed(2)}
                        </p>

                        <div className="prose prose-lg text-gray-700 mb-12">
                            <p>
                                {product.description || `Experience total control with the ${product.name}. Designed for the modern lifestyle, blending minimal aesthetics with maximum utility. Built with premium materials to last all day, every day.`}
                            </p>
                        </div>

                        {/* Product Video */}
                        {product.video_url && (
                            <div className="mb-12">
                                <video
                                    src={product.video_url}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="w-full rounded-lg bg-black"
                                    poster={product.image || undefined}
                                >
                                    <source src={product.video_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}

                        <div className="space-y-4 mb-12">
                            {(product.features?.length ? product.features : ['Premium Build Quality', 'Magnetic Compatibility', '1 Year Warranty']).map((feature, i) => (
                                <div key={i} className="flex items-center text-sm font-bold uppercase tracking-wide">
                                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center mr-3">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <AddToCartButton product={product} />
                    </div>
                </div>

                {/* Image Gallery */}
                {product.gallery && product.gallery.length > 0 && (
                    <div className="mt-24">
                        <h2 className="text-2xl font-bold uppercase tracking-tighter mb-8">Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {product.gallery.map((img, i) => (
                                <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`${product.name} gallery ${i + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
