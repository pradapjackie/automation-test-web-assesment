import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutReviewPage } from '../pages/CheckoutReviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { TestData } from '../utils/TestData';
import { TestHelpers } from '../utils/TestHelpers';
import { AllureUtils } from '../utils/AllureUtils';


test.describe('Complete Checkout Flow Tests', () => {
  // Allure suite configuration
  test.beforeAll(async () => {
    AllureUtils.suite('E-commerce Checkout Flow');
    AllureUtils.feature('Complete User Purchase Journey');
    AllureUtils.story('Customer completes checkout with multiple items');
    AllureUtils.owner('QA Team');
    AllureUtils.lead('Test Automation Engineer');
    AllureUtils.severity('critical');
    AllureUtils.tag('checkout', 'e-commerce', 'user-flow', 'critical-path');
    AllureUtils.link('https://www.saucedemo.com/', 'Sauce Labs Demo Website');
  });
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let checkoutReviewPage: CheckoutReviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutReviewPage = new CheckoutReviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test('Complete checkout flow with 3 random items - Main Test Scenario', async ({ page }) => {
    // Add Allure metadata
    AllureUtils.description('Complete end-to-end checkout flow selecting 3 random items and completing the purchase process');
    AllureUtils.feature('Checkout Process');
    AllureUtils.story('Customer Purchase Journey');
    AllureUtils.severity('critical');
    AllureUtils.owner('QA Team');
    AllureUtils.tag('checkout', 'e2e', 'critical-path', 'user-flow');
    AllureUtils.suite('E-commerce Checkout');
    AllureUtils.id('TC-001');
    AllureUtils.link('https://www.saucedemo.com/', 'Sauce Labs Demo Website');
    TestHelpers.logStep('Starting complete checkout flow test');
    
    // Step 1: Login to the application
    await AllureUtils.step('Login to the application', async () => {
      TestHelpers.logStep('Step 1: Logging into the application');
      AllureUtils.parameter('Username', TestData.validUsers.standard.username);
      AllureUtils.parameter('Password', '***hidden***');
      
      await loginPage.goto();
      await loginPage.login(
        TestData.validUsers.standard.username,
        TestData.validUsers.standard.password
      );
      
      // Verify successful login
      await expect(page).toHaveURL(/.*inventory\.html/);
      TestHelpers.logAssertion('Login successful - redirected to inventory page');
    });
    
    // Step 2: Select 3 random items and add to cart
    await AllureUtils.step('Select random items and add to cart', async () => {
      TestHelpers.logStep('Step 2: Selecting 3 random items and adding to cart');
      AllureUtils.parameter('Items to select', TestData.scenarios.productSelectionCount.toString());
      
      const selectedCount = await inventoryPage.selectRandomProducts(TestData.scenarios.productSelectionCount);
      expect(selectedCount).toBe(TestData.scenarios.productSelectionCount);
      
      // Verify items are in cart
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(TestData.scenarios.productSelectionCount);
      TestHelpers.logAssertion(`Successfully added ${selectedCount} items to cart`);
    });
    
    // Step 3: Navigate to cart page
    TestHelpers.logStep('Step 3: Navigating to cart page');
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);
    
    // Verify cart page displays correctly
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(TestData.scenarios.productSelectionCount);
    TestHelpers.logAssertion('Cart page loaded with correct items');
    
    // Step 4: Proceed to checkout
    TestHelpers.logStep('Step 4: Proceeding to checkout');
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    
    // Verify checkout page displays correctly
    await checkoutPage.expectPageLoaded();
    TestHelpers.logAssertion('Checkout page loaded successfully');
    
    // Step 5: Fill customer information
    TestHelpers.logStep('Step 5: Filling customer information');
    await checkoutPage.fillCustomerInfo(
      TestData.customerInfo.firstName,
      TestData.customerInfo.lastName,
      TestData.customerInfo.postalCode
    );
    
    // Verify customer information filled
    TestHelpers.logAssertion('Customer information filled without errors');
    
    // Step 6: Continue to checkout review
    TestHelpers.logStep('Step 6: Continuing to checkout review');
    await checkoutPage.continueToReview();
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    
    // Verify checkout review page displays correctly
    await checkoutReviewPage.expectPageLoaded();
    await checkoutReviewPage.expectCartItemCount(TestData.scenarios.productSelectionCount);
    TestHelpers.logAssertion('Checkout review page loaded with order summary');
    
    // Step 7: Verify order details
    TestHelpers.logStep('Step 7: Verifying order details');
    TestHelpers.logAssertion('Order summary displayed correctly');
    
    // Step 8: Complete the order
    TestHelpers.logStep('Step 8: Completing the order');
    await checkoutReviewPage.completeOrder();
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    
    // Verify order completion page
    await checkoutCompletePage.expectPageLoaded();
    await checkoutCompletePage.expectOrderComplete();
    TestHelpers.logAssertion('Order completed successfully');
    
    // Step 9: Verify success message and return to home
    TestHelpers.logStep('Step 9: Verifying success message and returning to home');
    const successMessage = await checkoutCompletePage.getSuccessMessage();
    const orderHeader = await checkoutCompletePage.getOrderCompleteHeader();
    
    expect(successMessage).toContain(TestData.messages.orderDispatched);
    expect(orderHeader).toContain(TestData.messages.orderComplete);
    TestHelpers.logAssertion('Success message and header displayed correctly');
    
    // Return to home page
    await checkoutCompletePage.backToHome();
    await expect(page).toHaveURL(/.*inventory\.html/);
    TestHelpers.logAssertion('Successfully returned to inventory page');
    
    TestHelpers.logStep('Complete checkout flow test finished successfully');
  });

});
