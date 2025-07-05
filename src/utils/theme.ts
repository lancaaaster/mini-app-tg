import { Theme } from '@/types';

const THEME_KEY = 'app_theme';

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return { mode: 'light' };
  }

  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing stored theme:', error);
  }

  return { mode: 'light' };
};

export const setStoredTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch (error) {
    console.error('Error storing theme:', error);
  }
};

export const applyTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  
  if (theme.mode === 'dark') {
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
  } else {
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
  }

  // Обновляем CSS переменные для Telegram Web App
  const telegramApp = window.Telegram?.WebApp;
  if (telegramApp) {
    const themeParams = telegramApp.themeParams;
    if (themeParams) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color || '#999999');
      document.documentElement.style.setProperty('--tg-theme-link-color', themeParams.link_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', themeParams.secondary_bg_color || '#f1f1f1');
    }
  }
};

export const getInitialTheme = (): Theme => {
  // Сначала проверяем сохраненную тему
  const storedTheme = getStoredTheme();
  if (storedTheme.mode) {
    return storedTheme;
  }

  // Затем проверяем системную тему
  const systemTheme = getSystemTheme();
  return { mode: systemTheme };
};

export const toggleTheme = (currentTheme: Theme): Theme => {
  const newTheme: Theme = {
    mode: currentTheme.mode === 'light' ? 'dark' : 'light'
  };
  
  setStoredTheme(newTheme);
  applyTheme(newTheme);
  
  return newTheme;
}; 