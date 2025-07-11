import { AlertTriangle } from "lucide-react"; // optional icon library
import { Link } from "react-router-dom";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center bg-white p-8 max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-500">
          <AlertTriangle className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded font-medium hover:bg-green-700 transition-colors shadow-md">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
