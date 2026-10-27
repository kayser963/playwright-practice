import { test as baseTest, expect } from '@playwright/test';
import { ApiAuthHelper } from '@helpers/api-auth.helper';
import { ArticlePage } from '@pages/article.page';

// Typage des fixtures spécifiques à Conduit
type ConduitFixtures = {
  authenticatedPage: void; // Prépare et injecte la session connectée
  articlePage: ArticlePage;
};

export const test = baseTest.extend<ConduitFixtures>({
  // Fixture d'authentification hybride API + UI
  authenticatedPage: [
    async ({ page, request }, use) => {
      // 1. Récupération du jeton JWT via l'API en arrière-plan
      const apiAuth = new ApiAuthHelper(request);
      const token = await apiAuth.getAuthToken();

      // 2. Injection du jeton JWT directement dans le LocalStorage du navigateur avant le chargement de la page
      await page.addInitScript((jwtToken) => {
        window.localStorage.setItem('jwtToken', jwtToken);
      }, token);

      // 3. Transmission du contrôle au test
      await use();
    },
    // 'auto: true' exécute automatiquement cette injection avant CHAQUE test utilisant cette fixture
    { auto: true },
  ],

  // Fixture pour la gestion de la page des articles
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});

export { expect };
