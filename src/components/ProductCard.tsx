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
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showAddToCart = true 
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
    <div className="card cursor-pointer hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Изображение товара */}
      <div 
        className="relative aspect-square bg-gray-200 dark:bg-gray-700"
        onClick={handleCardClick}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-product.jpg';
          }}
        />
        {!product.is_available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Нет в наличии</span>
          </div>
        )}
      </div>

      {/* Информация о товаре */}
      <div className="p-4">
        <h3 
          className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2"
          onClick={handleCardClick}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Рейтинг */}
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {formatRating(product.rating)} ({formatReviewsCount(product.reviews_count)})
          </span>
        </div>

        {/* Цена и кнопка */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
          </div>
          
          {showAddToCart && product.is_available && (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Купить</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 