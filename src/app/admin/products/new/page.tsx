'use client';

import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { createProductAction } from '@/app/actions/products';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2, Upload } from 'lucide-react';

export default function NewProductPage() {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });
            setImageUrl(newBlob.url);
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        if (!imageUrl) {
            alert('Please upload an image first');
            return;
        }
        setSaving(true);
        formData.set('image', imageUrl);
        await createProductAction(formData);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin" className="flex items-center text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">Add New Product</h1>

            <form action={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow">
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2">Product Image</label>
                    <div className="flex gap-6 items-start">
                        <div
                            className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-black transition-colors relative overflow-hidden"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imageUrl ? (
                                <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                            ) : (
                                <Upload className="w-8 h-8 text-gray-400" />
                            )}
                        </div>

                        <div className="flex-1">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-black text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wide hover:bg-gray-800"
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</span>
                                ) : 'Select Image'}
                            </button>
                            <p className="text-xs text-gray-500 mt-2">Recommended: 1000x1000px, JPG or PNG.</p>
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">Name</label>
                        <input name="name" required className="w-full border p-3 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. Magic Wallet" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">Price ($)</label>
                        <input name="price" type="number" step="0.01" required className="w-full border p-3 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" placeholder="0.00" />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2">Description</label>
                    <textarea name="description" rows={4} className="w-full border p-3 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Product details..." />
                </div>

                {/* Features */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2">Features (One per line)</label>
                    <textarea name="features" rows={4} className="w-full border p-3 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Magnetic Grip&#10;RFID Blocking&#10;..." />
                </div>

                <button
                    type="submit"
                    disabled={saving || !imageUrl}
                    className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {saving ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
}
