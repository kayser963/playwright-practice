import { test, expect } from '../fixtures/conduit-fixtures';
import { CONDUIT_DATA } from '../data/conduit-data';

test.describe('Gestion des Articles sur Conduit - Test Hybride UI + API', () => {

  test('Publier un nouvel article en étant pré-connecté via API', async ({ page, articlePage }) => {
    // 1. Navigation directe sur la page d'écriture (grâce au jeton API, nous sommes déjà connectés !)
    await page.goto(`${CONDUIT_DATA.baseUrl}/editor`);

    // 2. Création d'un titre unique avec un horodatage pour éviter les doublons
    const uniqueTitle = `Article Automation ${Date.now()}`;

    // 3. Action visuelle via le POM
    await articlePage.publishArticle(
      uniqueTitle,
      'Description de test SDET',
      'Contenu rédigé automatiquement par Playwright'
    );

    // 4. Assertion : Vérifier que l'article est affiché
    await expect(articlePage.articleTitleHeader).toHaveText(uniqueTitle);
  });

});
