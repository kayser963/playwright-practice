// Importation de 'test' et 'expect' depuis notre fichier de fixtures
import { test, expect } from '../fixtures/sauce-fixtures';
import { SAUCE_DATA } from '../data/sauce-data';

test.describe('Suite de Tests - Connexion SauceDemo', () => {

  test('Connexion réussie avec un compte valide', async ({ loginPage, page }) => {
    // 1. Navigation
    await loginPage.goto(SAUCE_DATA.url);

    // 2. Connexion
    await loginPage.login(
      SAUCE_DATA.users.standard.username,
      SAUCE_DATA.users.standard.password
    );

    // 3. Assertion : Vérification de la redirection vers le catalogue
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Affichage d un message d erreur pour un compte verrouillé', async ({ loginPage }) => {
    // 1. Navigation
    await loginPage.goto(SAUCE_DATA.url);

    // 2. Tentative de connexion
    await loginPage.login(
      SAUCE_DATA.users.lockedOut.username,
      SAUCE_DATA.users.lockedOut.password
    );

    // 3. Assertions : Vérification du message d'erreur
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

});
