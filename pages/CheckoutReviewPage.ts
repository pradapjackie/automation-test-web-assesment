import { Page, Locator, expect } from '@playwright/test';

export class CheckoutReviewPage {
  readonly page: Page;
  readonly orderSummary: Locator;
  readonly finishButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderSummary = page.locator('.summary_info');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cartItems = page.locator('.cart_item');
  }

  async expectPageLoaded() {
    await expect(this.orderSummary).toBeVisible();
    await expect(this.finishButton).toBeVisible();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async expectCartItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async completeOrder() {
    await this.finishButton.click();
  }
}
