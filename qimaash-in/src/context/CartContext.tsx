'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Cart } from '@/types'; // Import the new plain Cart type

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCart = async (productId: string, quantity: number) => {
    try {
      setLoading(true);
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) throw new Error('Failed to update cart');
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    const existingItem = cart?.items.find(item => item.product._id === productId);
    const newQuantity = (existingItem?.quantity || 0) + quantity;
    await updateCart(productId, newQuantity);
  };

  const removeFromCart = async (productId: string) => {
    await updateCart(productId, 0); // API handles removal on quantity 0
  };

  const clearCart = async () => {
    if (cart && cart.items.length > 0) {
        setLoading(true);
        try {
            await Promise.all(cart.items.map(item => updateCart(item.product._id, 0)));
            await fetchCart();
        } catch (error) {
            console.error('Failed to clear cart:', error);
        } finally {
            setLoading(false);
        }
    }
  };

  const getCartTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total: number, item) => total + item.product.price * item.quantity, 0);
  };

  const getItemCount = () => {
    if (!cart) return 0;
    return cart.items.reduce((total: number, item) => total + item.quantity, 0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ cart, loading, isCartOpen, openCart, closeCart, addToCart, removeFromCart, clearCart, getCartTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
