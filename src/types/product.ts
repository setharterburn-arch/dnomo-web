export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    url: string;
    description?: string;
    features?: string[];
    gallery?: string[];
}
