import pg from 'pg';
import { Product } from '@/types/product';
import { unstable_noStore as noStore } from 'next/cache';

const { Pool } = pg;

// Lazy initialization to prevent module-load crashes
let pool: pg.Pool | null = null;

function getPool() {
    if (!pool) {
        if (!process.env.POSTGRES_URL) {
            throw new Error('POSTGRES_URL is missing in environment variables');
        }
        pool = new Pool({
            connectionString: process.env.POSTGRES_URL,
            ssl: { rejectUnauthorized: false }
        });
    }
    return pool;
}

export async function getAllProducts(): Promise<Product[]> {
    noStore();
    const { rows } = await getPool().query<Product>('SELECT * FROM products ORDER BY created_at DESC');
    // Ensure features/gallery are arrays (Postgres returns them as JSON)
    return rows.map(r => ({ ...r, features: r.features || [], gallery: r.gallery || [] }));
}

export async function getProductById(id: string): Promise<Product | undefined> {
    noStore();
    const { rows } = await getPool().query<Product>('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) return undefined;
    const r = rows[0];
    return { ...r, features: r.features || [], gallery: r.gallery || [] };
}

export async function createProduct(product: Product): Promise<void> {
    noStore();
    await getPool().query(
        `INSERT INTO products (id, name, price, image, url, description, features, gallery)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
            product.id,
            product.name,
            product.price,
            product.image,
            product.url,
            product.description,
            JSON.stringify(product.features),
            JSON.stringify(product.gallery)
        ]
    );
}

export async function deleteProduct(id: string): Promise<void> {
    noStore();
    await getPool().query('DELETE FROM products WHERE id = $1', [id]);
}
