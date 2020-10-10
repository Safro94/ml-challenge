module.exports = {
  roots: ['<rootDir>/src'],
  coverageReporters: ['text', 'html'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/testUtils/helpers.js',
    '<rootDir>/src/api/routes/',
    '<rootDir>/src/api/index.js',
  ],
};