import { Page, Locator } from '@playwright/test';

/**
 * Modèle de page (Page Object Model) pour la page de connexion SauceDemo.
 * Centralise les éléments HTML (Locators) et les actions utilisateur.
 */
export class LoginPage {
  // Déclaration des propriétés de la classe en lecture seule (readonly pour la sécurité du code)
  readonly page: Page;
  readonly errorMessage: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Le constructeur initialise les sélecteurs lorsque la page est instanciée
  constructor(page: Page) {
    this.page = page;
    this.errorMessage = page.locator('[data-test="error"]');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  // Méthode réutilisable pour naviguer vers une URL donnée
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  // Méthode métier centralisant la séquence d'actions pour se connecter
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
