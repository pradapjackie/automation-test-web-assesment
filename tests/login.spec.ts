import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestData } from '../utils/TestData';
import { TestHelpers } from '../utils/TestHelpers';

test.describe('Login Functionality Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    TestHelpers.logStep('Navigated to login page');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    TestHelpers.logStep('Attempting login with valid credentials');
    
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );

    // Verify successful login by checking URL change
    await expect(page).toHaveURL(/.*inventory\.html/);
    TestHelpers.logAssertion('Login successful - redirected to inventory page');
  });
});
