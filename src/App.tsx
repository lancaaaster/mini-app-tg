import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { telegramApp } from '@/utils/telegram';
import { applyTheme } from '@/utils/theme';

// Компоненты страниц
import HomePage from '@/pages/HomePage';
import GamesPage from '@/pages/GamesPage';
import GameDetailsPage from '@/pages/GameDetailsPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import ProfilePage from '@/pages/ProfilePage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderHistoryPage from '@/pages/OrderHistoryPage';
import AdminPage from '@/pages/AdminPage';

// Компоненты
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import AuthGuard from '@/components/AuthGuard';
import AdminGuard from '@/components/AdminGuard';

function App() {
  const { 
    isAuthenticated, 
    isLoading, 
    theme, 
    authenticate, 
    fetchGames, 
    fetchPopularGames 
  } = useAppStore();

  useEffect(() => {
    // Инициализация Telegram Web App
    telegramApp.init();
    
    // Применяем тему
    applyTheme(theme);
    
    // Аутентификация при загрузке
    if (!isAuthenticated) {
      authenticate();
    }
  }, []);

  useEffect(() => {
    // Загружаем данные после аутентификации
    if (isAuthenticated) {
      fetchGames();
      fetchPopularGames();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          
          <Route path="/games" element={
            <Layout>
              <GamesPage />
            </Layout>
          } />
          
          <Route path="/games/:gameId" element={
            <Layout>
              <GameDetailsPage />
            </Layout>
          } />
          
          <Route path="/products/:productId" element={
            <Layout>
              <ProductDetailsPage />
            </Layout>
          } />

          {/* Защищенные маршруты */}
          <Route path="/profile" element={
            <AuthGuard>
              <Layout>
                <ProfilePage />
              </Layout>
            </AuthGuard>
          } />
          
          <Route path="/cart" element={
            <AuthGuard>
              <Layout>
                <CartPage />
              </Layout>
            </AuthGuard>
          } />
          
          <Route path="/checkout" element={
            <AuthGuard>
              <Layout>
                <CheckoutPage />
              </Layout>
            </AuthGuard>
          } />
          
          <Route path="/orders" element={
            <AuthGuard>
              <Layout>
                <OrderHistoryPage />
              </Layout>
            </AuthGuard>
          } />

          {/* Админ маршруты */}
          <Route path="/admin" element={
            <AdminGuard>
              <Layout>
                <AdminPage />
              </Layout>
            </AdminGuard>
          } />

          {/* Редирект для неизвестных маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 