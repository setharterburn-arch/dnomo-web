export interface Product {
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
    created_at: string;
    updated_at: string;
}
