import { getAllProducts, getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Check } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

export async function generateStaticParams() {
    const products = getAllProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export const dynamicParams = false;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = getProductById(id);

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
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
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
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProductPage Render Error:', error);
        throw error;
    }
}
