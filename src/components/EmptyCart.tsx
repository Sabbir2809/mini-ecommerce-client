import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-black mb-2">Your cart is empty</h3>
      <p className="text-gray-600">Add some amazing products to get started</p>
    </div>
  );
}
