import { TelegramUser } from '@/types';

export class TelegramWebApp {
  private static instance: TelegramWebApp;
  private webApp: any;

  constructor() {
    this.webApp = window.Telegram?.WebApp;
  }

  static getInstance(): TelegramWebApp {
    if (!TelegramWebApp.instance) {
      TelegramWebApp.instance = new TelegramWebApp();
    }
    return TelegramWebApp.instance;
  }

  init(): void {
    if (this.webApp) {
      this.webApp.ready();
      this.webApp.expand();
    }
  }

  getUser(): TelegramUser | null {
    if (!this.webApp?.initDataUnsafe?.user) {
      return null;
    }

    return this.webApp.initDataUnsafe.user as TelegramUser;
  }

  getColorScheme(): 'light' | 'dark' {
    return this.webApp?.colorScheme || 'light';
  }

  showAlert(message: string, callback?: () => void): void {
    if (this.webApp?.showAlert) {
      this.webApp.showAlert(message, callback);
    }
  }

  showConfirm(message: string, callback?: (confirmed: boolean) => void): void {
    if (this.webApp?.showConfirm) {
      this.webApp.showConfirm(message, callback);
    }
  }

  showPopup(title: string, message: string, buttons: any[] = []): void {
    if (this.webApp?.showPopup) {
      this.webApp.showPopup({ title, message, buttons });
    }
  }

  showScanQrPopup(text: string, callback?: (result: string) => void): void {
    if (this.webApp?.showScanQrPopup) {
      this.webApp.showScanQrPopup({ text }, callback);
    }
  }

  close(): void {
    if (this.webApp?.close) {
      this.webApp.close();
    }
  }

  isExpanded(): boolean {
    return this.webApp?.isExpanded || false;
  }

  expand(): void {
    if (this.webApp?.expand) {
      this.webApp.expand();
    }
  }

  getViewportHeight(): number {
    return this.webApp?.viewportHeight || window.innerHeight;
  }

  getViewportStableHeight(): number {
    return this.webApp?.viewportStableHeight || window.innerHeight;
  }

  getHeaderColor(): string {
    return this.webApp?.headerColor || '#ffffff';
  }

  getBackgroundColor(): string {
    return this.webApp?.backgroundColor || '#ffffff';
  }

  setHeaderColor(color: string): void {
    if (this.webApp?.setHeaderColor) {
      this.webApp.setHeaderColor(color);
    }
  }

  setBackgroundColor(color: string): void {
    if (this.webApp?.setBackgroundColor) {
      this.webApp.setBackgroundColor(color);
    }
  }

  enableClosingConfirmation(): void {
    if (this.webApp?.enableClosingConfirmation) {
      this.webApp.enableClosingConfirmation();
    }
  }

  disableClosingConfirmation(): void {
    if (this.webApp?.disableClosingConfirmation) {
      this.webApp.disableClosingConfirmation();
    }
  }

  isClosingConfirmationEnabled(): boolean {
    return this.webApp?.isClosingConfirmationEnabled || false;
  }

  getMainButton(): any {
    return this.webApp?.MainButton;
  }

  getBackButton(): any {
    return this.webApp?.BackButton;
  }

  getHapticFeedback(): any {
    return this.webApp?.HapticFeedback;
  }

  getCloudStorage(): any {
    return this.webApp?.CloudStorage;
  }

  getBiometricManager(): any {
    return this.webApp?.BiometricManager;
  }

  getInvoice(): any {
    return this.webApp?.Invoice;
  }

  getSettingsButton(): any {
    return this.webApp?.SettingsButton;
  }

  getThemeParams(): any {
    return this.webApp?.themeParams || {};
  }

  getInitData(): string {
    return this.webApp?.initData || '';
  }

  getInitDataUnsafe(): any {
    return this.webApp?.initDataUnsafe || {};
  }

  getVersion(): string {
    return this.webApp?.version || '';
  }

  getPlatform(): string {
    return this.webApp?.platform || '';
  }

  isVersionAtLeast(version: string): boolean {
    return this.webApp?.isVersionAtLeast?.(version) || false;
  }

  isSupported(): boolean {
    return !!this.webApp;
  }
}

export const telegramApp = TelegramWebApp.getInstance(); 