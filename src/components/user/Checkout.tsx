// src/components/user/Checkout.tsx
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { items } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = () => {
    if (!address) {
      alert('Please enter your address.');
      return;
    }
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Delivery Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your address"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="UPI">UPI</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>
      <h2 className="text-xl font-semibold mb-4">Order Summary:</h2>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="h-16 w-16 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>
              ₹{item.price.toFixed(2)} x {item.quantity}
            </p>
          </div>
          <p>₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="text-right font-bold text-lg">
        Total: ₹{total.toFixed(2)}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
