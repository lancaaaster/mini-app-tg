// Система интернационализации
export type Locale = 'ru';

export interface Translations {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    filter: string;
    clear: string;
    viewAll: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    confirm: string;
    yes: string;
    no: string;
  };
  navigation: {
    home: string;
    catalog: string;
    profile: string;
    cart: string;
    admin: string;
  };
  home: {
    title: string;
    subtitle: string;
    popularGames: string;
    popularProducts: string;
    hotOffers: string;
    newProducts: string;
    viewAllGames: string;
    viewAllProducts: string;
    whyChooseUs: string;
    security: string;
    securityDesc: string;
    fastDelivery: string;
    fastDeliveryDesc: string;
    support: string;
    supportDesc: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    searchGames: string;
    foundGames: string;
    clearSearch: string;
    showAllGames: string;
    nothingFound: string;
    nothingFoundDesc: string;
    filters: string;
    categories: string;
    allCategories: string;
    price: string;
    anyPrice: string;
    from: string;
    to: string;
    viewMode: {
      grid: string;
      list: string;
    };
  };
  profile: {
    title: string;
    subtitle: string;
    tabs: {
      profile: string;
      balance: string;
      orders: string;
      settings: string;
    };
    personalInfo: string;
    firstName: string;
    lastName: string;
    username: string;
    vipUser: string;
    orders: string;
    reviews: string;
    days: string;
    promoCode: string;
    promoCodePlaceholder: string;
    applyPromo: string;
    currentBalance: string;
    lastTopUp: string;
    topUpBalance: string;
    paymentMethods: string;
    bankCard: string;
    bankCardDesc: string;
    eWallet: string;
    eWalletDesc: string;
    commission: string;
    statistics: string;
    totalTopUp: string;
    spent: string;
    saved: string;
    orderHistory: string;
    orderHistoryEmpty: string;
    orderHistoryEmptyDesc: string;
    goToShopping: string;
    orderNumber: string;
    orderDate: string;
    orderStatus: {
      completed: string;
      processing: string;
      pending: string;
      cancelled: string;
    };
    orderItems: string;
    paymentMethod: string;
    details: string;
    appSettings: string;
    notifications: string;
    notificationsDesc: string;
    darkTheme: string;
    darkThemeDesc: string;
    security: string;
    twoFactorAuth: string;
    twoFactorAuthDesc: string;
    configure: string;
    paymentMethodsSettings: string;
    paymentMethodsDesc: string;
    manage: string;
    account: string;
    logout: string;
    logoutDesc: string;
  };
  products: {
    buy: string;
    addToCart: string;
    removeFromCart: string;
    price: string;
    rating: string;
    reviews: string;
    description: string;
    specifications: string;
    relatedProducts: string;
    outOfStock: string;
    inStock: string;
    popular: string;
    new: string;
    discount: string;
  };
  cart: {
    title: string;
    empty: string;
    emptyDesc: string;
    goToCatalog: string;
    items: string;
    total: string;
    checkout: string;
    clearCart: string;
    removeItem: string;
  };
  checkout: {
    title: string;
    orderSummary: string;
    paymentMethod: string;
    balance: string;
    card: string;
    wallet: string;
    total: string;
    confirmOrder: string;
    orderConfirmed: string;
    orderConfirmedDesc: string;
  };
  admin: {
    title: string;
    games: string;
    categories: string;
    products: string;
    orders: string;
    users: string;
    statistics: string;
    addGame: string;
    addCategory: string;
    addProduct: string;
    editGame: string;
    editCategory: string;
    editProduct: string;
    deleteGame: string;
    deleteCategory: string;
    deleteProduct: string;
    gameName: string;
    gameDescription: string;
    gameImage: string;
    categoryName: string;
    categoryGame: string;
    productName: string;
    productDescription: string;
    productPrice: string;
    productImage: string;
    productCategory: string;
    productGame: string;
    productRating: string;
    productReviews: string;
  };
  errors: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    invalidPrice: string;
    invalidImage: string;
    networkError: string;
    serverError: string;
    unauthorized: string;
    forbidden: string;
    notFound: string;
    validationError: string;
  };
}

