import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cartValidationSchema } from '../../utils/CartValidations';
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingCart } from 'react-icons/fi';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, setDiscount, discount } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState<string | null>(null);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.warn('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const handleBackToShopping = () => {
    navigate('/');
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discount > 0 ? subtotal - discount : 0;
  };

  const applyCoupon = async () => {
    try {
      const trimmedCoupon = coupon?.trim() || '';
      await cartValidationSchema.validate({ coupon: trimmedCoupon });

      if (trimmedCoupon === 'SAVE10') {
        setDiscount(10);
        toast.success('Coupon applied! ₹10 discount added.');
      } else if (trimmedCoupon === 'SAVE50') {
        setDiscount(50);
        toast.success('Coupon applied! ₹50 discount added.');
      } else {
        setDiscount(0);
        toast.error('Invalid coupon code!');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto flex flex-wrap px-4 py-8 gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
          {items.length > 0 ? (
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 py-4 hover:shadow-md transition"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded-md shadow-md hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        ₹{item.price.toFixed(2)} x {item.quantity}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Qty:</span>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-12 border rounded-md p-1 text-center focus:ring-2 focus:ring-blue-500"
                          min={1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition shadow"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={clearCart}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-md"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleBackToShopping}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
                >
                  Back to Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <FiShoppingCart className="text-6xl text-gray-400 mx-auto mb-6" />
              <p className="text-gray-600 text-lg">Your cart is empty!</p>
              <button
                onClick={handleBackToShopping}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Back to Shopping
              </button>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Price Details</h2>
            <div className="border-b border-gray-300 pb-4">
              <div className="flex justify-between text-lg mb-2">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-800">₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg mb-2 text-green-600">
                <span>Coupon Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg mb-2 text-green-600">
                <span>Delivery Charges</span>
                <span>FREE</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-gray-900">₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="mt-6">
              <input
                type="text"
                value={coupon || ''}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter Coupon Code"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={applyCoupon}
                className="mt-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-md"
              >
                Apply Coupon
              </button>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
