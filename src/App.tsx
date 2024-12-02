import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Carousel from './components/Corousel';
import Sections from './components/Sections';
import Footer from './components/Footer';
import Categories from './components/Categories';

import AdminLayout from './components/admin/AdminLayout';
import ProductManagement from './components/admin/ProductManagement';
import OrderManagement from './components/admin/OrderManagement';
import UserManagement from './components/admin/UserManagement';
import AdminDashboard from './components/admin/AdminDashboard';

import Profile from './components/user/Profile'; // Import Profile Component
import Settings from './components/user/Settings'; // Import Settings Component
import LogoutConfirmation from './components/common/LogoutConfirmation'; // Import Logout Confirmation
import ProductListing from './components/ProductListing'; // Import ProductListing Component
import ProductDetails from './components/ProductDetails'; // Import ProductDetails Component
import Cart from './components/user/Cart'; // Import Cart Component
import Checkout from './components/user/Checkout'; // Import Checkout Component
import { CartProvider } from './components/user/CartContext'; // Import CartContext

import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div>
          {/* ToastContainer for global toast notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<div><Categories /><Carousel /><Sections /></div>} />
              <Route path="/about" element={<div>About Us</div>} />
              <Route path="/contact" element={<div>Contact Us</div>} />
              <Route path="/products" element={<ProductListing />} /> {/* Products Listing Page */}
              <Route path="/products/:id" element={<ProductDetails />} /> {/* Product Details Page */}

              {/* User Routes */}
              <Route path="/profile" element={<Profile />} /> {/* User Profile */}
              <Route path="/settings" element={<Settings />} /> {/* User Settings */}
              <Route path="/logout-confirmation" element={<LogoutConfirmation />} /> {/* Logout Confirmation */}
              <Route path="/cart" element={<Cart />} /> {/* Cart Page */}
              <Route path="/checkout" element={<Checkout />} /> {/* Checkout Page */}

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/products" element={<AdminLayout><ProductManagement /></AdminLayout>} />
              <Route path="/admin/orders" element={<AdminLayout><OrderManagement /></AdminLayout>} />
              <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
