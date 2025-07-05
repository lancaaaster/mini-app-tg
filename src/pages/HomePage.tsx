import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import GameCard from '@/components/GameCard';
import ProductCard from '@/components/ProductCard';
import ProductList from '@/components/ProductList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EmptyState, EmptyStateIcons } from '@/components/EmptyState';
import { ArrowRight, Star, TrendingUp, Fire, Zap } from 'lucide-react';
import Banner from '@/components/Banner';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    popularGames, 
    products, 
    isLoading, 
    fetchPopularGames, 
    fetchProducts 
  } = useAppStore();

  useEffect(() => {
    fetchPopularGames();
    // Загружаем товары для первой популярной игры
    if (popularGames.length > 0) {
      fetchProducts(popularGames[0].id, { limit: 6 });
    }
  }, []);

  const handleViewAllGames = () => {
    navigate('/games');
  };

  const handleViewAllProducts = () => {
    if (popularGames.length > 0) {
      navigate(`/games/${popularGames[0].id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Баннер */}
      <Banner
        image=""
        title="Brawl Pass на EasyDonate!"
        subtitle="Покупайте донат для любимых игр быстро и безопасно"
        buttonText="Купить"
        onButtonClick={() => navigate('/games')}
      />

      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Добро пожаловать в Game Donate Shop
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Покупайте донат для любимых игр быстро и безопасно
        </p>
      </div>

      {/* Популярные игры */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Популярные игры
            </h2>
          </div>
          <button
            onClick={handleViewAllGames}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Все игры</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {popularGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularGames.slice(0, 4).map((game) => (
              <GameCard key={game.id} game={game} showProducts={true} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Пока что тут пусто"
            description="Популярные игры появятся здесь, как только они будут добавлены"
            icon={EmptyStateIcons.games}
          />
        )}
      </section>

      {/* Горячие предложения - горизонтальный список */}
      <section className="mb-12">
        <ProductList
          products={products.slice(0, 6)}
          title="🔥 Горячие предложения"
          variant="horizontal"
          showViewAll={true}
          onViewAll={handleViewAllProducts}
          maxItems={6}
        />
      </section>

      {/* Популярные товары - вертикальная сетка */}
      <section className="mb-12">
        <ProductList
          products={products.slice(0, 8)}
          title="⭐ Популярные товары"
          variant="vertical"
          showViewAll={true}
          onViewAll={handleViewAllProducts}
          maxItems={8}
        />
      </section>

      {/* Новинки - горизонтальный список */}
      <section className="mb-12">
        <ProductList
          products={products.slice(0, 4)}
          title="⚡ Новинки"
          variant="horizontal"
          showViewAll={true}
          onViewAll={handleViewAllProducts}
          maxItems={4}
        />
      </section>

      {/* Преимущества */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Почему выбирают нас?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Безопасность
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Все платежи защищены и обрабатываются безопасно
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Быстрая доставка
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Мгновенная доставка товаров после оплаты
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              24/7 Поддержка
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Круглосуточная поддержка для решения любых вопросов
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 