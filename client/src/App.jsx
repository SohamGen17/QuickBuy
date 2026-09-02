import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function Shop() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Shop</h1>
    </div>
  );
}

function Cart() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Cart</h1>
    </div>
  );
}

function Checkout() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Checkout</h1>
    </div>
  );
}

function Payment() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Payment</h1>
    </div>
  );
}

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">
        Order Successful
      </h1>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Shop */}
          <Route path="/shop" element={<Shop />} />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />

          {/* Order Success */}
          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;