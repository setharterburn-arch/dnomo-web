import { getAllProducts } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default async function AdminDashboard() {
    const products = await getAllProducts();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold uppercase tracking-tight">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-wider hover:bg-gray-800 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold uppercase text-gray-500">Image</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase text-gray-500">Name</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase text-gray-500">Price</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium">{product.name}</td>
                                <td className="px-6 py-4 text-gray-600">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button className="text-gray-400 hover:text-black transition-colors">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button className="text-red-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
