import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { formatPrice, formatDate } from '@/utils/format';
import { 
  User, 
  CreditCard, 
  History, 
  Settings, 
  LogOut, 
  Plus, 
  Gift, 
  Shield, 
  Bell, 
  Moon, 
  Sun,
  Edit,
  Camera,
  Wallet,
  Star,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, logout, fetchOrders, orders } = useAppStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'balance' | 'orders' | 'settings'>('profile');
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

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
      {/* Профиль пользователя */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                {user?.photo_url ? (
                  <img
                    src={user.photo_url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white/80" />
                  </div>
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-3 h-3 text-blue-600" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-white/80">
                @{user?.username || 'username'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-sm">VIP Пользователь</span>
              </div>
            </div>
          </div>
          <button className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Edit className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-sm text-white/80">Заказов</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-white/80">Отзывов</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-white/80">Дней</div>
          </div>
        </div>
      </div>

      {/* Информация о пользователе */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Личная информация
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Имя
            </label>
            <input
              type="text"
              value={user?.first_name || ''}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Фамилия
            </label>
            <input
              type="text"
              value={user?.last_name || ''}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Промокод */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-green-600" />
          Промокод
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Введите промокод для получения скидки"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <button
            onClick={handlePromoCodeApply}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
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
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white/80">Текущий баланс</h3>
              <div className="text-3xl font-bold">
                {formatPrice(user?.balance || 0)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/80">Последнее пополнение</div>
            <div className="text-sm font-medium">2 дня назад</div>
          </div>
        </div>
        
        <button
          onClick={handleTopUpBalance}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Пополнить баланс
        </button>
      </div>

      {/* Способы пополнения */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          Способы пополнения
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Банковская карта</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Visa, MasterCard, МИР</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Комиссия: 2.5%
            </div>
          </div>
          
          <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-green-300 dark:hover:border-green-600 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <Wallet className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Электронный кошелек</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">ЮMoney, QIWI, WebMoney</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Комиссия: 1.5%
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-600" />
          Статистика пополнений
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">₽15,420</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Всего пополнено</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">₽2,180</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Потрачено</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">₽1,250</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Сэкономлено</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          История заказов
        </h3>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 border-2 border-gray-100 dark:border-gray-600 rounded-xl hover:border-blue-200 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Заказ #{order.id}
                      </span>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    order.status === 'pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {order.status === 'completed' ? '✅ Выполнен' :
                     order.status === 'processing' ? '⏳ В обработке' :
                     order.status === 'pending' ? '💳 Ожидает оплаты' : '❌ Отменен'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Товары: {order.items?.length || 0} шт.</p>
                    <p>Способ оплаты: Баланс</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPrice(order.total_price)}
                    </div>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              История заказов пуста
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              У вас пока нет заказов. Сделайте первый заказ и он появится здесь!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Перейти к покупкам
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Настройки приложения */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Настройки приложения
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Уведомления</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Получать уведомления о заказах</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <Sun className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Темная тема</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Переключить темную тему</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Безопасность */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Безопасность
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Двухфакторная аутентификация</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Дополнительная защита аккаунта</p>
              </div>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              Настроить
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Способы оплаты</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Управление картами и кошельками</p>
              </div>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              Управлять
            </button>
          </div>
        </div>
      </div>

      {/* Аккаунт */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-red-600" />
          Аккаунт
        </h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-left">
                <span className="font-medium text-red-600 dark:text-red-400">Выйти из аккаунта</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Завершить текущую сессию</p>
              </div>
            </div>
            <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
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