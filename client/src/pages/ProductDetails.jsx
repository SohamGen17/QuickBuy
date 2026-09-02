import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);

        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />

        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-gray-500">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />

        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Product not found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="mt-5 rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Total price
  const totalPrice =
    Number(product.price) * quantity;

  // Add product to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);

    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft size={18} />

          Back
        </button>

        {/* Product Layout */}
        <div className="grid gap-12 md:grid-cols-2">

          {/* Product Image */}
          <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-gray-100">
            <span className="text-gray-400">
              Product Image
            </span>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">

              <div className="flex items-center gap-1">
                <Star
                  size={18}
                  className="fill-current"
                />

                <span className="font-medium">
                  {product.rating}
                </span>
              </div>

              <span className="text-gray-400">
                |
              </span>

              <span className="text-sm text-gray-500">
                Customer Rating
              </span>
            </div>

            {/* Price */}
            <p className="mt-6 text-3xl font-bold text-gray-900">
              ₹
              {Number(product.price).toLocaleString(
                "en-IN"
              )}
            </p>

            {/* Description */}
            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Stock */}
            <p className="mt-6 text-sm text-gray-500">
              {product.stock} items available
            </p>

            {/* Quantity */}
            <div className="mt-6">

              <p className="mb-3 text-sm font-semibold">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-lg border border-gray-300">

                {/* Decrease */}
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>

                {/* Quantity */}
                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>

                {/* Increase */}
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>

              </div>
            </div>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              <ShoppingBag size={20} />

              Add to Cart
            </button>

            {/* Total */}
            <div className="mt-5 flex justify-between border-t pt-5">

              <span className="text-gray-500">
                Total
              </span>

              <span className="text-xl font-bold">
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;