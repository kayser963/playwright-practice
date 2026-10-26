import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly errorMessage: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorMessage = page.locator('[data-test="error"]');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  //  Méthode manquante à vérifier/ajouter :
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
