import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';
import Settings from '../../../components/user/Settings';
import { CartProvider } from '../../../components/user/CartContext';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div>Toast Container</div>,
}));

beforeEach(() => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    address: ['123 Main St'],
  };
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
});

test('should render notification preferences checkboxes', () => {
  render(
    <CartProvider>
      <Settings />
      <ToastContainer />
    </CartProvider>
  );
  expect(screen.getByLabelText('Receive notifications for order updates')).toBeInTheDocument();
  expect(screen.getByLabelText('Receive promotional emails')).toBeInTheDocument();
});

test('should render privacy settings checkbox', () => {
  render(
    <CartProvider>
      <Settings />
      <ToastContainer />
    </CartProvider>
  );
  expect(screen.getByLabelText('Show recommendations based on my activity')).toBeInTheDocument();
});

test('should render save and update buttons', () => {
  render(
    <CartProvider>
      <Settings />
      <ToastContainer />
    </CartProvider>
  );
  expect(screen.getByText('Save Settings')).toBeInTheDocument();
  expect(screen.getByText('Update Password')).toBeInTheDocument();
});
