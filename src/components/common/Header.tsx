import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../auth/LoginModal';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);

  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownClick = (action: 'profile' | 'orders' | 'settings' | 'logout') => {
    if (!isLoggedIn) {
      setModalType('login');
      setShowModal(true);
    } else {
      switch (action) {
        case 'profile':
          navigate('/profile');
          break;
        case 'orders':
          navigate('/orders');
          break;
        case 'settings':
          navigate('/settings');
          break;
        case 'logout':
          setIsLoggedIn(false);
          alert("You have logged out.");
          break;
      }
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleRegister = () => {
    alert("Registration feature coming soon.");
  };

  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png"
          alt="Logo"
          className="w-24 h-auto"
        />
      </div>

      <div className="flex-1 mx-4 max-w-xl">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full p-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-300 transition duration-200">Home</a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-200">About</a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-200">Services</a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-200">Contact</a>
        </nav>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200"
          >
            {isLoggedIn ? 'My Account' : 'Log In'}
          </button>

          {dropdownVisible && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48">
              <ul>
                <li onClick={() => handleDropdownClick('profile')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li onClick={() => handleDropdownClick('orders')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
                <li onClick={() => handleDropdownClick('settings')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li onClick={() => handleDropdownClick('logout')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <LoginModal
          modalType={modalType}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          closeModal={() => setShowModal(false)}
          setModalType={setModalType}
        />
      )}
    </header>
  );
};

export default Header;
