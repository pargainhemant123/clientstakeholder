// jest.config.js
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.js'],
    moduleFileExtensions: ['js', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Ensure this path is correct
    coverageDirectory: 'coverage',
    collectCoverage: true,
  };
  