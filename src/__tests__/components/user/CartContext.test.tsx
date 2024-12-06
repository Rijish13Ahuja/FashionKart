import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../../../components/user/CartContext';
import { cartItemValidationSchema } from '../../../utils/CartContextValidations';

jest.mock('../../../utils/CartContextValidations', () => ({
  cartItemValidationSchema: {
    validate: jest.fn(),
  },
}));

const TestComponent = () => {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  return (
    <div>
      <button onClick={() => addToCart({ id: 1, name: 'Product 1', image: '', price: 100, quantity: 1 })}>
        Add Product 1
      </button>
      <button onClick={() => removeFromCart(1)}>Remove Product 1</button>
      <button onClick={() => updateQuantity(1, 2)}>Update Product 1 Quantity</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

describe('CartContext', () => {
  test('should remove item from the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Product 1');
    fireEvent.click(addButton);

    const removeButton = screen.getByText('Remove Product 1');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Product 1')).toBeNull();
  });

  test('should clear all items from the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Product 1');
    fireEvent.click(addButton);

    const clearButton = screen.getByText('Clear Cart');
    fireEvent.click(clearButton);

    expect(screen.queryByText('Product 1')).toBeNull();
  });

  test('should call validate function when adding an item to the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Product 1');
    fireEvent.click(addButton);

    expect(cartItemValidationSchema.validate).toHaveBeenCalledWith({
      id: 1,
      name: 'Product 1',
      image: '',
      price: 100,
      quantity: 1,
    });
  });
});

