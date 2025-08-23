import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the demo site to verify it's accessible
  await page.goto('https://www.saucedemo.com/');
  
  // Verify the page loads correctly
  await page.waitForSelector('[data-test="login-button"]');
  
  await browser.close();
}

export default globalSetup;
