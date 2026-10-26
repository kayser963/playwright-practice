import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // 1. Déclaration des Locators (Types strictes)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // 2. Initialisation avec les attributs stables (data-test ou getByPlaceholder)
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }
  /**
   * Oriente l'action utilisateur : remplit les informations personnelles et poursuit la commande.
   */
  async fillCheckoutInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

  /**
   * Action d'annulation de la commande
   */
  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }
}
