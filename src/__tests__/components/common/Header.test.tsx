import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '../../../components/user/CartContext';
import Header from '../../../components/common/Header';
import '@testing-library/jest-dom';

jest.mock('../../../components/auth/LoginModal', () => {
  return jest.fn(() => <div>Mocked Login Modal</div>);
});

beforeEach(() => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
});

test('should render the header with account info when user is logged in', () => {
  render(
    <Router>
      <CartProvider>
        <Header />
      </CartProvider>
    </Router>
  );
  expect(screen.getByText(/Hello, John Doe/)).toBeInTheDocument();
});

test('should render the header with "Hello, Sign in" when user is not logged in', () => {
  localStorage.removeItem('user');
  render(
    <Router>
      <CartProvider>
        <Header />
      </CartProvider>
    </Router>
  );
  expect(screen.getByText(/Hello, Sign in/)).toBeInTheDocument();
});

test('should toggle dropdown visibility when account button is clicked', async () => {
  render(
    <Router>
      <CartProvider>
        <Header />
      </CartProvider>
    </Router>
  );
  fireEvent.click(screen.getByText(/Account & Lists/));
  expect(await screen.findByText('Profile')).toBeInTheDocument();
  expect(await screen.findByText('Settings')).toBeInTheDocument();
  expect(await screen.findByText('Logout')).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Account & Lists/));
  expect(screen.queryByText('Profile')).toBeNull();
  expect(screen.queryByText('Settings')).toBeNull();
  expect(screen.queryByText('Logout')).toBeNull();
});

test('should not show cart count when cart is empty', () => {
  render(
    <Router>
      <CartProvider>
        <Header />
      </CartProvider>
    </Router>
  );
  expect(screen.queryByText('1')).toBeNull();
});

test('should navigate to profile page when "Profile" is clicked in the dropdown', () => {
  render(
    <Router>
      <CartProvider>
        <Header />
      </CartProvider>
    </Router>
  );
  fireEvent.click(screen.getByText(/Account & Lists/));
  fireEvent.click(screen.getByText('Profile'));
  expect(window.location.pathname).toBe('/profile');
});

test('should navigate to cart page when "Cart" is clicked', () => {
  render(
    <Router>
      <CartProvider>
        <Header />
      </CartProvider>
    </Router>
  );
  fireEvent.click(screen.getByText('Cart'));
  expect(window.location.pathname).toBe('/cart');
});

test('should handle logout and remove user from localStorage', () => {
  render(
    <Router>
      <CartProvider>
        <Header />
      </CartProvider>
    </Router>
  );
  fireEvent.click(screen.getByText('Account & Lists'));
  fireEvent.click(screen.getByText('Logout'));
  expect(localStorage.getItem('user')).toBeNull();
  expect(screen.getByText('Hello, Sign in')).toBeInTheDocument();
});

test('should show filtered product list based on search query', async () => {
  render(
    <Router>
      <CartProvider>
        <Header />
      </CartProvider>
    </Router>
  );
  const searchInput = screen.getByPlaceholderText('Search FashionKart.in');
  fireEvent.change(searchInput, { target: { value: 'headphone' } });
  expect(await screen.findByText('Wireless Headphones')).toBeInTheDocument();
});
