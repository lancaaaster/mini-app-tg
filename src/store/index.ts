import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Theme, Game, Product, CartItem, Order } from '@/types';
import { apiClient } from '@/utils/api';
import { telegramApp } from '@/utils/telegram';
import { getInitialTheme, applyTheme } from '@/utils/theme';

interface AppState {
  // Аутентификация
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Тема
  theme: Theme;
  
  // Данные
  games: Game[];
  popularGames: Game[];
  products: Product[];
  categories: any[];
  
  // Корзина
  cart: CartItem[];
  
  // Заказы
  orders: Order[];
  
  // Действия аутентификации
  authenticate: () => Promise<void>;
  logout: () => void;
  
  // Действия темы
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  
  // Действия данных
  fetchGames: () => Promise<void>;
  fetchPopularGames: () => Promise<void>;
  fetchProducts: (gameId: number, filters?: any) => Promise<void>;
  fetchCategories: (gameId: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
  
  // Действия корзины
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  // Действия заказов
  createOrder: (orderData: any) => Promise<Order | null>;
  
  // Утилиты
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Начальное состояние
      user: null,
      isAuthenticated: false,
      isLoading: false,
      theme: getInitialTheme(),
      games: [],
      popularGames: [],
      products: [],
      categories: [],
      cart: [],
      orders: [],

      // Аутентификация
      authenticate: async () => {
        set({ isLoading: true });
        console.log('AUTH START');
        try {
          // Для тестирования используем мок-данные
          const mockUser = {
            id: 123456789,
            first_name: 'Тестовый',
            last_name: 'Пользователь',
            username: 'test_user',
            photo_url: '', // убираем картинку
            balance: 1500,
            is_premium: false,
            language_code: 'ru',
          };

          // Имитируем задержку сети
          await new Promise(resolve => setTimeout(resolve, 500));

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
          console.log('AUTH END', get());
        } catch (error) {
          console.error('Authentication error:', error);
          set({ isAuthenticated: false, isLoading: false });
          console.log('AUTH ERROR', error);
        }
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        set({
          user: null,
          isAuthenticated: false,
          cart: [],
          orders: [],
        });
      },

      // Тема
      toggleTheme: () => {
        const { theme } = get();
        const newTheme: Theme = {
          mode: theme.mode === 'light' ? 'dark' : 'light'
        };
        
        set({ theme: newTheme });
        applyTheme(newTheme);
      },

      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },

      // Данные
      fetchGames: async () => {
        set({ isLoading: true });
        
        try {
          // Мок-данные для игр
          const mockGames = [
            {
              id: 1,
              name: 'Brawl Stars',
              description: 'Динамичная игра в жанре MOBA',
              image_url: '',
              is_popular: true,
              categoryId: 'action',
            },
            {
              id: 2,
              name: 'Clash Royale',
              description: 'Стратегическая карточная игра',
              image_url: '',
              is_popular: true,
              categoryId: 'strategy',
            },
            {
              id: 3,
              name: 'PUBG Mobile',
              description: 'Королевская битва на мобильных устройствах',
              image_url: '',
              is_popular: false,
              categoryId: 'battle_royale',
            },
            {
              id: 4,
              name: 'Minecraft',
              description: 'Песочница для творчества',
              image_url: '',
              is_popular: true,
              categoryId: 'sandbox',
            },
          ];

          // Имитируем задержку сети
          await new Promise(resolve => setTimeout(resolve, 500));

          set({ games: mockGames, isLoading: false });
        } catch (error) {
          console.error('Error fetching games:', error);
          set({ isLoading: false });
        }
      },

      fetchPopularGames: async () => {
        try {
          // Мок-данные для популярных игр
          const mockPopularGames = [
            {
              id: 1,
              name: 'Brawl Stars',
              description: 'Динамичная игра в жанре MOBA',
              image_url: '',
              is_popular: true,
              categoryId: 'action',
            },
            {
              id: 2,
              name: 'Clash Royale',
              description: 'Стратегическая карточная игра',
              image_url: '',
              is_popular: true,
              categoryId: 'strategy',
            },
            {
              id: 4,
              name: 'Minecraft',
              description: 'Песочница для творчества',
              image_url: '',
              is_popular: true,
              categoryId: 'sandbox',
            },
          ];

          set({ popularGames: mockPopularGames });
        } catch (error) {
          console.error('Error fetching popular games:', error);
        }
      },

