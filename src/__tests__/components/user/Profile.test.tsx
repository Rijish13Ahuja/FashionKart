import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../../../components/user/Profile'; 
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';

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

test('should handle adding new address', async () => {
  render(<Profile />);

  fireEvent.click(screen.getByText('Address Book'));

  const addressInput = screen.getByPlaceholderText('Add new address');
  fireEvent.change(addressInput, { target: { value: '456 New St' } });
  fireEvent.click(screen.getByText('Add Address'));

  await waitFor(() => {
    expect(screen.getByText('456 New St')).toBeInTheDocument();
  });
});

test('should handle deleting an address', async () => {
  render(<Profile />);

  fireEvent.click(screen.getByText('Address Book'));

  fireEvent.click(screen.getByText('Delete'));

  await waitFor(() => {
    expect(screen.queryByText('123 Main St')).not.toBeInTheDocument();
  });
});
