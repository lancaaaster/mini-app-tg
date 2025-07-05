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
        
        try {
          const initData = telegramApp.getInitData();
          if (!initData) {
            throw new Error('No init data available');
          }

          const response = await apiClient.authenticate(initData);
          
          if (response.success && response.data) {
            localStorage.setItem('auth_token', response.data.token);
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          } else {
            throw new Error(response.error || 'Authentication failed');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          set({ isAuthenticated: false });
        } finally {
          set({ isLoading: false });
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
          const response = await apiClient.getGames();
          if (response.success && response.data) {
            set({ games: response.data });
          }
        } catch (error) {
          console.error('Error fetching games:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchPopularGames: async () => {
        try {
          const response = await apiClient.getPopularGames();
          if (response.success && response.data) {
            set({ popularGames: response.data });
          }
        } catch (error) {
          console.error('Error fetching popular games:', error);
        }
      },

      fetchProducts: async (gameId: number, filters?: any) => {
        set({ isLoading: true });
        
        try {
          const response = await apiClient.getProducts(gameId, filters);
          if (response.success && response.data) {
            set({ products: response.data.data });
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
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
          const response = await apiClient.getUserOrders();
          if (response.success && response.data) {
            set({ orders: response.data });
          }
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