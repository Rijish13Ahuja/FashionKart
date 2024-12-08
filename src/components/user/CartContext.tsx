import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface User {
  userId: string;
  email: string;
  token: string;
}

interface CartContextType {
  items: CartItem[];
  user: User | null;
  discount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  setDiscount: (discount: number) => void; // Added to allow updating the discount
  login: (user: User) => void;
  logout: () => void;
  getCurrentUser: () => User | null;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? { ...JSON.parse(storedUser), userId: JSON.parse(storedUser).id } : null;
  });

  const [discount, setDiscount] = useState<number>(0); // New state for managing discount

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]); // Clear state
    setDiscount(0); // Reset discount when cart is cleared
    localStorage.removeItem('cartItems'); // Sync localStorage
  };

  const login = (user: User) => {
    setUser({ ...user, userId: user.userId }); // Ensure `userId` is populated
  };

  const logout = () => {
    setUser(null);
    clearCart();
  };

  const getCurrentUser = () => user;

  return (
    <CartContext.Provider
      value={{
        items,
        user,
        discount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setDiscount, // Expose setDiscount function
        login,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