const translations: Record<Locale, Translations> = {
  ru: {
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успешно',
      cancel: 'Отмена',
      save: 'Сохранить',
      delete: 'Удалить',
      edit: 'Редактировать',
      add: 'Добавить',
      search: 'Поиск',
      filter: 'Фильтр',
      clear: 'Очистить',
      viewAll: 'Все',
      back: 'Назад',
      next: 'Далее',
      previous: 'Назад',
      close: 'Закрыть',
      confirm: 'Подтвердить',
      yes: 'Да',
      no: 'Нет',
    },
    navigation: {
      home: 'Главная',
      catalog: 'Каталог',
      profile: 'Профиль',
      cart: 'Корзина',
      admin: 'Админ',
    },
    home: {
      title: 'Добро пожаловать в Game Donate Shop',
      subtitle: 'Покупайте донат для любимых игр быстро и безопасно',
      popularGames: 'Популярные игры',
      popularProducts: 'Популярные товары',
      hotOffers: '🔥 Горячие предложения',
      newProducts: '⚡ Новинки',
      viewAllGames: 'Все игры',
      viewAllProducts: 'Все товары',
      whyChooseUs: 'Почему выбирают нас?',
      security: 'Безопасность',
      securityDesc: 'Все платежи защищены и обрабатываются безопасно',
      fastDelivery: 'Быстрая доставка',
      fastDeliveryDesc: 'Мгновенная доставка товаров после оплаты',
      support: '24/7 Поддержка',
      supportDesc: 'Круглосуточная поддержка для решения любых вопросов',
    },
    catalog: {
      title: 'Каталог игр',
      subtitle: 'Выберите игру и найдите нужные товары',
      searchGames: 'Поиск игр...',
      foundGames: 'Найдено игр: {count}',
      clearSearch: 'Очистить поиск',
      showAllGames: 'Показать все игры',
      nothingFound: 'Ничего не найдено',
      nothingFoundDesc: 'По запросу "{query}" ничего не найдено. Попробуйте изменить поисковый запрос.',
      filters: 'Фильтры',
      categories: 'Категории',
      allCategories: 'Все категории',
      price: 'Цена',
      anyPrice: 'Любая цена',
      from: 'От',
      to: 'До',
      viewMode: {
        grid: 'Сетка',
        list: 'Список',
      },
    },
    profile: {
      title: 'Профиль',
      subtitle: 'Управление аккаунтом и настройками',
      tabs: {
        profile: 'Профиль',
        balance: 'Баланс',
        orders: 'История',
        settings: 'Настройки',
      },
      personalInfo: 'Личная информация',
      firstName: 'Имя',
      lastName: 'Фамилия',
      username: 'Имя пользователя',
      vipUser: 'VIP Пользователь',
      orders: 'Заказов',
      reviews: 'Отзывов',
      days: 'Дней',
      promoCode: 'Промокод',
      promoCodePlaceholder: 'Введите промокод для получения скидки',
      applyPromo: 'Применить',
      currentBalance: 'Текущий баланс',
      lastTopUp: 'Последнее пополнение',
      topUpBalance: 'Пополнить баланс',
      paymentMethods: 'Способы пополнения',
      bankCard: 'Банковская карта',
      bankCardDesc: 'Visa, MasterCard, МИР',
      eWallet: 'Электронный кошелек',
      eWalletDesc: 'ЮMoney, QIWI, WebMoney',
      commission: 'Комиссия: {percent}%',
      statistics: 'Статистика пополнений',
      totalTopUp: 'Всего пополнено',
      spent: 'Потрачено',
      saved: 'Сэкономлено',
      orderHistory: 'История заказов',
      orderHistoryEmpty: 'История заказов пуста',
      orderHistoryEmptyDesc: 'У вас пока нет заказов. Сделайте первый заказ и он появится здесь!',
      goToShopping: 'Перейти к покупкам',
      orderNumber: 'Заказ #{id}',
      orderDate: 'Дата заказа',
      orderStatus: {
        completed: '✅ Выполнен',
        processing: '⏳ В обработке',
        pending: '💳 Ожидает оплаты',
        cancelled: '❌ Отменен',
      },
      orderItems: 'Товары: {count} шт.',
      paymentMethod: 'Способ оплаты: {method}',
      details: 'Подробнее',
      appSettings: 'Настройки приложения',
      notifications: 'Уведомления',
      notificationsDesc: 'Получать уведомления о заказах',
      darkTheme: 'Темная тема',
      darkThemeDesc: 'Переключить темную тему',
      security: 'Безопасность',
      twoFactorAuth: 'Двухфакторная аутентификация',
      twoFactorAuthDesc: 'Дополнительная защита аккаунта',
      configure: 'Настроить',
      paymentMethodsSettings: 'Способы оплаты',
      paymentMethodsDesc: 'Управление картами и кошельками',
      manage: 'Управлять',
      account: 'Аккаунт',
      logout: 'Выйти из аккаунта',
      logoutDesc: 'Завершить текущую сессию',
    },
    products: {
      buy: 'Купить',
      addToCart: 'В корзину',
      removeFromCart: 'Удалить из корзины',
      price: 'Цена',
      rating: 'Рейтинг',
      reviews: 'Отзывы',
      description: 'Описание',
      specifications: 'Характеристики',
      relatedProducts: 'Похожие товары',
      outOfStock: 'Нет в наличии',
      inStock: 'В наличии',
      popular: 'Популярный',
      new: 'Новый',
      discount: 'Скидка',
    },
    cart: {
      title: 'Корзина',
      empty: 'Корзина пуста',
      emptyDesc: 'Добавьте товары в корзину для оформления заказа',
      goToCatalog: 'Перейти в каталог',
      items: 'Товары',
      total: 'Итого',
      checkout: 'Оформить заказ',
      clearCart: 'Очистить корзину',
      removeItem: 'Удалить товар',
    },
    checkout: {
      title: 'Оформление заказа',
      orderSummary: 'Сводка заказа',
      paymentMethod: 'Способ оплаты',
      balance: 'Баланс',
      card: 'Карта',
      wallet: 'Кошелек',
      total: 'Итого',
      confirmOrder: 'Подтвердить заказ',
      orderConfirmed: 'Заказ подтвержден',
      orderConfirmedDesc: 'Ваш заказ успешно оформлен и передан в обработку',
    },
    admin: {
      title: 'Панель администратора',
      games: 'Игры',
      categories: 'Категории',
      products: 'Товары',
      orders: 'Заказы',
      users: 'Пользователи',
      statistics: 'Статистика',
      addGame: 'Добавить игру',
      addCategory: 'Добавить категорию',
      addProduct: 'Добавить товар',
      editGame: 'Редактировать игру',
      editCategory: 'Редактировать категорию',
      editProduct: 'Редактировать товар',
      deleteGame: 'Удалить игру',
      deleteCategory: 'Удалить категорию',
      deleteProduct: 'Удалить товар',
      gameName: 'Название игры',
      gameDescription: 'Описание игры',
      gameImage: 'Изображение игры',
      categoryName: 'Название категории',
      categoryGame: 'Игра категории',
      productName: 'Название товара',
      productDescription: 'Описание товара',
      productPrice: 'Цена товара',
      productImage: 'Изображение товара',
      productCategory: 'Категория товара',
      productGame: 'Игра товара',
      productRating: 'Рейтинг товара',
      productReviews: 'Отзывы о товаре',
    },
    errors: {
      required: 'Это поле обязательно для заполнения',
      invalidEmail: 'Неверный формат email',
      invalidPhone: 'Неверный формат телефона',
      invalidPrice: 'Неверная цена',
      invalidImage: 'Неверный формат изображения',
      networkError: 'Ошибка сети',
      serverError: 'Ошибка сервера',
      unauthorized: 'Не авторизован',
      forbidden: 'Доступ запрещен',
      notFound: 'Не найдено',
      validationError: 'Ошибка валидации',
    },
  },
};

