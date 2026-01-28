import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { Client } = pg;

async function seed() {
  console.log('Connecting to database...');
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected!');

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image TEXT NOT NULL,
        url TEXT,
        description TEXT,
        features JSONB,
        gallery JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log(`Created "products" table`);

    const dataPath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    for (const product of products) {
      await client.query(`
        INSERT INTO products (id, name, price, image, url, description, features, gallery)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        image = EXCLUDED.image,
        url = EXCLUDED.url,
        description = EXCLUDED.description,
        features = EXCLUDED.features,
        gallery = EXCLUDED.gallery;
      `, [
        product.id,
        product.name,
        product.price,
        product.image,
        product.url,
        product.description,
        JSON.stringify(product.features || []),
        JSON.stringify(product.gallery || [])
      ]);
    }

    console.log(`Seeded ${products.length} products successfully!`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await client.end();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
