import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";
import CheckoutModal from "./CheckoutModal";
import EmptyCart from "./EmptyCart";

export default function CartSidebar() {
  const { isOpen, items, total, toggleCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl z-[9998] transform transition-transform duration-300 flex flex-col border-l border-green-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">Shopping Cart</h2>
              <p className="text-gray-600 text-sm">{items.length} items</p>
            </div>
          </div>
          <button
            onClick={toggleCart}
            className="p-3 hover:bg-white/50  rounded-2xl transition-all duration-200 group">
            <X size={20} className="text-gray-600 group-hover:text-red-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 && <EmptyCart />}

          {items.map((item) => (
            <CartItem item={item} />
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-green-100 p-6 space-y-6 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-black">Total:</span>
              <span className="text-xl font-bold text-green-600">
                {total.toFixed(2)} TK
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
