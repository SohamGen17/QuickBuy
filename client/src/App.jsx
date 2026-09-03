import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import MyBookings from "./pages/MyBookings";

import Booking from "./pages/Booking";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Shopping Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            {/* Cart & Checkout */}
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={<Checkout />}
            />
            <Route
              path="/payment"
              element={<Payment />}
            />
            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register />}
            />

            {/* User */}
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/orders"
              element={<OrderHistory />}
            />
            <Route
            path="/bookings"
            element={<MyBookings />}
            />
            {/* Booking */}
            <Route
              path="/booking"
              element={<Booking />}
              
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;