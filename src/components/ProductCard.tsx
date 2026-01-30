'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { ShoppingCart } from 'lucide-react';

import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-gray-900 rounded-lg mb-4">
                    {product.image && (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}

                    {/* Specific minimalist overlay effect */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                            onClick={handleAddToCart}
                            className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <h3 className="text-lg font-bold uppercase tracking-tight mb-1 group-hover:text-gray-400 transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-400 font-light">
                    ${product.price ? product.price.toFixed(2) : 'N/A'}
                </p>
            </Link>
        </motion.div>
    );
}
