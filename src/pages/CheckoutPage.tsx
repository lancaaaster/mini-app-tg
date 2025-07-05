import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { formatPrice } from '@/utils/format';
import { CreditCard, Wallet, ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, createOrder, clearCart } = useAppStore();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Банковская карта',
      icon: CreditCard,
      description: 'Visa, MasterCard, МИР'
    },
    {
      id: 'wallet',
      name: 'Электронный кошелек',
      icon: Wallet,
      description: 'ЮMoney, QIWI, WebMoney'
    }
  ];

  const handlePromoCodeApply = () => {
    if (promoCode.trim()) {
      // Здесь будет логика применения промокода
      toast.success('Промокод применен!');
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error('Корзина пуста');
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        payment_method: paymentMethod,
        promo_code: promoCode || null,
        total_amount: getCartTotal()
      };

      const order = await createOrder(orderData);
      
      if (order) {
        toast.success('Заказ успешно оформлен!');
        clearCart();
        navigate('/orders');
      } else {
        toast.error('Ошибка при оформлении заказа');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Ошибка при оформлении заказа');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Корзина пуста
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Добавьте товары в корзину для оформления заказа
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Кнопка назад */}
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Назад к корзине
      </button>

      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Оформление заказа
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Проверьте товары и выберите способ оплаты
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Левая колонка - Товары и настройки */}
        <div className="space-y-6">
          {/* Товары в заказе */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Товары в заказе
            </h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
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
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Количество: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Промокод */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Промокод
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Введите промокод"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handlePromoCodeApply}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Применить
              </button>
            </div>
          </div>

          {/* Способ оплаты */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Способ оплаты
            </h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {paymentMethod === method.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {method.description}
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Правая колонка - Итоги */}
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
                  <span>Итого к оплате:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              {isProcessing ? 'Оформление заказа...' : 'Оплатить заказ'}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Нажимая кнопку "Оплатить заказ", вы соглашаетесь с условиями использования
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 