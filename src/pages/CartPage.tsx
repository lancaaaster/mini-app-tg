import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { formatPrice } from '@/utils/format';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart, 
    getCartTotal 
  } = useAppStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateCartItemQuantity(productId, newQuantity);
    } else if (newQuantity <= 0) {
      removeFromCart(productId);
      toast.success('Товар удален из корзины');
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    toast.success('Товар удален из корзины');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Корзина очищена');
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Корзина пуста
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Перейти к покупкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Корзина
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {cart.length} товар(ов) в корзине
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товаров */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Товары в корзине
                </h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Очистить корзину
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    {/* Изображение */}
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-product.jpg';
                        }}
                      />
                    </div>

                    {/* Информация о товаре */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {item.product.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(item.product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Количество */}
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-lg font-medium text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        disabled={item.quantity >= 99}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Итоговая цена за товар */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>

                    {/* Кнопка удаления */}
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Итоги */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Итого заказа
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Товары ({cart.length}):</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Скидка:</span>
                <span className="text-green-600">-{formatPrice(0)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Итого:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Оформить заказ
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full mt-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 