import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types';
import { telegramApp } from './telegram';

// Конфигурация API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Интерцептор для добавления токена
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Интерцептор для обработки ошибок
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(config: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client(config);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Произошла ошибка',
      };
    }
  }

  // Аутентификация
  async authenticate(initData: string): Promise<ApiResponse<{ token: string; user: any }>> {
    return this.request({
      method: 'POST',
      url: '/auth/telegram',
      data: { initData },
    });
  }

  // Игры
  async getGames(): Promise<ApiResponse<any[]>> {
    return this.request({
      method: 'GET',
      url: '/games',
    });
  }

  async getPopularGames(): Promise<ApiResponse<any[]>> {
    return this.request({
      method: 'GET',
      url: '/games/popular',
    });
  }

  async getGame(id: number): Promise<ApiResponse<any>> {
    return this.request({
      method: 'GET',
      url: `/games/${id}`,
    });
  }

  // Категории
  async getCategories(gameId: number): Promise<ApiResponse<any[]>> {
    return this.request({
      method: 'GET',
      url: `/games/${gameId}/categories`,
    });
  }

  // Товары
  async getProducts(gameId: number, filters?: any): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.request({
      method: 'GET',
      url: `/games/${gameId}/products`,
      params: filters,
    });
  }

  async getProduct(id: number): Promise<ApiResponse<any>> {
    return this.request({
      method: 'GET',
      url: `/products/${id}`,
    });
  }

  // Пользователи
  async getUserProfile(): Promise<ApiResponse<any>> {
    return this.request({
      method: 'GET',
      url: '/user/profile',
    });
  }

  async updateUserProfile(data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'PUT',
      url: '/user/profile',
      data,
    });
  }

  async getUserOrders(): Promise<ApiResponse<any[]>> {
    return this.request({
      method: 'GET',
      url: '/user/orders',
    });
  }

  // Заказы
  async createOrder(data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'POST',
      url: '/orders',
      data,
    });
  }

  async getOrder(id: number): Promise<ApiResponse<any>> {
    return this.request({
      method: 'GET',
      url: `/orders/${id}`,
    });
  }

  // Промокоды
  async applyPromoCode(code: string): Promise<ApiResponse<any>> {
    return this.request({
      method: 'POST',
      url: '/promo-codes/apply',
      data: { code },
    });
  }

  // Платежи
  async createPayment(data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'POST',
      url: '/payments',
      data,
    });
  }

  async getPaymentMethods(): Promise<ApiResponse<any[]>> {
    return this.request({
      method: 'GET',
      url: '/payments/methods',
    });
  }

  // Админ API
  async adminCreateGame(data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'POST',
      url: '/admin/games',
      data,
    });
  }

  async adminUpdateGame(id: number, data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'PUT',
      url: `/admin/games/${id}`,
      data,
    });
  }

  async adminDeleteGame(id: number): Promise<ApiResponse<void>> {
    return this.request({
      method: 'DELETE',
      url: `/admin/games/${id}`,
    });
  }

  async adminCreateCategory(data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'POST',
      url: '/admin/categories',
      data,
    });
  }

  async adminUpdateCategory(id: number, data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'PUT',
      url: `/admin/categories/${id}`,
      data,
    });
  }

  async adminDeleteCategory(id: number): Promise<ApiResponse<void>> {
    return this.request({
      method: 'DELETE',
      url: `/admin/categories/${id}`,
    });
  }

  async adminCreateProduct(data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'POST',
      url: '/admin/products',
      data,
    });
  }

  async adminUpdateProduct(id: number, data: any): Promise<ApiResponse<any>> {
    return this.request({
      method: 'PUT',
      url: `/admin/products/${id}`,
      data,
    });
  }

  async adminDeleteProduct(id: number): Promise<ApiResponse<void>> {
    return this.request({
      method: 'DELETE',
      url: `/admin/products/${id}`,
    });
  }

  async adminGetOrders(filters?: any): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.request({
      method: 'GET',
      url: '/admin/orders',
      params: filters,
    });
  }

  async adminUpdateOrderStatus(id: number, status: string): Promise<ApiResponse<any>> {
    return this.request({
      method: 'PUT',
      url: `/admin/orders/${id}/status`,
      data: { status },
    });
  }

  // Загрузка файлов
  async uploadFile(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request({
      method: 'POST',
      url: '/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const apiClient = new ApiClient(); 