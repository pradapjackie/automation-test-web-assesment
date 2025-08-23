import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly successMessage: Locator;
  readonly orderCompleteHeader: Locator;
  readonly backHomeButton: Locator;
  readonly orderCompleteImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.locator('.complete-text');
    this.orderCompleteHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.orderCompleteImage = page.locator('.pony_express');
  }

  async expectPageLoaded() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.orderCompleteHeader).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
    await expect(this.orderCompleteImage).toBeVisible();
  }

  async expectOrderComplete() {
    await expect(this.orderCompleteHeader).toContainText('Thank you for your order!');
    await expect(this.successMessage).toContainText('Your order has been dispatched');
  }

  async backToHome() {
    await this.backHomeButton.click();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }

  async getOrderCompleteHeader() {
    return await this.orderCompleteHeader.textContent();
  }
}
