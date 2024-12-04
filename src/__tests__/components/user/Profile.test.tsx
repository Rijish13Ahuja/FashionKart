import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../../../components/user/Profile';
import { toast } from 'react-toastify';
import { profileValidationSchema } from '../../../utils/ProfileValidations';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}));

const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    length: 0,
    key: () => null,
  };
})();
global.localStorage = mockLocalStorage;

describe('Profile Component', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: ['123 Main St', '456 Oak St'],
    notifications: {
      email: true,
      sms: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('user', JSON.stringify(mockUser));
  });

  test('renders profile information correctly', () => {
    render(<Profile />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
  });

  test('can edit phone number', async () => {
    render(<Profile />);

    fireEvent.click(screen.getByText('Edit'));

    const input = screen.getByPlaceholderText('New Phone');
    fireEvent.change(input, { target: { value: '0987654321' } });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Phone number updated successfully!'));

    expect(screen.getByText('0987654321')).toBeInTheDocument();
  });

  test('handles phone number validation errors', async () => {
    render(<Profile />);

    jest.spyOn(profileValidationSchema, 'validate').mockRejectedValueOnce(new Error('Invalid phone number'));

    fireEvent.click(screen.getByText('Edit'));

    const input = screen.getByPlaceholderText('New Phone');
    fireEvent.change(input, { target: { value: 'invalid' } });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Invalid phone number'));
  });

  test('can add a new address', async () => {
    render(<Profile />);

    const addressInput = screen.getByPlaceholderText('Add new address');
    fireEvent.change(addressInput, { target: { value: '789 Pine St' } });

    fireEvent.click(screen.getByText('Add Address'));

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Address added successfully!'));

    expect(screen.getByText('789 Pine St')).toBeInTheDocument();
  });

  test('can delete an address', async () => {
    render(<Profile />);

    fireEvent.click(screen.getAllByText('Delete')[0]);

    await waitFor(() => expect(toast.info).toHaveBeenCalledWith('Address removed successfully.'));

    expect(screen.queryByText('123 Main St')).not.toBeInTheDocument();
  });

  test('can change password', async () => {
    render(<Profile />);

    fireEvent.click(screen.getByText('Account Settings'));

    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm New Password');

    fireEvent.change(newPasswordInput, { target: { value: 'newpassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword123' } });

    fireEvent.click(screen.getByText('Change Password'));

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Password changed successfully!'));
  });

  test('can toggle notification preferences', async () => {
    render(<Profile />);

    const emailCheckbox = screen.getByLabelText('Email Notifications') as HTMLInputElement;
    fireEvent.click(emailCheckbox);

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Notification preferences updated!'));

    expect(emailCheckbox.checked).toBe(false);

    const smsCheckbox = screen.getByLabelText('SMS Notifications') as HTMLInputElement;
    fireEvent.click(smsCheckbox);

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Notification preferences updated!'));

    expect(smsCheckbox.checked).toBe(true);
  });
});
