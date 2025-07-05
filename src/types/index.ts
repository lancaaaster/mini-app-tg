export interface User {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  photo_url?: string;
  balance: number;
  is_admin: boolean;
  created_at: string;
}

export interface Game {
  id: number;
  name: string;
  image_url: string;
  description?: string;
  is_popular: boolean;
  created_at: string;
}

export interface Category {
  id: number;
  game_id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Product {
  id: number;
  game_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating: number;
  reviews_count: number;
  is_available: boolean;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'error';
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface OrderWithDetails extends Order {
  product: Product;
  game: Game;
  category: Category;
}

export interface PromoCode {
  id: number;
  code: string;
  discount_percent: number;
  max_uses: number;
  used_count: number;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  is_available: boolean;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface FilterOptions {
  category_id?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort_by?: 'price' | 'rating' | 'name' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
} 