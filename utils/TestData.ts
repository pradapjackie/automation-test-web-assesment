export const TestData = {
  // Valid user credentials for successful checkout
  validUsers: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    }
  },

  // Customer information for checkout
  customerInfo: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },

  // Test scenarios
  scenarios: {
    productSelectionCount: 3,
    timeout: 10000
  },

  // Expected messages for successful checkout
  messages: {
    orderComplete: 'Thank you for your order!',
    orderDispatched: 'Your order has been dispatched'
  }
};
