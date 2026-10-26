import { test as baseTest, expect } from '@playwright/test';
import { ApiAuthHelper } from '../helpers/api-auth.helper';
import { ArticlePage } from '../pages/article.page';

type ConduitFixtures = {
  authenticatedPage: void; // Prépare la session connectée
  articlePage: ArticlePage;
};

export const test = baseTest.extend<ConduitFixtures>({
  // Fixture magique : Se connecte par API et injecte le jeton dans le navigateur
  authenticatedPage: [async ({ page, request }, use) => {
    const apiAuth = new ApiAuthHelper(request);
    const token = await apiAuth.getAuthToken();

    // Injection du jeton JWT directement dans le LocalStorage du navigateur
    await page.addInitScript((jwtToken) => {
      window.localStorage.setItem('jwtToken', jwtToken);
    }, token);

    await use();
  }, { auto: true }], // 'auto: true' fait tourner cette injection automatiquement avant chaque test !

  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});

export { expect };
