'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, FolderOpen, Check } from 'lucide-react';

interface MediaFile {
    name: string;
    folder: string;
    size: number;
    url: string;
}

interface MediaPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    type?: 'image' | 'video' | 'all';
    multiple?: boolean;
    onSelectMultiple?: (urls: string[]) => void;
}

export default function MediaPicker({ 
    isOpen, 
    onClose, 
    onSelect, 
    type = 'image',
    multiple = false,
    onSelectMultiple
}: MediaPickerProps) {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchFiles();
            setSelected([]);
        }
    }, [isOpen]);

    async function fetchFiles() {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/media');
            if (res.ok) {
                const data = await res.json();
                setFiles(data.files);
            }
        } catch (err) {
            console.error('Failed to load media:', err);
        } finally {
            setLoading(false);
        }
    }

    const filteredFiles = files.filter(f => {
        if (type === 'all') return true;
        if (type === 'video') return f.folder === 'videos';
        return f.folder === 'images' || f.folder === 'gallery';
    });

    function handleSelect(url: string) {
        if (multiple) {
            setSelected(prev => 
                prev.includes(url) 
                    ? prev.filter(u => u !== url)
                    : [...prev, url]
            );
        } else {
            onSelect(url);
            onClose();
        }
    }

    function handleConfirmMultiple() {
        if (onSelectMultiple && selected.length > 0) {
            onSelectMultiple(selected);
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">
                        Select from Media Library
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        </div>
                    ) : filteredFiles.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No media files found</p>
                            <p className="text-sm">Upload some files first</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {filteredFiles.map((file) => {
                                const isSelected = selected.includes(file.url);
                                return (
                                    <button
                                        key={file.url}
                                        onClick={() => handleSelect(file.url)}
                                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                            isSelected 
                                                ? 'border-black ring-2 ring-black ring-offset-2' 
                                                : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                    >
                                        {file.folder === 'videos' ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                                <span className="text-2xl">🎬</span>
                                            </div>
                                        ) : (
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        )}
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="bg-white rounded-full p-1">
                                                    <Check className="w-5 h-5 text-black" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {multiple && (
                    <div className="p-4 border-t flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                            {selected.length} selected
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmMultiple}
                                disabled={selected.length === 0}
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                            >
                                Add Selected
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
