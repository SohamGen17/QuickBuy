import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
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
        setLoading(true);

        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Product not found
            </h1>

            <button
              onClick={() => navigate("/shop")}
              className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate("/shop")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </button>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex min-h-[550px] items-center justify-center overflow-hidden rounded-2xl bg-white">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full max-h-[550px] w-full object-contain"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star
                  size={18}
                  className="fill-current text-black"
                />

                <span className="font-medium">
                  {product.rating}
                </span>
              </div>

              <span className="text-gray-400">•</span>

              <span className="text-sm text-gray-500">
                Customer Rating
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold text-gray-900">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="text-sm font-medium text-green-600">
                  In Stock • {product.stock} available
                </p>
              ) : (
                <p className="text-sm font-medium text-red-600">
                  Out of Stock
                </p>
              )}
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <>
                <div className="mt-8">
                  <p className="mb-3 text-sm font-medium text-gray-700">
                    Quantity
                  </p>

                  <div className="flex w-fit items-center rounded-lg border border-gray-300 bg-white">
                    <button
                      onClick={() =>
                        setQuantity((current) =>
                          Math.max(1, current - 1)
                        )
                      }
                      className="p-3 transition hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity((current) =>
                          Math.min(product.stock, current + 1)
                        )
                      }
                      className="p-3 transition hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-black py-4 font-medium text-white transition hover:bg-gray-800"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;