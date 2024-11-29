import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode; 
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-indigo-900 text-white p-6">
        <h2 className="text-3xl font-semibold mb-8">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link to="/admin" className="text-lg hover:text-indigo-300">Dashboard</Link></li>
            <li><Link to="/admin/products" className="text-lg hover:text-indigo-300">Product Management</Link></li>
            <li><Link to="/admin/orders" className="text-lg hover:text-indigo-300">Order Management</Link></li>
            <li><Link to="/admin/users" className="text-lg hover:text-indigo-300">User Management</Link></li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
