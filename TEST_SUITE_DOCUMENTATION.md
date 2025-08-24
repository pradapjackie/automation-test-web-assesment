# Playwright TypeScript Test Suite Documentation

## Table of Contents

1. [Overview](#overview)
2. [Framework Architecture](#framework-architecture)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Test Suite Structure](#test-suite-structure)
6. [Running Tests](#running-tests)
7. [Allure Reporting](#allure-reporting)
8. [Docker Integration](#docker-integration)
9. [CI/CD Pipeline](#cicd-pipeline)

## Overview

This test suite automates the **Sauce Labs Demo Website** using Playwright with TypeScript. The framework focuses on the **successful checkout flow** scenario, implementing the Page Object Model (POM) design pattern for maintainable and scalable test automation.

### Test Coverage
- **Primary Focus**: Complete successful checkout flow with 3 random items
- **User Journey**: Login → Select Products → Add to Cart → Checkout → Complete Order
- **Browser Support**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **No Negative Scenarios**: Focuses only on successful user flows

## Framework Architecture

### Design Patterns
- **Page Object Model (POM)**: Separates test logic from page interactions
- **Test Data Management**: Centralized test data and configuration
- **Utility Classes**: Reusable helper functions and common operations
- **Modular Structure**: Organized by functionality for easy maintenance

### Project Structure
```
playwright-tests-assessment/
├── pages/                     # Page Object Model classes
│   ├── LoginPage.ts          # Login functionality
│   ├── InventoryPage.ts      # Product selection and cart
│   ├── CartPage.ts           # Cart management
│   ├── CheckoutPage.ts       # Customer information
│   ├── CheckoutReviewPage.ts # Order review
│   └── CheckoutCompletePage.ts # Order completion
├── tests/                     # Test specifications
│   ├── login.spec.ts         # Login tests
│   ├── inventory.spec.ts     # Product selection tests
│   ├── cart.spec.ts          # Cart navigation tests
│   └── checkout-flow.spec.ts # Complete checkout flow
├── utils/                     # Utility classes and helpers
│   ├── TestData.ts           # Centralized test data
│   ├── TestHelpers.ts        # Logging utilities
│   └── AllureUtils.ts        # Allure reporting utilities
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project overview
```

## Prerequisites

### System Requirements
- **Node.js**: Version 18.0.0 or higher
- **npm**: Package manager (comes with Node.js)
- **Git**: Version control system
- **Docker**: For Allure report generation (optional)

### Browser Requirements
- **Playwright Browsers**: Automatically installed during setup
- **System Dependencies**: Playwright handles OS-specific requirements

## Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd playwright-tests-assessment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npm run install:browsers
```

### 4. Verify Installation
```bash
npm run test:chrome:headless
```

## Test Suite Structure

### Core Test Files

#### `tests/login.spec.ts`
- **Purpose**: Validates successful login functionality
- **Test**: `should login successfully with valid credentials`
- **Coverage**: Login flow for checkout process

#### `tests/inventory.spec.ts`
- **Purpose**: Product selection and cart addition
- **Tests**: 
  - `should add products to cart for checkout`
  - `should navigate to cart page`
- **Coverage**: Random product selection (3 items)

#### `tests/cart.spec.ts`
- **Purpose**: Cart navigation and checkout initiation
- **Test**: `should proceed to checkout`
- **Coverage**: Cart to checkout transition

#### `tests/checkout-flow.spec.ts`
- **Purpose**: Complete end-to-end checkout flow
- **Test**: `Complete checkout flow with 3 random items - Main Test Scenario`
- **Coverage**: Full user journey from login to order completion

### Page Object Classes

#### `LoginPage.ts`
```typescript
export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  async goto(): Promise<void>;
  async login(username: string, password: string): Promise<void>;
}
```

#### `InventoryPage.ts`
```typescript
export class InventoryPage {
  readonly productItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  async selectRandomProducts(count: number): Promise<number>;
  async getCartItemCount(): Promise<number>;
  async goToCart(): Promise<void>;
}
```

#### `CartPage.ts`
```typescript
export class CartPage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  async getCartItemCount(): Promise<number>;
  async proceedToCheckout(): Promise<void>;
}
```

#### `CheckoutPage.ts`
```typescript
export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  async expectPageLoaded(): Promise<void>;
  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void>;
  async continueToReview(): Promise<void>;
}
```

#### `CheckoutReviewPage.ts`
```typescript
export class CheckoutReviewPage {
  readonly orderSummary: Locator;
  readonly finishButton: Locator;
  readonly cartItems: Locator;

  async expectPageLoaded(): Promise<void>;
  async getCartItemCount(): Promise<number>;
  async expectCartItemCount(expectedCount: number): Promise<void>;
  async completeOrder(): Promise<void>;
}
```

#### `CheckoutCompletePage.ts`
```typescript
export class CheckoutCompletePage {
  readonly successMessage: Locator;
  readonly orderCompleteHeader: Locator;
  readonly backHomeButton: Locator;

  async expectPageLoaded(): Promise<void>;
  async expectOrderComplete(): Promise<void>;
  async backToHome(): Promise<void>;
}
```

### Utility Classes

#### `TestData.ts`
```typescript
export const TestData = {
  validUsers: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    }
  },
  customerInfo: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  scenarios: {
    productSelectionCount: 3,
    timeout: 10000
  },
  messages: {
    orderComplete: 'Thank you for your order!',
    orderDispatched: 'Your order has been dispatched'
  }
};
```

#### `TestHelpers.ts`
```typescript
export class TestHelpers {
  static logStep(step: string): void;
  static logAssertion(assertion: string): void;
}
```

#### `AllureUtils.ts`
```typescript
export class AllureUtils {
  static description(text: string): void;
  static feature(name: string): void;
  static story(name: string): void;
  static severity(level: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void;
  static owner(name: string): void;
  static tag(...tags: string[]): void;
  static step(name: string, fn: () => void | Promise<void>): Promise<void>;
  // ... and more
}
```

## Running Tests

### Basic Test Execution

#### Run All Tests
```bash
npm test
```

#### Run Tests in Headed Mode (Visible Browser)
```bash
npm run test:headed
```

#### Run Tests in Headless Mode (Default)
```bash
npm run test:headless
```

### Browser-Specific Testing

#### Chrome (Headless)
```bash
npm run test:chrome:headless
```

#### Chrome (Headed)
```bash
npm run test:chrome:headed
```

#### Firefox
```bash
npx playwright test --project=firefox
```

#### Safari
```bash
npx playwright test --project=webkit
```

#### Mobile Chrome
```bash
npx playwright test --project='Mobile Chrome'
```

#### Mobile Safari
```bash
npx playwright test --project='Mobile Safari'
```

### UI Mode Testing

#### Open Playwright UI
```bash
npm run test:ui
```

#### UI Mode with Specific Browser
```bash
npm run test:ui:chrome
npm run test:ui:firefox
npm run test:ui:safari
npm run test:ui:mobile
```

#### UI Mode with All Browsers
```bash
npm run test:ui:all
```

### Debug Mode

#### Debug Specific Test
```bash
npm run test:debug
```

#### Debug with Code Generation
```bash
npm run codegen
```

## Allure Reporting

### Report Generation

#### Basic Report
```bash
npm run allure:generate
```

#### Report with History
```bash
npm run allure:history
```

#### CI Report
```bash
npm run allure:ci
```

### Viewing Reports

#### Open Allure Report
```bash
npm run allure:open
```

#### Serve Allure Report
```bash
npm run allure:serve
```

#### Open HTML Report
```bash
npm run report:open
```

### Report Features

#### Rich Metadata
- **Features**: Test functionality grouping
- **Stories**: User story mapping
- **Severity**: Test importance levels
- **Owners**: Test responsibility
- **Tags**: Custom categorization

#### Test Execution Details
- **Steps**: Detailed test flow
- **Parameters**: Input values and configuration
- **Attachments**: Screenshots, videos, logs
- **History**: Trend analysis over time

#### Visual Elements
- **Dashboard**: Test execution overview
- **Trends**: Performance and success rate trends
- **Categories**: Test result classification
- **Timeline**: Execution history

## Docker Integration

### Custom Allure Image

#### Image Details
- **Image**: `pradapjackie/allure-reports-generation:1.0`
- **Purpose**: Consistent Allure environment across platforms
- **Benefits**: No local Allure installation required

#### Local Usage
```bash
# Basic report generation
npm run allure:generate

# With history support
npm run allure:history
```

#### Manual Docker Commands
```bash
# Basic report generation
docker run --rm \
  -v "$PWD/allure-results:/app/allure-results" \
  -v "$PWD/allure-report:/app/allure-report" \
  pradapjackie/allure-reports-generation:1.0 \
  allure generate allure-results --clean

# With history support
docker run --rm \
  -v "$PWD/allure-results:/app/allure-results" \
  -v "$PWD/allure-report:/app/allure-report" \
  -v "$PWD/allure-history:/app/allure-history" \
  pradapjackie/allure-reports-generation:1.0 \
  allure generate allure-results --clean --report-dir allure-report --history-dir allure-history
```
 
## CI/CD Pipeline

### GitHub Actions Workflow

#### Workflow File
- **Location**: `.github/workflows/playwright.yml`
- **Trigger**: Manual workflow dispatch only
- **Browser Selection**: Choose specific browser or run all browsers

#### Three-Stage Pipeline

##### Stage 1: Test Execution
```yaml
test:
  name: Run Playwright Tests
  runs-on: ubuntu-latest
  timeout-minutes: 15
  
  # Browser selection via workflow_dispatch inputs
  # Options: all, chromium, firefox, webkit, mobile
```

**Key Features:**
- **Manual Trigger**: Only runs when manually triggered via Actions tab
- **Browser Selection**: Choose specific browser or run all browsers
- **Comprehensive Setup**: Node.js 18, npm ci, Playwright browsers
- **Network Testing**: Verifies connectivity to target website
- **Allure Integration**: Uses allure-playwright reporter from playwright.config.ts
- **Artifact Upload**: Uploads allure-results, test-results, screenshots, videos

##### Stage 2: Report Generation
```yaml
generate-report:
  name: Generate Allure Report
  needs: test
  runs-on: ubuntu-latest
  if: always() && (needs.test.result == 'success' || needs.test.result == 'failure')
```

**Key Features:**
- **Docker First**: Uses custom image `pradapjackie/allure-reports-generation:1.0`
- **Fallback Support**: Command line Allure if Docker fails
- **Result Validation**: Verifies allure-results before generation
- **Report Verification**: Confirms successful report creation
- **Artifact Management**: Uploads generated report for deployment

##### Stage 3: Deployment
```yaml
deploy:
  name: Deploy to GitHub Pages
  needs: generate-report
  runs-on: ubuntu-latest
  environment:
    name: github-pages
```

**Key Features:**
- **GitHub Pages**: Deploys Allure reports to GitHub Pages
- **Environment Configuration**: Uses github-pages environment
- **Concurrency Control**: Prevents conflicting deployments
- **Live Reports**: Reports accessible via GitHub Pages URL

#### Workflow Inputs

```yaml
workflow_dispatch:
  inputs:
    browsers:
      description: 'Select browsers to test'
      required: false
      default: 'all'
      type: choice
      options:
        - all
        - chromium
        - firefox
        - webkit
        - mobile
```

#### Execution Flow

1. **Manual Trigger**: Select workflow → Click "Run workflow" → Choose browser
2. **Test Execution**: Runs Playwright tests with selected browser(s)
3. **Result Collection**: Generates allure-results and other artifacts
4. **Report Generation**: Creates Allure HTML report using Docker or CLI
5. **GitHub Pages**: Deploys report to live URL for team access

 