// ============================================================================
// 1. IMPORTS
// ============================================================================
// On importe 'test' et 'expect' depuis nos Fixtures (et non depuis @playwright/test)
// afin d'avoir accès à nos objets loginPage et checkoutPage injectés automatiquement.[span_0](start_span)[span_0](end_span)
import { test, expect } from '../fixtures/sauce-fixtures';

// On importe les jeux de données séparés depuis le dossier data/.
// Règle Clean Code : Aucune donnée texte ou mot de passe ne doit être écrite en dur ici.[span_1](start_span)[span_1](end_span)
import { SAUCE_DATA } from '../data/sauce-data';
import { CHECKOUT_DATA } from '../data/checkout-data';

// ============================================================================
// 2. REGROUPEMENT DES TESTS
// ============================================================================
// test.describe permet de regrouper plusieurs scénarios sous une même catégorie.
// Utilité : Organiser proprement l'affichage dans les rapports de test (HTML, Allure).[span_2](start_span)[span_2](end_span)
test.describe('Parcours de Commande - SauceDemo', () => {

  // ============================================================================
  // 3. DÉCLARATION DU TEST ET INJECTION DES FIXTURES
  // ============================================================================
  // - test('Nom du test', ...) : Définit le cas de test individuel.[span_3](start_span)[span_3](end_span)
  // - async : Indique que toutes les actions à l'intérieur s'exécutent de façon asynchrone (avec await).[span_4](start_span)[span_4](end_span)
  // - { page, loginPage, checkoutPage } : Injection automatique des fixtures préparées.[span_5](start_span)[span_5](end_span)
  test('Remplir le formulaire de livraison avec succès', async ({ page, loginPage, checkoutPage }) => {
    
    // --------------------------------------------------------------------------
    // ÉTAPE 1 : Connexion initiale via le Page Object Model (POM)
    // --------------------------------------------------------------------------
    // On réutilise la méthode navigateTo() et login() de la classe LoginPage.
    // Les identifiants proviennent de SAUCE_DATA pour éviter la duplication.[span_6](start_span)[span_6](end_span)
    await loginPage.navigateTo(SAUCE_DATA.baseUrl);
    await loginPage.login(SAUCE_DATA.validUser.username, SAUCE_DATA.validUser.password);

    // --------------------------------------------------------------------------
    // ÉTAPE 2 : Navigation directe vers la page ciblée
    // --------------------------------------------------------------------------
    // On force la navigation vers la page de livraison pour gagner du temps.
    // Cela isole le test et évite de dépendre des clics sur le catalogue/panier.[span_7](start_span)[span_7](end_span)
    await page.goto(`${SAUCE_DATA.baseUrl}/checkout-step-one.html`);

    // --------------------------------------------------------------------------
    // ÉTAPE 3 : Remplissage du formulaire via CheckoutPage
    // --------------------------------------------------------------------------
    // On passe les données (prénom, nom, code postal) issues de CHECKOUT_DATA.
    // La méthode fillCheckoutInformation s'occupe de remplir les champs et cliquer.[span_8](start_span)[span_8](end_span)
    await checkoutPage.fillCheckoutInformation(
      CHECKOUT_DATA.firstName,
      CHECKOUT_DATA.lastName,
      CHECKOUT_DATA.zipCode
    );

    // --------------------------------------------------------------------------
    // ÉTAPE 4 : Assertion Web-First (Vérification du succès)
    // --------------------------------------------------------------------------
    // Règle d'or du POM : Les vérifications expect() se trouvent UNIQUEMENT dans le .spec.ts.
    // On utilise une expression régulière (/.*checkout-step-two.html/) pour valider
    // la redirection vers la deuxième étape, quel que soit le domaine.[span_9](start_span)[span_9](end_span)
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });

});
