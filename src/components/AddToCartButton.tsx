'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { ShoppingBag } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart();

    return (
        <button
            onClick={() => addItem(product)}
            className="w-full bg-black text-white py-6 text-lg font-bold uppercase tracking-widest hover:bg-gray-900 transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
        >
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
        </button>
    );
}
