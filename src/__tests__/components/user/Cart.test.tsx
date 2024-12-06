import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';  
import Cart from '../../../components/user/Cart';  
import { CartProvider } from '../../../components/user/CartContext'; 
import '@testing-library/jest-dom';

const MockCartContext = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('Cart Component', () => {
  test('displays empty cart state when no items in the cart', () => {
    render(
      <MemoryRouter> 
        <MockCartContext>
          <Cart />
        </MockCartContext>
      </MemoryRouter>
    );

    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });
});
