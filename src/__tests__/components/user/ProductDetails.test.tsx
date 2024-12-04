import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductDetails from '../../../components/ProductDetails'; // Import your component
import { BrowserRouter as Router } from 'react-router-dom'; // Make sure to wrap with Router if using routing

test('navigates to checkout when "Buy Now" button is clicked', async () => {
  render(
    <Router>
      <ProductDetails />
    </Router>
  );

  // Wait for the "Buy Now" button to be rendered, because it might take some time for the product details to load
  const buyNowButton = await screen.findByText('Buy Now');
  
  fireEvent.click(buyNowButton);
  
  // Check if navigation has occurred, assuming you are using a router
  // This could be a mock function to test navigation
  expect(window.location.pathname).toBe('/checkout'); // Update based on your actual routing setup
});

test('displays "Out of stock" when product is out of stock', async () => {
  render(
    <Router>
      <ProductDetails />
    </Router>
  );

  // Wait for the "Out of stock" message to be displayed
  expect(await screen.findByText('Out of stock')).toBeInTheDocument();
});
