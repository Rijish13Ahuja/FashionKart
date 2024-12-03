import React, { useState } from 'react';

interface LoginModalProps {
  modalType: 'login' | 'register' | null;
  handleLogin: (newUser: { name: string; email: string }) => void;
  closeModal: () => void;
  setModalType: React.Dispatch<React.SetStateAction<'login' | 'register' | null>>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  modalType,
  handleLogin,
  closeModal,
  setModalType,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error' | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showPopup = (message: string, type: 'success' | 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage('');
      setPopupType(null);
    }, 3000); // Popup disappears after 3 seconds
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (modalType === 'register') {
      if (password !== confirmPassword) {
        showPopup('Passwords do not match!', 'error');
        return;
      }

      const newUser = { name, email, password };

      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          showPopup('Account created successfully!', 'success');
          setTimeout(closeModal, 3000); // Close modal after popup
        } else {
          throw new Error('Failed to register. Please try again.');
        }
      } catch (error) {
        showPopup(
          error instanceof Error ? error.message : 'An unknown error occurred during registration.',
          'error'
        );
      }
    } else if (modalType === 'login') {
      try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const existingUser = users.find(
          (user: any) => user.email === email && user.password === password
        );

        if (existingUser) {
          handleLogin({ name: existingUser.name, email: existingUser.email });
          showPopup('Logged in successfully!', 'success');
          setTimeout(closeModal, 3000); // Close modal after popup
        } else {
          showPopup('Invalid email or password!', 'error');
        }
      } catch (error) {
        showPopup(
          error instanceof Error ? error.message : 'An unknown error occurred during login.',
          'error'
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        {/* Popup Message */}
        {popupMessage && (
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-center shadow-lg ${
              popupType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {popupMessage}
          </div>
        )}

        {/* Modal Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {modalType === 'login' ? 'Welcome Back!' : 'Create Your Account'}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            ✖
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b">
          <button
            onClick={() => setModalType('login')}
            className={`w-1/2 py-3 text-center font-medium ${
              modalType === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setModalType('register')}
            className={`w-1/2 py-3 text-center font-medium ${
              modalType === 'register'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {modalType === 'register' && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2"
            >
              <img
                src={
                  showPassword
                    ? 'https://cdn-icons-png.flaticon.com/512/159/159604.png'
                    : 'https://cdn-icons-png.flaticon.com/512/159/159605.png'
                }
                alt={showPassword ? 'Hide Password' : 'Show Password'}
                width="20"
              />
            </button>
          </div>

          {modalType === 'register' && (
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2"
              >
                <img
                  src={
                    showPassword
                      ? 'https://cdn-icons-png.flaticon.com/512/159/159604.png'
                      : 'https://cdn-icons-png.flaticon.com/512/159/159605.png'
                  }
                  alt={showPassword ? 'Hide Password' : 'Show Password'}
                  width="20"
                />
              </button>
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
              {modalType === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
