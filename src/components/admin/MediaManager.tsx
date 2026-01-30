'use client';

import { useState, useEffect, useRef } from 'react';
import { Trash2, Upload, Image, Film, Loader2, X, FolderOpen } from 'lucide-react';

interface MediaFile {
    name: string;
    folder: string;
    size: number;
    created_at: string;
    url: string;
}

export default function MediaManager() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    async function fetchFiles() {
        try {
            const res = await fetch('/api/admin/media');
            if (res.ok) {
                const data = await res.json();
                setFiles(data.files);
            }
        } catch (err) {
            setError('Failed to load media');
        } finally {
            setLoading(false);
        }
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const uploadFiles = e.target.files;
        if (!uploadFiles || uploadFiles.length === 0) return;

        setUploading(true);
        setError('');

        for (const file of Array.from(uploadFiles)) {
            const formData = new FormData();
            formData.append('file', file);
            
            // Determine folder based on file type
            const folder = file.type.startsWith('video/') ? 'videos' : 'images';
            formData.append('folder', folder);

            try {
                const res = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (!res.ok) {
                    throw new Error('Upload failed');
                }
            } catch (err) {
                setError(`Failed to upload ${file.name}`);
            }
        }

        setUploading(false);
        fetchFiles(); // Refresh the list
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    async function handleDelete(file: MediaFile) {
        if (!confirm(`Delete ${file.name}? This cannot be undone.`)) return;

        setDeleting(`${file.folder}/${file.name}`);
        
        try {
            const res = await fetch('/api/admin/media', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: `${file.folder}/${file.name}` }),
            });
            
            if (res.ok) {
                setFiles(files.filter(f => f.url !== file.url));
            } else {
                setError('Failed to delete file');
            }
        } catch (err) {
            setError('Failed to delete file');
        } finally {
            setDeleting(null);
        }
    }

    function formatSize(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    function formatDate(dateStr: string): string {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    const filteredFiles = filter === 'all' 
        ? files 
        : files.filter(f => f.folder === filter);

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);

    return (
        <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Media Library</h2>
                    <p className="text-sm text-gray-500">
                        {files.length} files • {formatSize(totalSize)} total
                    </p>
                </div>
                <div className="flex gap-2">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleUpload}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 flex items-center gap-2 disabled:opacity-50"
                    >
                        {uploading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Upload className="w-4 h-4" />
                        )}
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b flex gap-2">
                {['all', 'images', 'gallery', 'videos'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            filter === f
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Error */}
            {error && (
                <div className="p-4 bg-red-50 text-red-700 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError('')}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Content */}
            <div className="p-4">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                ) : filteredFiles.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No files found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredFiles.map((file) => (
                            <div
                                key={file.url}
                                className="group relative bg-gray-50 rounded-lg overflow-hidden border hover:border-gray-300 transition-colors"
                            >
                                {/* Preview */}
                                <div className="aspect-square relative">
                                    {file.folder === 'videos' ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                            <Film className="w-8 h-8 text-gray-400" />
                                        </div>
                                    ) : (
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                    
                                    {/* Delete button */}
                                    <button
                                        onClick={() => handleDelete(file)}
                                        disabled={deleting === `${file.folder}/${file.name}`}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                                    >
                                        {deleting === `${file.folder}/${file.name}` ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                {/* Info */}
                                <div className="p-2">
                                    <p className="text-xs font-medium text-gray-900 truncate" title={file.name}>
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatSize(file.size)} • {file.folder}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
