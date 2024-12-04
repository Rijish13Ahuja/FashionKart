// jest.config.ts (using CommonJS syntax)
const config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^axios$': '<rootDir>/__mocks__/axios.ts',
    '^react-slick$': '<rootDir>/__mocks__/react-slick.tsx', // Mock react-slick
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

module.exports = config;  // Use module.exports for CommonJS
