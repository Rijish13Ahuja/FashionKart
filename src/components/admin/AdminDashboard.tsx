import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Total Products</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-2">50</p>
            <p className="text-gray-500 mt-1">Total number of products in the inventory</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">120</p>
            <p className="text-gray-500 mt-1">Total number of orders placed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Pending Products</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">5</p>
            <p className="text-gray-500 mt-1">Products pending approval or restocking</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Products Overview</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <img src="https://via.placeholder.com/150" alt="product" className="w-full h-48 object-cover rounded-md mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">Apple iPhone 13</h4>
              <p className="text-sm text-gray-600">Electronics</p>
              <p className="text-lg font-bold text-indigo-600 mt-2">$799</p>
              <p className="text-sm text-gray-500">In Stock: 50</p>
              <div className="mt-4 flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Edit</button>
                <button className="text-red-600 hover:text-red-800 transition-colors duration-200">Delete</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <img src="https://via.placeholder.com/150" alt="product" className="w-full h-48 object-cover rounded-md mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">Samsung Galaxy S21</h4>
              <p className="text-sm text-gray-600">Electronics</p>
              <p className="text-lg font-bold text-indigo-600 mt-2">$699</p>
              <p className="text-sm text-gray-500">In Stock: 30</p>
              <div className="mt-4 flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Edit</button>
                <button className="text-red-600 hover:text-red-800 transition-colors duration-200">Delete</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
