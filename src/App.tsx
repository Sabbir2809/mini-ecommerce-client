import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartSidebar from "./components/CartSidebar";
import Navbar from "./components/Navbar";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";

const App = () => (
  <CartProvider>
    <ToastContainer position="top-center" />
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CartSidebar />
      </div>
    </BrowserRouter>
  </CartProvider>
);

export default App;
