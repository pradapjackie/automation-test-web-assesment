import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  // The constructor is essential for initializing the InventoryPage class with the necessary Page object.
  // It allows us to set up the page context and define locators for elements on the inventory page.
  // This ensures that we can interact with the page elements effectively in our methods.
  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async selectRandomProducts(count: number) {
    const totalProducts = await this.productItems.count();
    const selectedIndices: number[] = [];
    
    // Generate random indices for product selection
    while (selectedIndices.length < Math.min(count, totalProducts)) {
      const randomIndex = Math.floor(Math.random() * totalProducts);
      if (!selectedIndices.includes(randomIndex)) {
        selectedIndices.push(randomIndex);
      }
    }

    // Add selected products to cart
    for (const index of selectedIndices) {
      const product = this.productItems.nth(index);
      const addToCartButton = product.locator('[data-test^="add-to-cart-"]');
      await addToCartButton.click();
      
      // Verify the button changed to remove
      await expect(product.locator('[data-test^="remove-"]')).toBeVisible();
    }

    return selectedIndices.length;
  }

  async getCartItemCount() {
    const badgeText = await this.cartBadge.textContent();
    return badgeText ? parseInt(badgeText) : 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
