import React, { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

// Create context
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Initial state
const initialCartState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
};

// Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed: CartState = JSON.parse(stored);
        dispatch({ type: "INIT_CART", payload: parsed });
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  // Actions
  const addToCart = (product: Product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