export class I18n {
  private locale: Locale = 'ru';

  constructor(locale?: Locale) {
    if (locale) {
      this.locale = locale;
    }
  }

  setLocale(locale: Locale) {
    this.locale = locale;
  }

  getLocale(): Locale {
    return this.locale;
  }

  t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: any = translations[this.locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Возвращаем ключ, если перевод не найден
      }
    }

    if (typeof value === 'string') {
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, param) => {
          return params[param]?.toString() || match;
        });
      }
      return value;
    }

    return key;
  }

  // Удобные методы для часто используемых переводов
  common(key: keyof Translations['common'], params?: Record<string, string | number>): string {
    return this.t(`common.${key}`, params);
  }

  nav(key: keyof Translations['navigation']): string {
    return this.t(`navigation.${key}`);
  }

  home(key: keyof Translations['home'], params?: Record<string, string | number>): string {
    return this.t(`home.${key}`, params);
  }

  catalog(key: keyof Translations['catalog'], params?: Record<string, string | number>): string {
    return this.t(`catalog.${key}`, params);
  }

  profile(key: keyof Translations['profile'], params?: Record<string, string | number>): string {
    return this.t(`profile.${key}`, params);
  }

  products(key: keyof Translations['products'], params?: Record<string, string | number>): string {
    return this.t(`products.${key}`, params);
  }

  cart(key: keyof Translations['cart'], params?: Record<string, string | number>): string {
    return this.t(`cart.${key}`, params);
  }

  checkout(key: keyof Translations['checkout'], params?: Record<string, string | number>): string {
    return this.t(`checkout.${key}`, params);
  }

  admin(key: keyof Translations['admin'], params?: Record<string, string | number>): string {
    return this.t(`admin.${key}`, params);
  }

  errors(key: keyof Translations['errors'], params?: Record<string, string | number>): string {
    return this.t(`errors.${key}`, params);
  }
}

// Создаем глобальный экземпляр
export const i18n = new I18n();

// Хук для использования в компонентах
export const useI18n = () => {
  return i18n;
}; 