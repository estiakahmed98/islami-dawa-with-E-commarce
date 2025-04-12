"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { products } from "@/public/BookData";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        // If exists, increase quantity
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add to cart
        return [
          ...prevItems,
          {
            id: Date.now(), // temporary unique ID
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image || "/placeholder.svg",
          },
        ];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
