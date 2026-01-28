import { sql } from '@vercel/postgres';
import { Product } from '@/types/product';
import { unstable_noStore as noStore } from 'next/cache';

export async function getAllProducts(): Promise<Product[]> {
    noStore();
    const { rows } = await sql<Product>`SELECT * FROM products ORDER BY created_at DESC`;
    // Ensure features/gallery are arrays (Postgres returns them as JSON)
    return rows.map(r => ({ ...r, features: r.features || [], gallery: r.gallery || [] }));
}

export async function getProductById(id: string): Promise<Product | undefined> {
    noStore();
    const { rows } = await sql<Product>`SELECT * FROM products WHERE id = ${id}`;
    if (rows.length === 0) return undefined;
    const r = rows[0];
    return { ...r, features: r.features || [], gallery: r.gallery || [] };
}
