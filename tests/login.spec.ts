// Importation de 'test' et 'expect' depuis notre fichier de fixtures
// Importation des fixtures personnalisées et des données de test via les Path Aliases (@fixtures, @data)
import { test, expect } from '@fixtures/sauce-fixtures';
import { SAUCE_DATA } from '@data/sauce-data';

// Regroupement logique de la suite de tests pour la fonctionnalité de connexion
test.describe('Suite de Tests - Connexion SauceDemo', () => {

  // Test 1 : Scénario nominal (Passant)
  test('Connexion réussie avec un compte valide', async ({ loginPage, page }) => {
    // 1. Navigation vers la page de connexion
    await loginPage.goto(SAUCE_DATA.url);

    // 2. Action de connexion avec les identifiants valides
    await loginPage.login(
      SAUCE_DATA.validUser.username,
      SAUCE_DATA.validUser.password
    );

    // 3. Assertion : Vérifier que l'utilisateur est bien redirigé vers la page catalogue (inventory)
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  // Test 2 : Scénario alternatif (Non-passant)
  test('Affichage d un message d erreur pour un compte verrouillé', async ({ loginPage }) => {
    // 1. Navigation vers la page de connexion
    await loginPage.goto(SAUCE_DATA.url);

    // 2. Tentative de connexion avec un compte bloqué
    await loginPage.login(
      SAUCE_DATA.lockedUser.username,
      SAUCE_DATA.lockedUser.password
    );

    // 3. Assertions : Vérifier que le message d'erreur est visible et contient le bon texte
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

});
