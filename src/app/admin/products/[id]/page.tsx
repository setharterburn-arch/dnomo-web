'use client';

import { useAdmin } from '@/context/AdminContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductEditor from '@/components/admin/ProductEditor';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
    url: string | null;
    description: string | null;
    features: string[];
    gallery: string[];
    video_url: string | null;
    sort_order: number;
    active: boolean;
}

export default function EditProductPage() {
    const { isAuthenticated, isLoading: authLoading } = useAdmin();
    const router = useRouter();
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, authLoading, router]);

    useEffect(() => {
        if (isAuthenticated && params.id) {
            fetchProduct();
        }
    }, [isAuthenticated, params.id]);

    async function fetchProduct() {
        try {
            const res = await fetch(`/api/admin/products/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setProduct(data);
            } else {
                setError('Product not found');
            }
        } catch (err) {
            setError('Failed to load product');
        } finally {
            setLoading(false);
        }
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => router.push('/admin')}
                        className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                        Back to Admin
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return <ProductEditor product={product} />;
}
