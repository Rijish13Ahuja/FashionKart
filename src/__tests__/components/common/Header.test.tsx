import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
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
    <MemoryRouter>
      <CartProvider>
        <Header />
      </CartProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/Hello, John Doe/)).toBeInTheDocument();
});

test('should render the header with "Hello, Sign in" when user is not logged in', () => {
  localStorage.removeItem('user');
  render(
    <MemoryRouter>
      <CartProvider>
        <Header />
      </CartProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/Hello, Sign in/)).toBeInTheDocument();
});

test('should toggle dropdown visibility when account button is clicked', async () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Header />
      </CartProvider>
    </MemoryRouter>
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
    <MemoryRouter>
      <CartProvider>
        <Header />
      </CartProvider>
    </MemoryRouter>
  );
  expect(screen.queryByText('1')).toBeNull();
});

test('should show filtered product list based on search query', async () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Header />
      </CartProvider>
    </MemoryRouter>
  );
  const searchInput = screen.getByPlaceholderText('Search FashionKart.in');
  fireEvent.change(searchInput, { target: { value: 'headphone' } });
  expect(await screen.findByText('Wireless Headphones')).toBeInTheDocument();
});
