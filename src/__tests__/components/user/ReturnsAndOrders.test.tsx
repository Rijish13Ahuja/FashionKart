import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReturnsAndOrders from '../../../components/user/ReturnsAndOrders';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';
import { CartProvider } from '../../../components/user/CartContext';

beforeEach(() => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: ['123 Main St'],
  };
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
});

test('should render orders', () => {
  render(
    <CartProvider>
      <ReturnsAndOrders />
      <ToastContainer />
    </CartProvider>
  );

  expect(screen.getByText('Your Orders')).toBeInTheDocument();
  expect(screen.getByText('Order #1')).toBeInTheDocument();
  expect(screen.getByText('Order #2')).toBeInTheDocument();
});

test('should filter orders by status', () => {
  render(
    <CartProvider>
      <ReturnsAndOrders />
      <ToastContainer />
    </CartProvider>
  );

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Delivered' } });

  expect(screen.queryByText('Order #2')).not.toBeInTheDocument();
  expect(screen.getByText('Order #1')).toBeInTheDocument();

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Canceled' } });

  expect(screen.queryByText('Order #1')).not.toBeInTheDocument();
  expect(screen.getByText('Order #2')).toBeInTheDocument();

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'All' } });

  expect(screen.getByText('Order #1')).toBeInTheDocument();
  expect(screen.getByText('Order #2')).toBeInTheDocument();
});

test('should handle invoice download action', async () => {
  render(
    <CartProvider>
      <ReturnsAndOrders />
      <ToastContainer />
    </CartProvider>
  );

  const downloadButton = screen.getAllByText('Download Invoice')[0];
  fireEvent.click(downloadButton);

  await waitFor(() => {
    expect(screen.getByText('Invoice downloaded!')).toBeInTheDocument();
  });
});

test('should handle opening support modal', async () => {
  render(
    <CartProvider>
      <ReturnsAndOrders />
      <ToastContainer />
    </CartProvider>
  );

  const supportButton = screen.getAllByText('Support')[0];
  fireEvent.click(supportButton);

  await waitFor(() => {
    expect(screen.getByText('Support for Order #1')).toBeInTheDocument();
  });

  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);

  await waitFor(() => {
    expect(screen.queryByText('Support for Order #1')).not.toBeInTheDocument();
  });
});
