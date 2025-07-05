import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  title?: string;
  variant?: 'horizontal' | 'vertical';
  showViewAll?: boolean;
  onViewAll?: () => void;
  maxItems?: number;
  className?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  title,
  variant = 'vertical',
  showViewAll = false,
  onViewAll,
  maxItems,
  className = ''
}) => {
  const displayProducts = maxItems ? products.slice(0, maxItems) : products;

  if (variant === 'horizontal') {
    return (
      <div className={className}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            {showViewAll && onViewAll && (
              <button
                onClick={onViewAll}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Все товары →
              </button>
            )}
          </div>
        )}
        
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {displayProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard product={product} variant="horizontal" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          {showViewAll && onViewAll && (
            <button
              onClick={onViewAll}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Все товары →
            </button>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} variant="vertical" />
        ))}
      </div>
    </div>
  );
};

export default ProductList; 