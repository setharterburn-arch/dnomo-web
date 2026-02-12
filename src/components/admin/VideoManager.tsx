'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Video, X, Save } from 'lucide-react';
import MediaPicker from './MediaPicker';

interface VideoItem {
    id: string;
    title: string;
    description: string | null;
    video_url: string;
    thumbnail_url: string | null;
    category: 'testimonial' | 'demo' | 'review';
    sort_order: number;
    active: boolean;
}

const emptyVideo: Omit<VideoItem, 'id'> = {
    title: '',
    description: null,
    video_url: '',
    thumbnail_url: null,
    category: 'testimonial',
    sort_order: 0,
    active: true,
};

export default function VideoManager() {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingVideo, setEditingVideo] = useState<Partial<VideoItem> | null>(null);
    const [showMediaPicker, setShowMediaPicker] = useState<'video' | 'thumbnail' | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, []);

    async function fetchVideos() {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/videos');
            if (res.ok) {
                const data = await res.json();
                setVideos(data);
            }
        } catch (err) {
            console.error('Failed to fetch videos:', err);
        } finally {
            setLoading(false);
        }
    }

    async function saveVideo() {
        if (!editingVideo?.title || !editingVideo?.video_url) {
            alert('Title and video URL are required');
            return;
        }

        setSaving(true);
        try {
            const isNew = !editingVideo.id;
            const res = await fetch(
                isNew ? '/api/admin/videos' : `/api/admin/videos/${editingVideo.id}`,
                {
                    method: isNew ? 'POST' : 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingVideo),
                }
            );

            if (res.ok) {
                setEditingVideo(null);
                fetchVideos();
            } else {
                alert('Failed to save video');
            }
        } catch (err) {
            console.error('Failed to save video:', err);
            alert('Failed to save video');
        } finally {
            setSaving(false);
        }
    }

    async function toggleVideoActive(video: VideoItem) {
        try {
            const res = await fetch(`/api/admin/videos/${video.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: !video.active }),
            });
            if (res.ok) {
                fetchVideos();
            }
        } catch (err) {
            console.error('Failed to update video:', err);
        }
    }

    async function deleteVideo(video: VideoItem) {
        if (!confirm(`Are you sure you want to delete "${video.title}"?`)) {
            return;
        }
        try {
            const res = await fetch(`/api/admin/videos/${video.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchVideos();
            }
        } catch (err) {
            console.error('Failed to delete video:', err);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                    <Video className="w-6 h-6" />
                    Videos & Testimonials
                </h2>
                <button
                    onClick={() => setEditingVideo({ ...emptyVideo })}
                    className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Video
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
            ) : videos.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 mb-4">No videos yet</p>
                    <button
                        onClick={() => setEditingVideo({ ...emptyVideo })}
                        className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800"
                    >
                        Add Your First Video
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Video</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {videos.map((video) => (
                                <tr key={video.id} className={!video.active ? 'bg-gray-50' : ''}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {video.thumbnail_url ? (
                                                <img
                                                    src={video.thumbnail_url}
                                                    alt={video.title}
                                                    className="w-20 h-12 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
                                                    <Video className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="font-semibold text-gray-900 block">{video.title}</span>
                                                {video.description && (
                                                    <span className="text-sm text-gray-500 line-clamp-1">{video.description}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-800 capitalize">
                                            {video.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${video.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                                            {video.active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleVideoActive(video)}
                                                className="p-2 hover:bg-gray-200 rounded text-gray-700"
                                                title={video.active ? 'Hide' : 'Show'}
                                            >
                                                {video.active ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => setEditingVideo(video)}
                                                className="p-2 hover:bg-blue-100 rounded text-blue-600"
                                                title="Edit"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => deleteVideo(video)}
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

            {/* Edit/Add Modal */}
            {editingVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingVideo.id ? 'Edit Video' : 'Add New Video'}
                            </h3>
                            <button onClick={() => setEditingVideo(null)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Title *</label>
                                <input
                                    type="text"
                                    value={editingVideo.title || ''}
                                    onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                                    placeholder="Video title"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                                <textarea
                                    value={editingVideo.description || ''}
                                    onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                                    rows={3}
                                    placeholder="Optional description"
                                />
                            </div>

                            {/* Video URL */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Video *</label>
                                {editingVideo.video_url ? (
                                    <div className="relative">
                                        <video
                                            src={editingVideo.video_url}
                                            controls
                                            className="w-full rounded-lg bg-black"
                                        />
                                        <button
                                            onClick={() => setEditingVideo({ ...editingVideo, video_url: '' })}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowMediaPicker('video')}
                                        className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-black hover:text-black transition-colors"
                                    >
                                        <Video className="w-8 h-8 mx-auto mb-2" />
                                        Click to select video
                                    </button>
                                )}
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Thumbnail (optional)</label>
                                {editingVideo.thumbnail_url ? (
                                    <div className="relative inline-block">
                                        <img
                                            src={editingVideo.thumbnail_url}
                                            alt="Thumbnail"
                                            className="w-40 h-24 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => setEditingVideo({ ...editingVideo, thumbnail_url: null })}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowMediaPicker('thumbnail')}
                                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-black hover:text-black transition-colors"
                                    >
                                        Click to select thumbnail
                                    </button>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                                <select
                                    value={editingVideo.category || 'testimonial'}
                                    onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value as VideoItem['category'] })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                                >
                                    <option value="testimonial">Testimonial</option>
                                    <option value="demo">Demo</option>
                                    <option value="review">Review</option>
                                </select>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Sort Order</label>
                                <input
                                    type="number"
                                    value={editingVideo.sort_order || 0}
                                    onChange={(e) => setEditingVideo({ ...editingVideo, sort_order: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 p-6 border-t">
                            <button
                                onClick={() => setEditingVideo(null)}
                                className="px-6 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveVideo}
                                disabled={saving}
                                className="px-6 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                {saving ? 'Saving...' : 'Save Video'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Media Picker Modal */}
            {showMediaPicker && (
                <MediaPicker
                    onSelect={(url) => {
                        if (showMediaPicker === 'video') {
                            setEditingVideo({ ...editingVideo, video_url: url });
                        } else {
                            setEditingVideo({ ...editingVideo, thumbnail_url: url });
                        }
                        setShowMediaPicker(null);
                    }}
                    onClose={() => setShowMediaPicker(null)}
                    type={showMediaPicker === 'video' ? 'video' : 'image'}
                />
            )}
        </div>
    );
}
