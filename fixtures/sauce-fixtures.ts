import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CheckoutPage } from '../pages/checkout.page';

type SauceFixtures = {
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
};

export const test = baseTest.extend<SauceFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect };
