import { Check } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="text-center py-12 animate-fade-in-up">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-black mb-3">
        Order Placed Successfully!
      </h3>
      <p className="text-gray-600 text-lg">
        Thank you for your purchase. Your order has been confirmed and will be
        processed shortly.
      </p>
    </div>
  );
}
