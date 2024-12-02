import React, { useState } from 'react';

interface LoginModalProps {
  modalType: 'login' | 'register' | null;
  handleLogin: () => void;
  handleRegister: () => void;
  closeModal: () => void;
  setModalType: React.Dispatch<React.SetStateAction<'login' | 'register' | null>>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  modalType,
  handleLogin,
  handleRegister,
  closeModal,
  setModalType,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'login') {
      handleLogin();
      showConfirmationPopup('Logged in successfully!');
    } else if (modalType === 'register') {
      if (password === confirmPassword) {
        handleRegister();
        showConfirmationPopup('Account created successfully!');
      } else {
        alert('Passwords do not match!');
      }
    }
  };

  const showConfirmationPopup = (message: string) => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-100 text-green-700 border border-green-400 rounded-lg px-4 py-2 text-center shadow-lg">
            {modalType === 'login' ? 'Logged in successfully!' : 'Account created successfully!'}
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

        {/* Toggle Buttons */}
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
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {modalType === 'register' && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
            >
              {modalType === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Footer */}
        {modalType === 'login' && (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button
              onClick={() => setModalType('register')}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </button>
          </div>
        )}
        {modalType === 'register' && (
          <div className="px-6 py-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => setModalType('login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
