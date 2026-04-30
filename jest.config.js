/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/test/app/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  // Increase timeout for integration tests that start a real CDS server
  testTimeout: 30000,
};
