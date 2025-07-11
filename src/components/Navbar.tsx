import { Home, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Navbar() {
  const { items, toggleCart } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img src="logo.svg" alt="Mini Ecommerce Logo" />
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center space-x-2 text-black hover:text-green-600 transition-all duration-300 px-4 py-3 rounded hover:bg-green-50 font-medium">
              <Home size={20} />
              <span>Home</span>
            </Link>

            <button
              onClick={toggleCart}
              className="relative flex items-center space-x-2 text-black hover:text-green-600 transition-all duration-300 px-4 py-3 rounded hover:bg-green-50 font-medium">
              <ShoppingCart size={20} />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
