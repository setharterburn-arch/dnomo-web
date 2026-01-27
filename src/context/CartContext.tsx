'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from local storage
    useEffect(() => {
        const savedCart = localStorage.getItem('dnomo_cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save cart to local storage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('dnomo_cart', JSON.stringify(items));
        }
    }, [items, isInitialized]);

    const addItem = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems((prev) => {
            if (quantity <= 0) return prev.filter((item) => item.id !== id);
            return prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );
        });
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, isOpen, openCart, closeCart, subtotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
