import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid, MessageCircle, User } from 'lucide-react';

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
    label: 'Чаты',
    icon: <MessageCircle className="w-6 h-6" />,
    path: '/chats',
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

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg flex justify-around items-center h-16 md:hidden">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav; 