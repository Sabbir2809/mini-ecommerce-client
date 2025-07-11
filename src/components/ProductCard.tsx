import { ShoppingCart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Add To Cart Successfully!");
  };

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="bg-white rounded shadow hover:shadow-xl transition-all duration-500 border-2 border-gray-100 hover:border-green-400 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.01]">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-0 left-0">
            <span className="text-xs text-white font-bold bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 shadow-lg">
              {product.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="font-bold text-black mb-3 line-clamp-2 group-hover:text-green-600 transition-colors leading-relaxed text-lg">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-black">
              {product.price} TK
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-bold">
              <ShoppingCart size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
