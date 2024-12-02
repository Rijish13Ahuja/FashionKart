import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.warn('Your cart is empty!'); // Use toast for warning
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {items.length > 0 ? (
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 border p-4 rounded-lg shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 object-cover rounded"
              />
              <div className="flex-1 mx-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  ₹{item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 border rounded p-1"
                  min={1}
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <button
              onClick={clearCart}
              className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-6">
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Your cart is empty!</p>
      )}
    </div>
  );
};

export default Cart;
