import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid, ShoppingCart, User } from 'lucide-react';
import { useAppStore } from '@/store';

const navItems = [
  {
    label: 'Главная',
    icon: <Home className="w-6 h-6" />,
    path: '/',
  },
  {
    label: 'Каталог',
    icon: <Grid className="w-6 h-6" />,
    path: '/games',
  },
  {
    label: 'Корзина',
    icon: <ShoppingCart className="w-6 h-6" />,
    path: '/cart',
  },
  {
    label: 'Профиль',
    icon: <User className="w-6 h-6" />,
    path: '/profile',
  },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useAppStore();
  const cartItemCount = getCartItemCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg flex justify-around items-center h-16 md:hidden">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        const isCart = item.path === '/cart';
        
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors relative ${
              isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <div className="relative">
              {item.icon}
              {isCart && cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav; 