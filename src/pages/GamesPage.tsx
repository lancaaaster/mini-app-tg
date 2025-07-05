import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import GameCard from '@/components/GameCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EmptyState, EmptyStateIcons } from '@/components/EmptyState';
import { Search, Filter } from 'lucide-react';

const GamesPage: React.FC = () => {
  const { games, isLoading, fetchGames } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const filtered = games.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (game.description && game.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredGames(filtered);
  }, [games, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Все игры
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Выберите игру и найдите нужные товары
        </p>
      </div>

      {/* Поиск и фильтры */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск игр..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} showProducts={true} />
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