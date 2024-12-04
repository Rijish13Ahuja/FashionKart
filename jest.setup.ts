// Mock matchMedia to avoid errors related to media queries in Jest
global.matchMedia = global.matchMedia || function() {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
  