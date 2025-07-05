export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: any;
  userId?: string;
  sessionId?: string;
  userAgent?: string;
  url?: string;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableStorage: boolean;
  maxStorageEntries: number;
  enableRemote: boolean;
  remoteEndpoint?: string;
}

class Logger {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];
  private sessionId: string;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableStorage: true,
      maxStorageEntries: 1000,
      enableRemote: false,
      ...config,
    };

    this.sessionId = this.generateSessionId();
    this.loadFromStorage();
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  private getCurrentUrl(): string {
    return window.location.href;
  }

  private getUserAgent(): string {
    return navigator.userAgent;
  }

  private createLogEntry(
    level: LogLevel,
    category: string,
    message: string,
    data?: any,
    userId?: string
  ): LogEntry {
    return {
      timestamp: this.getCurrentTimestamp(),
      level,
      category,
      message,
      data,
      userId,
      sessionId: this.sessionId,
      userAgent: this.getUserAgent(),
      url: this.getCurrentUrl(),
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private logToConsole(entry: LogEntry): void {
    if (!this.config.enableConsole) return;

    const { timestamp, level, category, message, data } = entry;
    const prefix = `[${timestamp}] [${LogLevel[level]}] [${category}]`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(prefix, message, data);
        break;
      case LogLevel.INFO:
        console.info(prefix, message, data);
        break;
      case LogLevel.WARN:
        console.warn(prefix, message, data);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(prefix, message, data);
        break;
    }
  }

  private logToStorage(entry: LogEntry): void {
    if (!this.config.enableStorage) return;

    this.logs.push(entry);

    // Ограничиваем количество записей в памяти
    if (this.logs.length > this.config.maxStorageEntries) {
      this.logs = this.logs.slice(-this.config.maxStorageEntries);
    }

    // Сохраняем в localStorage
    try {
      localStorage.setItem('app_logs', JSON.stringify(this.logs));
    } catch (error) {
      console.warn('Failed to save logs to localStorage:', error);
    }
  }

  private async logToRemote(entry: LogEntry): Promise<void> {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) return;

    try {
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      console.warn('Failed to send log to remote endpoint:', error);
    }
  }

  private loadFromStorage(): void {
    if (!this.config.enableStorage) return;

    try {
      const stored = localStorage.getItem('app_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load logs from localStorage:', error);
    }
  }

  // Основные методы логирования
  debug(category: string, message: string, data?: any, userId?: string): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry = this.createLogEntry(LogLevel.DEBUG, category, message, data, userId);
    this.logToConsole(entry);
    this.logToStorage(entry);
    this.logToRemote(entry);
  }

  info(category: string, message: string, data?: any, userId?: string): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry = this.createLogEntry(LogLevel.INFO, category, message, data, userId);
    this.logToConsole(entry);
    this.logToStorage(entry);
    this.logToRemote(entry);
  }

  warn(category: string, message: string, data?: any, userId?: string): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry = this.createLogEntry(LogLevel.WARN, category, message, data, userId);
    this.logToConsole(entry);
    this.logToStorage(entry);
    this.logToRemote(entry);
  }

  error(category: string, message: string, data?: any, userId?: string): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const entry = this.createLogEntry(LogLevel.ERROR, category, message, data, userId);
    this.logToConsole(entry);
    this.logToStorage(entry);
    this.logToRemote(entry);
  }

  fatal(category: string, message: string, data?: any, userId?: string): void {
    if (!this.shouldLog(LogLevel.FATAL)) return;

    const entry = this.createLogEntry(LogLevel.FATAL, category, message, data, userId);
    this.logToConsole(entry);
    this.logToStorage(entry);
    this.logToRemote(entry);
  }

  // Специализированные методы для разных категорий
  userAction(action: string, data?: any, userId?: string): void {
    this.info('USER_ACTION', action, data, userId);
  }

  navigation(from: string, to: string, userId?: string): void {
    this.info('NAVIGATION', `Navigation from ${from} to ${to}`, { from, to }, userId);
  }

  purchase(productId: string, amount: number, userId?: string): void {
    this.info('PURCHASE', `Purchase: ${productId} for ${amount}`, { productId, amount }, userId);
  }

  errorBoundary(error: Error, componentStack: string, userId?: string): void {
    this.error('ERROR_BOUNDARY', error.message, { error: error.stack, componentStack }, userId);
  }

  apiCall(endpoint: string, method: string, status: number, duration: number, userId?: string): void {
    const level = status >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    const entry = this.createLogEntry(
      level,
      'API_CALL',
      `${method} ${endpoint} - ${status}`,
      { endpoint, method, status, duration },
      userId
    );
    
    this.logToConsole(entry);
    this.logToStorage(entry);
    this.logToRemote(entry);
  }

  validationError(field: string, value: any, errors: string[], userId?: string): void {
    this.warn('VALIDATION', `Validation error for field: ${field}`, { field, value, errors }, userId);
  }

  // Методы для работы с логами
  getLogs(level?: LogLevel, category?: string, limit?: number): LogEntry[] {
    let filtered = this.logs;

    if (level !== undefined) {
      filtered = filtered.filter(log => log.level >= level);
    }

    if (category) {
      filtered = filtered.filter(log => log.category === category);
    }

    if (limit) {
      filtered = filtered.slice(-limit);
    }

    return filtered;
  }

  clearLogs(): void {
    this.logs = [];
    try {
      localStorage.removeItem('app_logs');
    } catch (error) {
      console.warn('Failed to clear logs from localStorage:', error);
    }
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Конфигурация
  setConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): LoggerConfig {
    return { ...this.config };
  }
}

// Создаем глобальный экземпляр логгера
export const logger = new Logger({
  level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  enableStorage: true,
  maxStorageEntries: 1000,
  enableRemote: false,
});

// Хук для использования в компонентах
export const useLogger = () => {
  return logger;
};

// Утилиты для автоматического логирования
export const withLogging = <T extends any[], R>(
  fn: (...args: T) => R,
  category: string,
  operation: string
) => {
  return (...args: T): R => {
    try {
      logger.info(category, `Starting ${operation}`, { args });
      const result = fn(...args);
      logger.info(category, `Completed ${operation}`, { result });
      return result;
    } catch (error) {
      logger.error(category, `Failed ${operation}`, { error, args });
      throw error;
    }
  };
};

// Автоматическое логирование ошибок
export const setupErrorLogging = (): void => {
  // Логирование необработанных ошибок
  window.addEventListener('error', (event) => {
    logger.error('UNHANDLED_ERROR', event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });
  });

  // Логирование необработанных промисов
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('UNHANDLED_PROMISE_REJECTION', 'Unhandled promise rejection', {
      reason: event.reason,
    });
  });
}; 