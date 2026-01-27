import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
    );
}