      fetchProducts: async (gameId: number, filters?: any) => {
        set({ isLoading: true });
        
        try {
          // Мок-данные для товаров
          const mockProducts = [
            {
              id: 1,
              name: 'Brawl Pass',
              description: 'Премиум подписка с эксклюзивными наградами',
              price: 299,
              image_url: '',
              rating: 4.8,
              reviews_count: 1250,
              categoryId: 1,
              gameId: gameId,
              in_stock: true,
            },
            {
              id: 2,
              name: '1000 Gems',
              description: 'Внутриигровая валюта для покупок',
              price: 199,
              image_url: '',
              rating: 4.6,
              reviews_count: 890,
              categoryId: 1,
              gameId: gameId,
              in_stock: true,
            },
            {
              id: 3,
              name: 'Premium Skin Pack',
              description: 'Набор эксклюзивных скинов',
              price: 499,
              image_url: '',
              rating: 4.9,
              reviews_count: 567,
              categoryId: 2,
              gameId: gameId,
              in_stock: true,
            },
            {
              id: 4,
              name: 'Battle Pass',
              description: 'Доступ к сезонным наградам',
              price: 399,
              image_url: '',
              rating: 4.7,
              reviews_count: 2340,
              categoryId: 1,
              gameId: gameId,
              in_stock: true,
            },
            {
              id: 5,
              name: '5000 Coins',
              description: 'Большой пакет игровой валюты',
              price: 799,
              image_url: '',
              rating: 4.5,
              reviews_count: 1234,
              categoryId: 1,
              gameId: gameId,
              in_stock: true,
            },
            {
              id: 6,
              name: 'Legendary Chest',
              description: 'Сундук с легендарными предметами',
              price: 599,
              image_url: '',
              rating: 4.8,
              reviews_count: 789,
              categoryId: 3,
              gameId: gameId,
              in_stock: true,
            },
          ];

          // Имитируем задержку сети
          await new Promise(resolve => setTimeout(resolve, 300));

          set({ products: mockProducts, isLoading: false });
        } catch (error) {
          console.error('Error fetching products:', error);
          set({ isLoading: false });
        }
      },

      fetchCategories: async (gameId: number) => {
        try {
          const response = await apiClient.getCategories(gameId);
          if (response.success && response.data) {
            set({ categories: response.data });
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },

      fetchOrders: async () => {
        try {
          // Мок-данные для заказов
          const mockOrders = [
            {
              id: 1,
              user_id: 123456789,
              total_price: 299,
              status: 'completed',
              created_at: '2024-01-15T10:30:00Z',
              items: [
                {
                  id: 1,
                  product_id: 1,
                  quantity: 1,
                  price: 299,
                  product: {
                    id: 1,
                    name: 'Brawl Pass',
                    image_url: '',
                  }
                }
              ]
            },
            {
              id: 2,
              user_id: 123456789,
              total_price: 199,
              status: 'processing',
              created_at: '2024-01-14T15:45:00Z',
              items: [
                {
                  id: 2,
                  product_id: 2,
                  quantity: 1,
                  price: 199,
                  product: {
                    id: 2,
                    name: '1000 Gems',
                    image_url: '',
                  }
                }
              ]
            },
            {
              id: 3,
              user_id: 123456789,
              total_price: 499,
              status: 'pending',
              created_at: '2024-01-13T09:20:00Z',
              items: [
                {
                  id: 3,
                  product_id: 3,
                  quantity: 1,
                  price: 499,
                  product: {
                    id: 3,
                    name: 'Premium Skin Pack',
                    image_url: '',
                  }
                }
              ]
            },
          ];

          set({ orders: mockOrders });
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      },

      // Корзина
      addToCart: (product: Product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { product, quantity }]
          });
        }
      },

      removeFromCart: (productId: number) => {
        const { cart } = get();
        set({
          cart: cart.filter(item => item.product.id !== productId)
        });
      },

      updateCartItemQuantity: (productId: number, quantity: number) => {
        const { cart } = get();
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: cart.map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
          });
        }
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Заказы
      createOrder: async (orderData: any) => {
        set({ isLoading: true });
        
        try {
          const response = await apiClient.createOrder(orderData);
          if (response.success && response.data) {
            const newOrder = response.data;
            set(state => ({
              orders: [newOrder, ...state.orders],
              cart: [] // Очищаем корзину после создания заказа
            }));
            return newOrder;
          }
        } catch (error) {
          console.error('Error creating order:', error);
        } finally {
          set({ isLoading: false });
        }
        
        return null;
      },

      // Утилиты
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        theme: state.theme,
        cart: state.cart,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 