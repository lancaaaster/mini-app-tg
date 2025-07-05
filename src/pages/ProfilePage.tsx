import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { formatPrice, formatDate } from '@/utils/format';
import { User, CreditCard, History, Settings, LogOut, Plus, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, logout, fetchOrders, orders } = useAppStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'balance' | 'orders' | 'settings'>('profile');
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Вы вышли из аккаунта');
  };

  const handlePromoCodeApply = async () => {
    if (!promoCode.trim()) {
      toast.error('Введите промокод');
      return;
    }

    setIsLoading(true);
    try {
      // Здесь будет логика применения промокода
      toast.success('Промокод применен!');
      setPromoCode('');
    } catch (error) {
      toast.error('Ошибка при применении промокода');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopUpBalance = () => {
    // Здесь будет логика пополнения баланса
    toast.info('Функция пополнения баланса в разработке');
  };

  const tabs = [
    { id: 'profile', name: 'Профиль', icon: User },
    { id: 'balance', name: 'Баланс', icon: CreditCard },
    { id: 'orders', name: 'История', icon: History },
    { id: 'settings', name: 'Настройки', icon: Settings },
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Информация о пользователе */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Информация о пользователе
        </h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            {user?.photo_url ? (
              <img
                src={user.photo_url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              {user?.first_name} {user?.last_name}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              @{user?.username || 'username'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Имя
            </label>
            <input
              type="text"
              value={user?.first_name || ''}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Фамилия
            </label>
            <input
              type="text"
              value={user?.last_name || ''}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Промокод */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Промокод
        </h3>
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
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Gift className="w-4 h-4" />
            Применить
          </button>
        </div>
      </div>
    </div>
  );

  const renderBalanceTab = () => (
    <div className="space-y-6">
      {/* Текущий баланс */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Текущий баланс
        </h3>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {formatPrice(user?.balance || 0)}
          </div>
          <button
            onClick={handleTopUpBalance}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Пополнить баланс
          </button>
        </div>
      </div>

      {/* Способы пополнения */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Способы пополнения
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Банковская карта</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Visa, MasterCard, МИР</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Электронный кошелек</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">ЮMoney, QIWI, WebMoney</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          История заказов
        </h3>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Заказ #{order.id}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    order.status === 'pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {order.status === 'completed' ? 'Выполнен' :
                     order.status === 'processing' ? 'В обработке' :
                     order.status === 'pending' ? 'Ожидает оплаты' : 'Отменен'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Дата: {formatDate(order.created_at)}</p>
                  <p>Сумма: {formatPrice(order.total_price)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              У вас пока нет заказов
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Настройки
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">Уведомления</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">Темная тема</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Аккаунт
        </h3>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <LogOut className="w-5 h-5" />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Профиль
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Управление аккаунтом и настройками
        </p>
      </div>

      {/* Табы */}
      <div className="mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Контент табов */}
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'balance' && renderBalanceTab()}
      {activeTab === 'orders' && renderOrdersTab()}
      {activeTab === 'settings' && renderSettingsTab()}
    </div>
  );
};

export default ProfilePage; 