// __mocks__/react-lottie.tsx
import React from 'react';

// Mock the Lottie component
const Lottie = ({ options }: { options: any }) => {
  return <div data-testid="lottie-mock">Lottie Animation</div>;
};

export default Lottie;
