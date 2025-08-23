import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { TestData } from '../utils/TestData';
import { TestHelpers } from '../utils/TestHelpers';

test.describe('Inventory Page Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    // Login first to access inventory page
    await loginPage.goto();
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );
    
    TestHelpers.logStep('Logged in and navigated to inventory page');
  });

  test('should add products to cart for checkout', async () => {
    TestHelpers.logStep('Adding products to cart for checkout flow');
    
    const productsToAdd = TestData.scenarios.productSelectionCount;
    await inventoryPage.selectRandomProducts(productsToAdd);
    
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(productsToAdd);
    TestHelpers.logAssertion(`Successfully added ${productsToAdd} products to cart for checkout`);
  });

  test('should navigate to cart page', async ({ page }) => {
    TestHelpers.logStep('Navigating to cart page');
    
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);
    TestHelpers.logAssertion('Successfully navigated to cart page');
  });
});
