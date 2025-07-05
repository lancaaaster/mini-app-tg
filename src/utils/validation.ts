import { i18n } from './i18n';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  email?: boolean;
  phone?: boolean;
  price?: boolean;
  url?: boolean;
  positiveNumber?: boolean;
  integer?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationSchema {
  [fieldName: string]: ValidationRule;
}

export class Validator {
  private schema: ValidationSchema;
  private i18n: typeof i18n;

  constructor(schema: ValidationSchema) {
    this.schema = schema;
    this.i18n = i18n;
  }

  validate(data: Record<string, any>): ValidationResult {
    const errors: string[] = [];
    let isValid = true;

    for (const [fieldName, rules] of Object.entries(this.schema)) {
      const value = data[fieldName];
      const fieldErrors = this.validateField(value, rules, fieldName);
      
      if (fieldErrors.length > 0) {
        errors.push(...fieldErrors);
        isValid = false;
      }
    }

    return { isValid, errors };
  }

  validateField(value: any, rules: ValidationRule, fieldName: string): string[] {
    const errors: string[] = [];

    // Проверка на обязательность
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors.push(this.i18n.errors('required'));
      return errors; // Если поле обязательное и пустое, дальше не проверяем
    }

    // Если значение пустое и поле не обязательное, пропускаем остальные проверки
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return errors;
    }

    // Проверка минимальной длины
    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      errors.push(`Минимальная длина: ${rules.minLength} символов`);
    }

    // Проверка максимальной длины
    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      errors.push(`Максимальная длина: ${rules.maxLength} символов`);
    }

    // Проверка email
    if (rules.email && typeof value === 'string') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errors.push(this.i18n.errors('invalidEmail'));
      }
    }

    // Проверка телефона
    if (rules.phone && typeof value === 'string') {
      const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phonePattern.test(value.replace(/\s/g, ''))) {
        errors.push(this.i18n.errors('invalidPhone'));
      }
    }

    // Проверка URL
    if (rules.url && typeof value === 'string') {
      try {
        new URL(value);
      } catch {
        errors.push('Неверный формат URL');
      }
    }

    // Проверка цены
    if (rules.price && typeof value === 'string') {
      const pricePattern = /^\d+(\.\d{1,2})?$/;
      if (!pricePattern.test(value) || parseFloat(value) <= 0) {
        errors.push(this.i18n.errors('invalidPrice'));
      }
    }

    // Проверка положительного числа
    if (rules.positiveNumber) {
      const num = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(num) || num <= 0) {
        errors.push('Значение должно быть положительным числом');
      }
    }

    // Проверка целого числа
    if (rules.integer) {
      const num = typeof value === 'string' ? parseInt(value) : value;
      if (isNaN(num) || !Number.isInteger(num)) {
        errors.push('Значение должно быть целым числом');
      }
    }

    // Проверка по регулярному выражению
    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      errors.push('Неверный формат');
    }

    // Кастомная проверка
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        errors.push(customError);
      }
    }

    return errors;
  }

  // Валидация одного поля
  validateSingleField(fieldName: string, value: any): string[] {
    const rules = this.schema[fieldName];
    if (!rules) {
      return [];
    }
    return this.validateField(value, rules, fieldName);
  }
}

// Предустановленные схемы валидации
export const validationSchemas = {
  user: {
    firstName: { required: true, minLength: 2, maxLength: 50 },
    lastName: { required: true, minLength: 2, maxLength: 50 },
    email: { required: true, email: true },
    phone: { phone: true },
  },
  game: {
    name: { required: true, minLength: 2, maxLength: 100 },
    description: { maxLength: 500 },
    image_url: { required: true, url: true },
  },
  category: {
    name: { required: true, minLength: 2, maxLength: 50 },
    gameId: { required: true },
  },
  product: {
    name: { required: true, minLength: 2, maxLength: 100 },
    description: { maxLength: 1000 },
    price: { required: true, price: true },
    image_url: { required: true, url: true },
    categoryId: { required: true },
    gameId: { required: true },
  },
  promoCode: {
    code: { required: true, minLength: 3, maxLength: 20, pattern: /^[A-Z0-9]+$/ },
  },
  payment: {
    amount: { required: true, positiveNumber: true },
    method: { required: true },
  },
};

// Утилиты для валидации
export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
  return phonePattern.test(phone.replace(/\s/g, ''));
};

export const validatePrice = (price: string | number): boolean => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(num) && num > 0;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// Хук для валидации в компонентах
export const useValidation = (schema: ValidationSchema) => {
  const validator = new Validator(schema);
  
  return {
    validate: (data: Record<string, any>) => validator.validate(data),
    validateField: (fieldName: string, value: any) => validator.validateSingleField(fieldName, value),
    validateEmail,
    validatePhone,
    validatePrice,
    validateUrl,
    validateRequired,
  };
}; 