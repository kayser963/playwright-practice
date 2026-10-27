import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { CheckoutPage } from '@pages/checkout.page';

// Définition des types TypeScript pour les fixtures injectées
type SauceFixtures = {
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
};

// Extension du runner 'test' de base de Playwright pour instancier automatiquement les pages
export const test = baseTest.extend<SauceFixtures>({
  // Fixture qui instancie automatiquement la page LoginPage pour chaque test
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Fixture qui instancie automatiquement la page CheckoutPage pour chaque test
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

// Re-exportation de la méthode expect pour l'utiliser directement depuis ce fichier
export { expect };
