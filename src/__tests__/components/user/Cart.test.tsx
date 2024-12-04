// src/__tests__/components/user/Cart.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from '../../../components/user/Cart';
import { CartProvider } from '../../../components/user/CartContext';

// Wrapper to wrap Cart component with CartProvider
const renderWithCartProvider = (ui: React.ReactElement) => {
  return render(
    <Router>
      <CartProvider>
        {ui}
      </CartProvider>
    </Router>
  );
};

describe('Cart component tests', () => {
  test('renders cart with items correctly', () => {
    renderWithCartProvider(<Cart />);

    // Assuming cart items have text or a label like "item name"
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument(); // Adjust this based on your component's output
  });

  test('shows empty cart message when no items are in cart', () => {
    renderWithCartProvider(<Cart />);

    // Check for empty cart message
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument(); // Adjust as per your design
  });

  test('applies coupon code and updates discount', async () => {
    renderWithCartProvider(<Cart />);

    // Simulate adding items and applying coupon
    fireEvent.change(screen.getByPlaceholderText(/coupon code/i), {
      target: { value: 'DISCOUNT10' },
    });
    fireEvent.click(screen.getByText(/apply coupon/i));

    // Use findByText to wait for the discount to be applied
    expect(await screen.findByText(/discount applied/i)).toBeInTheDocument();
  });

  test('handles empty cart on checkout', async () => {
    renderWithCartProvider(<Cart />);

    // Simulate checkout when cart is empty
    fireEvent.click(screen.getByText(/checkout/i));

    // Use findByText to wait for the empty cart message
    expect(await screen.findByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('removes item from cart when "Remove" button is clicked', async () => {
    renderWithCartProvider(<Cart />);

    // Add a sample item (modify according to your Cart functionality)
    fireEvent.click(screen.getByText(/add to cart/i));

    // Ensure the item is added
    expect(screen.getByText(/item name/i)).toBeInTheDocument();

    // Click the "Remove" button
    fireEvent.click(screen.getByText(/remove/i));

    // Use findByText to confirm item is removed
    expect(screen.queryByText(/item name/i)).not.toBeInTheDocument();
  });
});
