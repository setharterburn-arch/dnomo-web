import { supabase } from './supabase';
import { Product } from '@/types/product';

export async function getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });
    
    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    
    return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('active', true)
        .single();
    
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }
    
    return data;
}
