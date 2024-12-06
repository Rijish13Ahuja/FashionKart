import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkoutValidationSchema } from '../../utils/CheckoutValidations';

const Checkout: React.FC = () => {
  const { items, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [prize, setPrize] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const prizes = [
    '10% off on next order',
    'Free shipping on next order',
    '₹100 off',
    '₹200 off',
    'No Luck',
    'Surprise Gift',
  ];

  const handleSubmit = async () => {
    try {
      await checkoutValidationSchema.validate({ address, paymentMethod }, { abortEarly: false });

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = { items, total, address, paymentMethod, date: new Date() };
      localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));

      toast.success('Order placed successfully!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });

      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        error.inner.forEach((err: any) => {
          toast.error(err.message, {
            position: 'top-center',
            autoClose: 3000,
            theme: 'colored',
          });
        });
      } else {
        toast.error('An unexpected error occurred. Please try again later.', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        });
      }
    }
  };

  const handleSpin = () => {
    if (hasSpun) {
      toast.error('You can only spin the wheel once!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    setTimeout(() => {
      setIsSpinning(false);
      setPrize(prizes[randomIndex]);
      setHasSpun(true);
      toast.success(`Congratulations! You won: ${prizes[randomIndex]}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'colored',
      });
    }, 3000);
  };

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

        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Spin the Wheel for Your Next Order</h2>
          <div
            className={`relative w-64 h-64 mx-auto rounded-full border-4 border-gray-300 overflow-hidden shadow-lg ${
              isSpinning ? 'animate-spin-slow' : ''
            }`}
            style={{
              background: 'conic-gradient(#FF5733 0% 16.6%, #33FF57 16.6% 33.3%, #3357FF 33.3% 50%, #FF33A6 50% 66.6%, #FFD433 66.6% 83.3%, #33FFD4 83.3% 100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg"
              >
                Spin Now
              </button>
            </div>
          </div>
          {prize && <p className="text-lg font-semibold text-gray-800 mt-4 text-center">You won: {prize}</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
