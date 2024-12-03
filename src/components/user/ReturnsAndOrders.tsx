import React, { useState } from 'react';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

interface Order {
  id: number;
  date: string;
  status: 'Delivered' | 'Canceled' | 'Processing';
  total: number;
  items: Array<{
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
}

const sampleOrders: Order[] = [
  {
    id: 1,
    date: '2023-11-30',
    status: 'Delivered',
    total: 120.5,
    items: [
      {
        id: 101,
        name: 'Wireless Headphones',
        image: 'https://via.placeholder.com/100',
        quantity: 1,
        price: 120.5,
      },
    ],
  },
  {
    id: 2,
    date: '2023-11-29',
    status: 'Canceled',
    total: 200,
    items: [
      {
        id: 102,
        name: 'Smartphone',
        image: 'https://via.placeholder.com/100',
        quantity: 1,
        price: 200,
      },
    ],
  },
];

const ReturnsAndOrders: React.FC = () => {
  const { addToCart } = useCart();
  const [orders] = useState<Order[]>(sampleOrders);
  const [filter, setFilter] = useState<'All' | 'Delivered' | 'Canceled' | 'Processing'>('All');
  const [supportModal, setSupportModal] = useState<{ orderId: number; show: boolean }>({
    orderId: 0,
    show: false,
  });

  const filteredOrders = orders.filter(
    (order) => filter === 'All' || order.status === filter
  );

  const handleReorder = (orderItems: Order['items']) => {
    orderItems.forEach((item) => addToCart(item));
    toast.success('Items added to cart for reorder!');
  };

  const handleDownloadInvoice = (orderId: number) => {
    const invoiceLink = document.createElement('a');
    invoiceLink.href = `/invoices/order_${orderId}.pdf`;
    invoiceLink.download = `Order_${orderId}_Invoice.pdf`;
    invoiceLink.click();
    toast.info('Invoice downloaded!');
  };

  const openSupportModal = (orderId: number) => {
    setSupportModal({ orderId, show: true });
  };

  const closeSupportModal = () => {
    setSupportModal({ orderId: 0, show: false });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Your Orders</h1>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="All">All Orders</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
            <option value="Processing">Processing</option>
          </select>
        </div>

        {/* Order List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800">Order #{order.id}</h2>
                  <p
                    className={`text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : order.status === 'Canceled'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-1">Placed on {order.date}</p>
                <p className="text-gray-800 font-medium mt-2">Total: ₹{order.total.toFixed(2)}</p>

                {/* Order Items */}
                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-gray-800 font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">
                          Quantity: {item.quantity} &middot; ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => handleReorder(order.items)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Reorder
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(order.id)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Download Invoice
                  </button>
                  <button
                    onClick={() => openSupportModal(order.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Support
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-700">You have no orders yet.</h3>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => window.location.replace('/')}
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Support Modal */}
        {supportModal.show && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                Support for Order #{supportModal.orderId}
              </h2>
              <textarea
                placeholder="Describe your issue"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeSupportModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    closeSupportModal();
                    toast.success('Support request sent!');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnsAndOrders;
