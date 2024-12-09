import React, { useEffect, useState } from 'react'; 
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../services/OrderService';
import { orderValidationSchema } from '../admin/validations/orderValidations';
import * as Yup from 'yup';
import { useCart } from '../../components/user/CartContext'; // Importing CartContext

const OrderManagement: React.FC = () => {
  const { user } = useCart(); // Access user from the context
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.userId) { 
        const ordersData = await getAllOrders(user.userId);
        setOrders(ordersData);
        setLoading(false);
      } else {
        alert("User not found. Please log in.");
      }
    };

    fetchOrders();
  }, [user]); 

  const handleUpdateStatus = async (id: number, status: string) => {
    const orderToUpdate = orders.find((order) => order.id === id);

    if (orderToUpdate) {
      try {
        await orderValidationSchema.validate({
          id: orderToUpdate.id,
          customerName: orderToUpdate.customerName,
          total: orderToUpdate.total,
          status,
        });

        await updateOrderStatus(id, status);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status } : order
          )
        );
        setShowModal(false);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          alert(`Validation Error: ${error.message}`);
        } else {
          alert('An unknown error occurred.');
        }
      }
    }
  };

  const handleDeleteOrder = async (id: number) => {
    await deleteOrder(id);
    setOrders(orders.filter((order) => order.id !== id));
    setShowModal(false);
  };

  const openModal = (id: number, action: string) => {
    setSelectedOrderId(id);
    setActionType(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrderId(null);
    setActionType('');
    setShowModal(false);
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
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  Order ID: {order.id}
                </h3>
                <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                <p className="text-sm text-gray-600">Total: ${order.total}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => openModal(order.id, 'markAsShipped')}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => openModal(order.id, 'delete')}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {actionType === 'markAsShipped' ? 'Mark Order as Shipped' : 'Delete Order'}
            </h3>
            <p className="text-gray-600">
              Are you sure you want to{' '}
              {actionType === 'markAsShipped'
                ? 'mark this order as shipped'
                : 'delete this order'}?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (actionType === 'markAsShipped' && selectedOrderId) {
                    handleUpdateStatus(selectedOrderId, 'Shipped');
                  } else if (actionType === 'delete' && selectedOrderId) {
                    handleDeleteOrder(selectedOrderId);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {actionType === 'markAsShipped' ? 'Mark as Shipped' : 'Delete Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
