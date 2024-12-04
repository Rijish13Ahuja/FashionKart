import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider } from '../../../components/user/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Checkout from '../../../components/user/Checkout';
import { toast } from 'react-toastify';
import { checkoutValidationSchema } from '../../../utils/CheckoutValidations';

jest.mock('../../../utils/CheckoutValidations', () => ({
  checkoutValidationSchema: {
    validate: jest.fn(),
  },
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('Checkout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = () => (
    <Router>
      <CartProvider>
        <Checkout />
      </CartProvider>
    </Router>
  );

  test('should render checkout form', () => {
    render(<TestComponent />);
    expect(screen.getByLabelText('Delivery Address:')).toBeInTheDocument();
    expect(screen.getByLabelText('Payment Method:')).toBeInTheDocument();
    expect(screen.getByText('Place Order')).toBeInTheDocument();
  });

  test('should handle successful order submission', async () => {
    (checkoutValidationSchema.validate as jest.Mock).mockResolvedValueOnce(true);

    render(<TestComponent />);

    fireEvent.change(screen.getByLabelText('Delivery Address:'), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByLabelText('Payment Method:'), { target: { value: 'Credit Card' } });

    fireEvent.click(screen.getByText('Place Order'));

    await waitFor(() => expect(toast.success).toHaveBeenCalled());
  });

  test('should display validation errors for invalid inputs', async () => {
    (checkoutValidationSchema.validate as jest.Mock).mockRejectedValueOnce({
      name: 'ValidationError',
      inner: [{ message: 'Address is required' }],
    });

    render(<TestComponent />);

    fireEvent.click(screen.getByText('Place Order'));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Address is required'));
  });

  test('should handle unexpected errors', async () => {
    (checkoutValidationSchema.validate as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));

    render(<TestComponent />);

    fireEvent.click(screen.getByText('Place Order'));

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('An unexpected error occurred. Please try again later.'));
  });
});
