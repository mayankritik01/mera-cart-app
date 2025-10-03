import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
  const [shippingAddress, setShippingAddress] = useState(() => JSON.parse(localStorage.getItem('shippingAddress')) || {});
  const [paymentMethod, setPaymentMethod] = useState(() => localStorage.getItem('paymentMethod') || '');

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  useEffect(() => {
    localStorage.setItem('paymentMethod', paymentMethod);
  }, [paymentMethod]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + product.qty } : item
        );
      } else {
        return [...prevItems, { ...product, qty: product.qty }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item._id !== id);
    });
  };

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
  };

  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  // Naya function cart ko clear karne ke liye
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, shippingAddress, paymentMethod, addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;