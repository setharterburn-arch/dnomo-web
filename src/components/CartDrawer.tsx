'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

    const handleCheckout = async () => {

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || 'Checkout API failed');
            }

            const { url } = await response.json();
            if (url) {
                window.location.href = url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error: any) {
            console.error('Checkout failed:', error);
            alert(`Checkout failed: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white text-black shadow-2xl z-50 flex flex-col"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-gray-100">
                            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" /> Cart ({items.reduce((a, b) => a + b.quantity, 0)})
                            </h2>
                            <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                    <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="text-lg uppercase tracking-wide">Your cart is empty</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold uppercase tracking-tight text-sm mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-gray-600"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-gray-600"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-xs text-red-500 hover:text-red-700 uppercase font-bold tracking-wide"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-bold uppercase tracking-tight">Subtotal</span>
                                    <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
