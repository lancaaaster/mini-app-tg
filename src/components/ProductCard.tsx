import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { formatPrice, formatRating, formatReviewsCount } from '@/utils/format';
import { Star, ShoppingCart } from 'lucide-react';
import { useAppStore } from '@/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  horizontal?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showAddToCart = true,
  horizontal = false,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useAppStore();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success('Товар добавлен в корзину');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
      );
    }

    return stars;
  };

  return (
    <div
      className={`${
        horizontal
          ? 'flex flex-row w-72 h-32'
          : 'flex flex-col w-full h-64'
      } bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden mb-4 transition hover:shadow-lg`}
    >
      <div className={horizontal ? 'w-1/3 h-full' : 'w-full h-2/5'}>
        {product.image_url ? (
          <div className={`${horizontal ? 'w-full h-full' : 'w-full h-2/5'}`}>
            <img
              src={product.image_url}
              alt={product.name}
              className="object-cover w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-product.jpg';
              }}
            />
            {product.is_popular && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Популярный
              </div>
            )}
          </div>
        ) : (
          <div className={`${horizontal ? 'w-full h-full' : 'w-full h-2/5'} bg-gradient-to-br from-green-200 to-blue-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center`}>
            <span className="text-base font-bold text-gray-700 dark:text-white text-center px-2 line-clamp-2">{product.name}</span>
          </div>
        )}
        {!product.is_available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className={`flex flex-col justify-between p-4 ${horizontal ? 'w-2/3' : 'flex-1'}`}>
        <div>
          <h3 
            className="text-base font-semibold text-gray-900 dark:text-white truncate mb-1"
            onClick={handleCardClick}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            {renderStars(product.rating)}
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              {formatRating(product.rating)} ({formatReviewsCount(product.reviews_count)})
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(product.price)}
          </span>
          {showAddToCart && product.is_available && (
            <button
              onClick={handleAddToCart}
              className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors"
            >
              Купить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 