'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Plus, ArrowLeft, Save, Loader2, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import MediaPicker from './MediaPicker';

interface Product {
    id?: string;
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

interface ProductEditorProps {
    product?: Product;
    isNew?: boolean;
}

const emptyProduct: Product = {
    name: '',
    price: 0,
    image: null,
    url: null,
    description: null,
    features: [],
    gallery: [],
    video_url: null,
    sort_order: 0,
    active: true,
};

export default function ProductEditor({ product: initialProduct, isNew = false }: ProductEditorProps) {
    const router = useRouter();
    const [product, setProduct] = useState<Product>(initialProduct || emptyProduct);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [newFeature, setNewFeature] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    
    // Media picker state
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [showGalleryPicker, setShowGalleryPicker] = useState(false);
    const [showVideoPicker, setShowVideoPicker] = useState(false);

    async function uploadFile(file: File, folder: string): Promise<string | null> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                return data.url;
            }
        } catch (err) {
            console.error('Upload failed:', err);
        }
        return null;
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const url = await uploadFile(file, 'images');
        if (url) {
            setProduct({ ...product, image: url });
        }
        setUploading(false);
    }

    async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newGallery = [...(product.gallery || [])];
        
        for (const file of Array.from(files)) {
            const url = await uploadFile(file, 'gallery');
            if (url) {
                newGallery.push(url);
            }
        }
        
        setProduct({ ...product, gallery: newGallery });
        setUploading(false);
    }

    async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const url = await uploadFile(file, 'videos');
        if (url) {
            setProduct({ ...product, video_url: url });
        }
        setUploading(false);
    }

    function addFeature() {
        if (!newFeature.trim()) return;
        setProduct({
            ...product,
            features: [...(product.features || []), newFeature.trim()],
        });
        setNewFeature('');
    }

    function removeFeature(index: number) {
        setProduct({
            ...product,
            features: product.features.filter((_, i) => i !== index),
        });
    }

    function removeGalleryImage(index: number) {
        setProduct({
            ...product,
            gallery: product.gallery.filter((_, i) => i !== index),
        });
    }

    async function handleSave() {
        if (!product.name || !product.price) {
            setError('Name and price are required');
            return;
        }

        setSaving(true);
        setError('');

        try {
            const url = isNew 
                ? '/api/admin/products'
                : `/api/admin/products/${product.id}`;
            
            const res = await fetch(url, {
                method: isNew ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to save');
            }
        } catch (err) {
            setError('Failed to save product');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-black text-white py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/admin" className="flex items-center gap-2 hover:text-gray-300">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Products
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {saving ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </header>

            <main className="container mx-auto py-8 px-6 max-w-4xl">
                <h1 className="text-2xl font-bold mb-8 text-gray-900">
                    {isNew ? 'Add New Product' : `Edit: ${product.name}`}
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Product Name *</label>
                                <input
                                    type="text"
                                    value={product.name}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Price *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2 text-gray-700">External URL (optional)</label>
                                <input
                                    type="url"
                                    value={product.url || ''}
                                    onChange={(e) => setProduct({ ...product, url: e.target.value || null })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900 placeholder-gray-400"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                                <textarea
                                    value={product.description || ''}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value || null })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                                    rows={4}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Sort Order</label>
                                <input
                                    type="number"
                                    value={product.sort_order}
                                    onChange={(e) => setProduct({ ...product, sort_order: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                                />
                            </div>
                            <div className="flex items-center gap-4 pt-8">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={product.active}
                                        onChange={(e) => setProduct({ ...product, active: e.target.checked })}
                                        className="w-5 h-5"
                                    />
                                    <span className="font-semibold text-gray-700">Active (visible on site)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Main Image</h2>
                        <div className="flex items-start gap-4 flex-wrap">
                            {product.image && (
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt="Product"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => setProduct({ ...product, image: null })}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-black transition-colors flex flex-col items-center gap-2 text-gray-700"
                                >
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <Upload className="w-6 h-6" />
                                    )}
                                    <span className="font-medium text-sm">{uploading ? 'Uploading...' : 'Upload New'}</span>
                                </button>
                                <button
                                    onClick={() => setShowImagePicker(true)}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-black transition-colors flex flex-col items-center gap-2 text-gray-700"
                                >
                                    <FolderOpen className="w-6 h-6" />
                                    <span className="font-medium text-sm">From Library</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Features</h2>
                        <div className="space-y-2 mb-4">
                            {product.features?.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                                    <span className="flex-1 text-gray-900">{feature}</span>
                                    <button
                                        onClick={() => removeFeature(i)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                placeholder="Add a feature..."
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900 placeholder-gray-400"
                            />
                            <button
                                onClick={addFeature}
                                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Gallery Images</h2>
                        <div className="flex flex-wrap gap-4 mb-4">
                            {product.gallery?.map((img, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={img}
                                        alt={`Gallery ${i + 1}`}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => removeGalleryImage(i)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <div className="flex gap-2">
                                <input
                                    ref={galleryInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleGalleryUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => galleryInputRef.current?.click()}
                                    disabled={uploading}
                                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-black transition-colors flex flex-col items-center justify-center text-gray-700"
                                    title="Upload new"
                                >
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5" />
                                            <span className="text-xs mt-1">Upload</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowGalleryPicker(true)}
                                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-black transition-colors flex flex-col items-center justify-center text-gray-700"
                                    title="Select from library"
                                >
                                    <FolderOpen className="w-5 h-5" />
                                    <span className="text-xs mt-1">Library</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Video */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Product Video</h2>
                        {product.video_url ? (
                            <div className="relative inline-block">
                                <video
                                    src={product.video_url}
                                    controls
                                    className="max-w-md rounded-lg"
                                />
                                <button
                                    onClick={() => setProduct({ ...product, video_url: null })}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    ref={videoInputRef}
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => videoInputRef.current?.click()}
                                    disabled={uploading}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-black transition-colors flex flex-col items-center gap-2 text-gray-700"
                                >
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <Upload className="w-6 h-6" />
                                    )}
                                    <span className="font-medium text-sm">{uploading ? 'Uploading...' : 'Upload New'}</span>
                                </button>
                                <button
                                    onClick={() => setShowVideoPicker(true)}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-black transition-colors flex flex-col items-center gap-2 text-gray-700"
                                >
                                    <FolderOpen className="w-6 h-6" />
                                    <span className="font-medium text-sm">From Library</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Media Pickers */}
            <MediaPicker
                isOpen={showImagePicker}
                onClose={() => setShowImagePicker(false)}
                onSelect={(url) => setProduct({ ...product, image: url })}
                type="image"
            />
            <MediaPicker
                isOpen={showGalleryPicker}
                onClose={() => setShowGalleryPicker(false)}
                onSelect={() => {}}
                onSelectMultiple={(urls) => setProduct({ ...product, gallery: [...(product.gallery || []), ...urls] })}
                type="image"
                multiple
            />
            <MediaPicker
                isOpen={showVideoPicker}
                onClose={() => setShowVideoPicker(false)}
                onSelect={(url) => setProduct({ ...product, video_url: url })}
                type="video"
            />
        </div>
    );
}
