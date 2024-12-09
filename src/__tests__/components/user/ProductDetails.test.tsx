import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from '../../../components/ProductDetails';
import { BrowserRouter as Router } from 'react-router-dom';

test('navigates to checkout when "Buy Now" button is clicked', async () => {
  render(
    <Router>
      <ProductDetails />
    </Router>
  );

  const buyNowButton = await screen.findByText('Buy Now');
  
  fireEvent.click(buyNowButton);
  
  expect(window.location.pathname).toBe('/checkout');
});

test('displays "Out of stock" when product is out of stock', async () => {
  render(
    <Router>
      <ProductDetails />
    </Router>
  );

  expect(await screen.findByText('Out of stock')).toBeInTheDocument();
});
