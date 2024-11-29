import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../services/OrderService';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getAllOrders();
      setOrders(ordersData);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    await updateOrderStatus(id, status);
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const handleDeleteOrder = async (id: number) => {
    await deleteOrder(id);
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div>Loading...</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700">Order ID: {order.id}</h3>
                <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                <p className="text-sm text-gray-600">Total: ${order.total}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
