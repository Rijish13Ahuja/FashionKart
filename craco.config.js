// craco.config.js
module.exports = {
    jest: {
      configure: {
        moduleNameMapper: {
          '^axios$': '<rootDir>/__mocks__/axios.ts',
          '^react-slick$': '<rootDir>/__mocks__/react-slick.tsx',
        },
        transform: {
          '^.+\\.(ts|tsx)$': 'ts-jest',
        },
      },
    },
  };
  