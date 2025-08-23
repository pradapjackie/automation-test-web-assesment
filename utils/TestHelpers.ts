import { Page, expect } from '@playwright/test';

export class TestHelpers {
  /**
   * Log test step information
   */
  static logStep(step: string) {
    console.log(`[STEP] ${step}`);
  }

  /**
   * Log test assertion information
   */
  static logAssertion(assertion: string) {
    console.log(`[ASSERTION] ${assertion}`);
  }
}
