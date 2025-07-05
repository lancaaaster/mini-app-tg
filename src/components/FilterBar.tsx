import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  gameId: string;
}

interface FilterBarProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (categoryId: string | undefined) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  className = ''
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId === selectedCategory ? undefined : categoryId);
    setIsCategoryOpen(false);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? 0 : parseInt(value);
    onPriceRangeChange({
      ...priceRange,
      [type]: numValue
    });
  };

  const hasActiveFilters = selectedCategory || priceRange.min > 0 || priceRange.max > 0;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="font-semibold text-gray-900 dark:text-white">Фильтры</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <X className="w-4 h-4" />
            Очистить
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Категории */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-gray-900 dark:text-white">
              {selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name || 'Категория'
                : 'Все категории'
              }
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCategoryOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              <button
                onClick={() => handleCategorySelect('')}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  !selectedCategory ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                }`}
              >
                Все категории
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedCategory === category.id ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ценовой диапазон */}
        <div className="relative">
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-gray-900 dark:text-white">
              Цена: {priceRange.min > 0 || priceRange.max > 0 
                ? `${priceRange.min > 0 ? priceRange.min + '₽' : '0₽'} - ${priceRange.max > 0 ? priceRange.max + '₽' : '∞'}`
                : 'Любая цена'
              }
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
          </button>

          {isPriceOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    От (₽)
                  </label>
                  <input
                    type="number"
                    value={priceRange.min || ''}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    До (₽)
                  </label>
                  <input
                    type="number"
                    value={priceRange.max || ''}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    placeholder="∞"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 