import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Checkout from '../../../components/user/Checkout';
import { CartProvider } from '../../../components/user/CartContext';
//import '@testing-library/jest-dom';
import {act} from 'react';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

const MockCartContext = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('Checkout Component', () => {
  test('should clear the cart and redirect after order is placed', async () => {
    // console.log(Checkout)
    // console.log(MemoryRouter)
    // console.log(MockCartContext)
    render(
      <MemoryRouter>
        <MockCartContext>
          <Checkout />
        </MockCartContext>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Place Order/i));

    await waitFor(() => expect(screen.queryByText('Product 1')).toBeNull());
  });
});
