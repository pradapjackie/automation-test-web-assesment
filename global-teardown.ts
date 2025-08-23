import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Clean up any global test artifacts if needed
  console.log('Global teardown completed');
}

export default globalTeardown;
