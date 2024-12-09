import { render, screen } from '@testing-library/react';
import LogoutConfirmation from '../../../components/common/LogoutConfirmation';
import '@testing-library/jest-dom';

describe('LogoutConfirmation', () => {
  test('should render the logout confirmation message', () => {
    render(<LogoutConfirmation />);
    expect(screen.getByText('You have been logged out successfully!')).toBeInTheDocument();
    expect(screen.getByText('Redirecting to the homepage...')).toBeInTheDocument();
  });

  test('should render confirmation message in the correct styles', () => {
    render(<LogoutConfirmation />);
    const confirmationMessage = screen.getByText('You have been logged out successfully!');
    expect(confirmationMessage).toHaveClass('text-xl');
    expect(confirmationMessage).toHaveClass('font-semibold');
  });

  test('should render modal text correctly', () => {
    render(<LogoutConfirmation />);
    const modalText = screen.getByText('Redirecting to the homepage...');
    expect(modalText).toHaveClass('text-gray-600');
    expect(modalText).toHaveClass('mt-2');
  });

  test('should have correct modal heading', () => {
    render(<LogoutConfirmation />);
    const heading = screen.getByRole('heading', { name: /You have been logged out successfully!/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-gray-800');
  });
});
