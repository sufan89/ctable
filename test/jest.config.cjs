module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/..'], // Go up to the project root
  testMatch: [
    '**/test/unit/finalVerification.test.+(ts|tsx|js)'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts}',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.test.json'
    }]
  }
};