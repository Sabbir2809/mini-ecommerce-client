/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreditCard, Mail, MapPin, ShoppingBag, User, X } from "lucide-react";
import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { placeOrder } from "../services/orderApi";
import OrderSuccess from "./OrderSuccess";

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { total, clearCart, toggleCart } = useCart();
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    email: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await placeOrder(formData);
      alert(res.message || "Order placed successfully");
      setIsSuccess(true);

      setTimeout(() => {
        clearCart();
        setIsSuccess(false);
        setFormData({ name: "", email: "", address: "" });
        onClose();
        toggleCart();
      }, 3000);
    } catch (error: any) {
      alert(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.address;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in border border-green-100">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded flex items-center justify-center shadow-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">Checkout</h2>
              <p className="text-gray-600 text-sm">Complete your purchase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/50 rounded-2xl transition-all duration-200 group">
            <X
              size={24}
              className="text-gray-600 group-hover:text-black transition-colors"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {isSuccess ? (
            <OrderSuccess />
          ) : (
            <>
              {/* Order Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded p-6 mb-4 border border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-black text-lg">
                    Order Summary
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-lg">Total Amount:</span>
                  <span className="text-xl font-bold text-green-600">
                    {total.toFixed(2)} Tk
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="flex items-center space-x-2 text-sm font-semibold text-black">
                    <User className="w-4 h-4 text-green-600" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 text-black placeholder-gray-500 bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="flex items-center space-x-2 text-sm font-semibold text-black">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 text-black placeholder-gray-500 bg-white"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="address"
                    className="flex items-center space-x-2 text-sm font-semibold text-black">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>Delivery Address *</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 resize-none text-black placeholder-gray-500 bg-white"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <span>Confirm Order</span>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
