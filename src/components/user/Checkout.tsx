import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lottie from 'react-lottie';
import successAnimation from '../../animations/success.json';
import { checkoutValidationSchema } from '../../utils/CheckoutValidations'; // Import the validation schema

const Checkout: React.FC = () => {
  const { items, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async () => {
    try {
      // Validate the checkout inputs
      await checkoutValidationSchema.validate({ address, paymentMethod });

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = { items, total, address, paymentMethod, date: new Date() };
      localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));

      setOrderPlaced(true);
      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 4000);
    } catch (error: any) {
      // Display validation error
      toast.error(error.message);
    }
  };

  if (orderPlaced) {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: successAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Lottie options={defaultOptions} height={400} width={400} />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Your Order Has Been Placed!
          </h2>
          <p className="text-gray-600 mt-2">Thank you for shopping with us.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Delivery Address:
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full address"
              rows={3}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Payment Method:
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="UPI">UPI</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary:</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-md shadow"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-right font-bold text-lg mt-6 border-t pt-4">
            Total: ₹{total.toFixed(2)}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg text-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
