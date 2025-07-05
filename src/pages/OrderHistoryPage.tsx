import React, { useEffect } from 'react';
import { useAppStore } from '@/store';
import { formatPrice, formatDate, formatOrderStatus, getStatusColor } from '@/utils/format';
import { EmptyState, EmptyStateIcons } from '@/components/EmptyState';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const OrderHistoryPage: React.FC = () => {
  const { orders, fetchOrders } = useAppStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          История заказов
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Все ваши заказы и их статусы
        </p>
      </div>

      {/* Список заказов */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              {/* Заголовок заказа */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Заказ #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(order.total_price)}
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {formatOrderStatus(order.status)}
                  </span>
                </div>
              </div>

              {/* Детали заказа */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Способ оплаты:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {order.payment_method === 'card' ? 'Банковская карта' : 'Электронный кошелек'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Статус оплаты:</span>
                    <span className={`ml-2 ${getStatusColor(order.payment_status)}`}>
                      {order.payment_status === 'paid' ? 'Оплачен' : 
                       order.payment_status === 'pending' ? 'Ожидает оплаты' : 'Ошибка оплаты'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Количество товаров:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {order.quantity}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Обновлен:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {formatDate(order.updated_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Прогресс выполнения */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Прогресс выполнения</span>
                  <span>{Math.round((order.status === 'completed' ? 100 : 
                                     order.status === 'processing' ? 50 : 
                                     order.status === 'pending' ? 25 : 0))}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${order.status === 'completed' ? 100 : 
                              order.status === 'processing' ? 50 : 
                              order.status === 'pending' ? 25 : 0}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Заказ создан</span>
                  <span>В обработке</span>
                  <span>Выполнен</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Пока что тут пусто"
          description="У вас пока нет заказов. Сделайте первый заказ!"
          icon={EmptyStateIcons.orders}
        />
      )}
    </div>
  );
};

export default OrderHistoryPage; 