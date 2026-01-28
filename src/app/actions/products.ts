'use server';

import { createProduct, deleteProduct } from '@/lib/products';
import { Product } from '@/types/product';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProductAction(formData: FormData) {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const image = formData.get('image') as string; // URL from blob
    const description = formData.get('description') as string;
    const features = (formData.get('features') as string).split('\n').filter(Boolean);

    // Generate a simple ID from name
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const product: Product = {
        id,
        name,
        price,
        image,
        url: '', // optional
        description,
        features,
        gallery: []
    };

    await createProduct(product);
    revalidatePath('/admin');
    revalidatePath('/');
    redirect('/admin');
}

export async function deleteProductAction(id: string) {
    await deleteProduct(id);
    revalidatePath('/admin');
    revalidatePath('/');
}
