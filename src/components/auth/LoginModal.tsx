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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'login') {
      handleLogin();
    } else if (modalType === 'register') {
      if (password === confirmPassword) {
        handleRegister();
      } else {
        alert('Passwords do not match!');
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setModalType('login')}
            className={`w-1/2 py-2 text-center font-medium text-lg ${
              modalType === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setModalType('register')}
            className={`w-1/2 py-2 text-center font-medium text-lg ${
              modalType === 'register'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        {modalType === 'login' ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-md mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="text-red-500"
              >
                Close
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-md mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 border rounded-md mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="text-red-500"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
