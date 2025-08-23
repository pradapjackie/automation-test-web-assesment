import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { TestData } from '../utils/TestData';
import { TestHelpers } from '../utils/TestHelpers';

test.describe('Cart Page Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    // Login and add products to cart
    await loginPage.goto();
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );
    
    // Add products to cart for checkout
    await inventoryPage.selectRandomProducts(TestData.scenarios.productSelectionCount);
    TestHelpers.logStep('Logged in and added products to cart for checkout');
  });

  test('should proceed to checkout', async ({ page }) => {
    TestHelpers.logStep('Navigating to cart page');
    await inventoryPage.goToCart();
    
    TestHelpers.logStep('Proceeding to checkout');
    await cartPage.proceedToCheckout();
    
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    TestHelpers.logAssertion('Successfully navigated to checkout page');
  });
});
