import React from 'react';
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

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<div><Categories /><Carousel /><Sections /></div>} />
            <Route path="/about" element={<div>About Us</div>} />
            <Route path="/contact" element={<div>Contact Us</div>} />
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/products" element={<AdminLayout><ProductManagement /></AdminLayout>} />
            <Route path="/admin/orders" element={<AdminLayout><OrderManagement /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
