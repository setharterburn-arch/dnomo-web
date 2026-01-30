'use client';

import { useAdmin } from '@/context/AdminContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Plus, LogOut, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
    active: boolean;
    sort_order: number;
}

export default function AdminPage() {
    const { isAuthenticated, isLoading, login, logout } = useAdmin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    async function fetchProducts() {
        setProductsLoading(true);
        try {
            const res = await fetch('/api/admin/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (err) {
            console.error('Failed to fetch products:', err);
        } finally {
            setProductsLoading(false);
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoginLoading(true);
        
        const success = await login(email, password);
        if (!success) {
            setError('Invalid email or password');
        }
        setLoginLoading(false);
    }

    async function toggleProductActive(product: Product) {
        try {
            const res = await fetch(`/api/admin/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: !product.active }),
            });
            if (res.ok) {
                fetchProducts();
            }
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    }

    async function deleteProduct(product: Product) {
        if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
            return;
        }
        try {
            const res = await fetch(`/api/admin/products/${product.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchProducts();
            }
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {loginLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-black text-white py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">DNOMO Admin</h1>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-8 px-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                        <Package className="w-6 h-6" />
                        Products
                    </h2>
                    <Link
                        href="/admin/products/new"
                        className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Product
                    </Link>
                </div>

                {productsLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className={!product.active ? 'bg-gray-50' : ''}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {product.image && (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                )}
                                                <span className="font-semibold text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">${product.price.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${product.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                                                {product.active ? 'Active' : 'Hidden'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => toggleProductActive(product)}
                                                    className="p-2 hover:bg-gray-200 rounded text-gray-700"
                                                    title={product.active ? 'Hide' : 'Show'}
                                                >
                                                    {product.active ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                                <Link
                                                    href={`/admin/products/${product.id}`}
                                                    className="p-2 hover:bg-blue-100 rounded text-blue-600"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteProduct(product)}
                                                    className="p-2 hover:bg-red-100 text-red-600 rounded"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
