import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '@/types';
import { formatPrice } from '@/utils/format';

interface GameCardProps {
  game: Game;
  showProducts?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, showProducts = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <div 
      className="card cursor-pointer hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={handleClick}
    >
      {/* Изображение игры */}
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
        <img
          src={game.image_url}
          alt={game.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-game.jpg';
          }}
        />
        {game.is_popular && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Популярная
          </div>
        )}
      </div>

      {/* Информация об игре */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {game.name}
        </h3>
        
        {game.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {game.description}
          </p>
        )}

        {showProducts && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Товары от {formatPrice(100)} {/* Здесь можно добавить минимальную цену */}
            </span>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              Смотреть все
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard; 