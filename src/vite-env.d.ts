/// <reference types="vite/client" />

interface Product {
  _id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  image: string;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLEAR_CART" }
  | { type: "INIT_CART"; payload: CartState };

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
}
