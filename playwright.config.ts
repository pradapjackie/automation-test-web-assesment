import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporters configuration
  // Terminal reporters: 'list' (detailed), 'line' (compact), 'dot' (minimal)
  // HTML reporter: open: 'never' disables auto-opening, 'on-failure' opens only on failures, 'always' always opens
  reporter: [
    // Choose your preferred terminal reporter:
    ['list'], // Detailed with colors, checkmarks, and full test names
    // ['line'], // Compact with colors and test progress
    // ['dot'], // Minimal with colored dots for pass/fail
    
    ['html', { 
      open: 'never',
      outputFolder: 'playwright-report'
    }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
      testCaseId: true,
      testCaseName: true,
      testCaseStatus: true,
      testCaseDuration: true,
      testCaseRetries: true
    }],
    ['pakoda-report-playwright', { outputDir: 'pakoda-report' }]
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  outputDir: 'test-results/',
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
});
