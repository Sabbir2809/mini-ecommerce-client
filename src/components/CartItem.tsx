import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";

export default function CartItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleRemoveFromCart = () => {
    removeFromCart(item._id);
    toast.warning("Remove From Cart Successfully!");
  };

  return (
    <div
      key={item._id}
      className="flex items-center space-x-4 bg-white p-4 rounded border-2 border-gray-100 hover:border-green-200 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded border border-gray-200"
      />

      <div className="flex-1">
        <h3 className="font-bold text-black text-sm line-clamp-2 mb-2">
          {item.title}
        </h3>
        <p className="text-green-600 font-bold">{item.price} TK</p>
      </div>

      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-1">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="p-2 hover:bg-white rounded transition-all duration-200 border border-gray-200"
          >
            <Minus size={14} className="text-gray-600" />
          </button>

          <span className="w-8 text-center font-bold text-black">
            {item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="p-2 hover:bg-white rounded transition-all duration-200 border border-gray-200"
          >
            <Plus size={14} className="text-gray-600" />
          </button>
        </div>

        <button
          onClick={handleRemoveFromCart}
          className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 group"
        >
          <Trash2 size={16} className="text-red-500 group-hover:text-red-600" />
        </button>
      </div>
    </div>
  );
}
