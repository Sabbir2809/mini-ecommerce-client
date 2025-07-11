/* eslint-disable @typescript-eslint/no-explicit-any */
import { RotateCcw, Shield, ShoppingCart, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ProductNotFound from "../components/ProductNotFound";
import { useCart } from "../hooks/useCart";
import { getProductById } from "../services/productApi";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success("Add To Cart Successfully!");
    }
  };

  if (loading) return <Loader />;

  if (error || !product) {
    return <ProductNotFound />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="aspect-square bg-muted p-6">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded shadow"
              />
            </div>

            {/* Product Info */}
            <div className="p-6 flex flex-col justify-center">
              <span className="inline-block bg-accent text-green-600 text-sm font-semibold">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-3xl font-bold mb-4">{product.price} TK</div>

              <p className="text-card-foreground text-lg leading-relaxed mb-10 opacity-90">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-6 mb-10">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl">
                  <ShoppingCart size={24} />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-8 space-y-4">
                <div className="flex items-center space-x-3 text-card-foreground">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-3 text-card-foreground">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span>Free shipping on orders over 60</span>
                </div>
                <div className="flex items-center space-x-3 text-card-foreground">
                  <RotateCcw className="w-5 h-5 text-purple-500" />
                  <span>Easy returns & exchanges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
