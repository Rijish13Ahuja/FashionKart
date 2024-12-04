import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../user/CartContext';
import LoginModal from '../auth/LoginModal';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const navigate = useNavigate();
  const { items } = useCart();

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially set filtered products to all fetched products
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleGuardedAction = (action: () => void) => {
    if (!user) {
      setModalType('login');
      setShowModal(true);
    } else {
      action();
    }
  };

  const handleLogin = (newUser: { name: string; email: string }) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-blue-600 px-4 py-2 flex justify-between items-center text-white shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png"
          alt="Logo"
          className="w-16 h-auto"
        />
        <div className="text-xs">
          <p className="text-gray-200">Deliver to</p>
          <p className="font-semibold text-white">Gurugram 122017</p>
        </div>
      </div>

      <div className="flex-1 mx-6 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search FashionKart.in"
          className="w-full pl-10 pr-3 py-1 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>

        {searchQuery && filteredProducts.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 z-10 max-h-64 overflow-y-auto">
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)} // Navigate to product details
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-sm font-bold hover:text-yellow-400 transition-colors"
          >
            {user ? `Hello, ${user.name}` : 'Hello, Sign in'}
            <br />
            <span className="font-semibold">Account & Lists</span>
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 bg-white text-gray-700 rounded-lg shadow-md w-48 z-10">
              <ul className="py-2">
                <li
                  onClick={() => handleGuardedAction(() => navigate('/profile'))}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={() => handleGuardedAction(() => navigate('/settings'))}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Settings
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => handleGuardedAction(() => navigate('/orders'))}
            className="hover:text-yellow-400 transition-colors text-sm font-bold"
          >
            Returns
            <br />
            <span className="font-semibold">& Orders</span>
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => handleGuardedAction(() => navigate('/cart'))}
            className="flex items-center space-x-1 hover:text-yellow-400 transition-colors text-sm font-bold"
          >
            <span>Cart</span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              alt="Cart"
              className="w-4 h-4"
            />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {showModal && (
        <LoginModal
          modalType={modalType}
          handleLogin={handleLogin}
          closeModal={() => setShowModal(false)}
          setModalType={setModalType}
        />
      )}
    </header>
  );
};

export default Header;
