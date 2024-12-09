import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Order {
  id: string;
  user_id: number;
  products: {
    product_id: number;
    quantity: number;
    price: number;
  }[];
  total_amount: number;
  order_date: string;
  status: 'Completed' | 'Processing' | 'Cancelled' | 'Quality Check' | 'Product Dispatched' | 'Product Delivered';
}

const ReturnsAndOrders: React.FC = () => {
  const { user } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  const statusStages = [
    'Confirmed Order',
    'Processing Order',
    'Quality Check',
    'Product Dispatched',
    'Product Delivered',
  ];

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to view your orders.');
      return;
    }

    fetch(`http://localhost:3000/orders?user_id=${user.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to fetch orders.');
        setLoading(false);
      });
  }, [user]);

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'All') return true;
    return order.status === filterStatus;
  });

  const handleCancelOrder = (orderId: string) => {
    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Cancelled' }),
    })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: 'Cancelled' } : order
          )
        );
        toast.success('Order cancelled successfully.');
      })
      .catch(() => {
        toast.error('Failed to cancel order.');
      });
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast.info(`Downloading invoice for Order ID: ${orderId}`);
  };

  const getStatusIndex = (status: string) => {
    return statusStages.findIndex((stage) => stage === status);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>

        <div className="mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Orders</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">Loading your orders...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const activeStepIndex = getStatusIndex(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                      Order #{order.id}
                    </h2>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Date: {order.order_date}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Total: ₹{order.total_amount}
                  </p>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between items-center">
                      {statusStages.map((stage, index) => (
                        <div
                          key={index}
                          className={`flex flex-col items-center text-sm ${
                            activeStepIndex > index
                              ? 'text-green-600'
                              : activeStepIndex === index
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                              activeStepIndex > index
                                ? 'border-green-600 bg-green-100'
                                : activeStepIndex === index
                                ? 'border-blue-600 bg-blue-100'
                                : 'border-gray-400 bg-gray-100'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="mt-2 text-center">{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between space-x-4">
                    {order.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold text-gray-700">No orders found.</h3>
            <p className="text-sm text-gray-500 mt-2">
              You haven’t placed any orders yet.
            </p>
            <button
              onClick={() => window.location.replace('/')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnsAndOrders;
