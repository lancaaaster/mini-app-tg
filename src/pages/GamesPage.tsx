import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import GameCard from '@/components/GameCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EmptyState, EmptyStateIcons } from '@/components/EmptyState';
import { Grid, List, Filter } from 'lucide-react';

const GamesPage: React.FC = () => {
  const { games, isLoading, fetchGames } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    let filtered = games.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (game.description && game.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Фильтрация по категории (если есть)
    if (selectedCategory) {
      filtered = filtered.filter(game => game.categoryId === selectedCategory);
    }

    // Фильтрация по цене (если есть товары с ценами)
    if (priceRange.min > 0 || priceRange.max > 0) {
      filtered = filtered.filter(game => {
        // Здесь можно добавить логику фильтрации по цене товаров игры
        return true; // Пока пропускаем все
      });
    }

    setFilteredGames(filtered);
  }, [games, searchTerm, selectedCategory, priceRange]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Каталог игр
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Выберите игру и найдите нужные товары
        </p>
      </div>

      {/* Поиск */}
      <div className="mb-6">
        <SearchBar
          placeholder="Поиск игр..."
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={setSearchTerm}
        />
      </div>

      {/* Панель инструментов */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters
                ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Фильтры</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Фильтры */}
      {showFilters && (
        <div className="mb-6">
          <FilterBar
            categories={[]} // TODO: Добавить категории из store
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onClearFilters={() => {
              setSelectedCategory(undefined);
              setPriceRange({ min: 0, max: 0 });
            }}
          />
        </div>
      )}

      {/* Результаты поиска */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Найдено игр: {filteredGames.length}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Очистить поиск
            </button>
          )}
        </div>
      </div>

      {/* Список игр */}
      {filteredGames.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {filteredGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              showProducts={true}
              variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          {searchTerm ? (
            <EmptyState
              title="Ничего не найдено"
              description={`По запросу "${searchTerm}" ничего не найдено. Попробуйте изменить поисковый запрос.`}
              icon={EmptyStateIcons.search}
              action={
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Показать все игры
                </button>
              }
            />
          ) : (
            <EmptyState
              title="Пока что тут пусто"
              description="Игры появятся здесь, как только они будут добавлены администратором"
              icon={EmptyStateIcons.games}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GamesPage; 