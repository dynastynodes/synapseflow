import { beforeAll, afterAll, afterEach } from 'vitest';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  // Global test setup
  console.log('Running test suite setup...');
});

afterAll(async () => {
  // Global test teardown
  console.log('Running test suite teardown...');
});

afterEach(() => {
  // Reset mocks after each test
});
