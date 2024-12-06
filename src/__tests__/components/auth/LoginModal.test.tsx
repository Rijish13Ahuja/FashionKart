import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from '../../../components/auth/LoginModal';

const mockHandleLogin = jest.fn();
const mockCloseModal = jest.fn();
const mockSetModalType = jest.fn();

describe('LoginModal Component', () => {
  beforeEach(() => {
    mockHandleLogin.mockClear();
    mockCloseModal.mockClear();
    mockSetModalType.mockClear();
  });

  it('should close the modal when the close button is clicked', () => {
    render(
      <LoginModal
        modalType="login"
        handleLogin={mockHandleLogin}
        closeModal={mockCloseModal}
        setModalType={mockSetModalType}
      />
    );

    const closeButton = screen.getByRole('button', { name: '✖' });
    fireEvent.click(closeButton);
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
