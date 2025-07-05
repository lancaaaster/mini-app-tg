import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { Moon, Sun, Home, Gamepad2, ShoppingCart, User, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, getCartItemCount, user } = useAppStore();

  const navigation = [
    { name: 'Главная', href: '/', icon: Home },
    { name: 'Игры', href: '/games', icon: Gamepad2 },
    { name: 'Корзина', href: '/cart', icon: ShoppingCart },
    { name: 'Профиль', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Верхняя панель */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Логотип и название */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Game Donate Shop
              </h1>
            </div>

            {/* Переключатель темы */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Переключить тему"
            >
              {theme.mode === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-1">
        {children}
      </main>

      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const isCart = item.href === '/cart';
              const cartCount = getCartItemCount();

              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    active
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                    {isCart && cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs mt-1">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Отступ для нижней навигации */}
      <div className="h-20" />
    </div>
  );
};

export default Layout; 