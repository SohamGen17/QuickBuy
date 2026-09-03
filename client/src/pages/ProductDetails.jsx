import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
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
        setError("");

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

  /* =========================
     LOADING
  ========================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F5]">
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 h-5 w-32 animate-pulse rounded bg-gray-200" />

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="h-[520px] animate-pulse rounded-[2rem] bg-white" />

            <div className="flex flex-col justify-center">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="mt-5 h-12 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="mt-5 h-5 w-40 animate-pulse rounded bg-gray-200" />

              <div className="mt-7 h-10 w-32 animate-pulse rounded bg-gray-200" />

              <div className="mt-7 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="mt-8 h-14 w-full animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* =========================
     ERROR / NOT FOUND
  ========================== */
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F7F7F5]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
              <ShoppingBag size={28} />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-[#172033]">
              Product not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#5F6878]">
              The product you're looking for may no longer be
              available.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#172033] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#24304A] hover:shadow-lg"
            >
              <ArrowLeft size={17} />
              Back to Shop
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#172033]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 sm:py-12">

        {/* =========================
            BACK BUTTON
        ========================== */}
        <button
          onClick={() => navigate("/shop")}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#5F6878] transition hover:text-[#172033]"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </button>

        {/* =========================
            PRODUCT
        ========================== */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* =========================
              PRODUCT IMAGE
          ========================== */}
          <div className="relative">

            <div className="flex min-h-[480px] items-center justify-center overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:min-h-[560px] sm:p-10">

              <img
                src={product.image_url}
                alt={product.name}
                className="h-full max-h-[520px] w-full object-contain transition duration-500 hover:scale-105"
              />
            </div>

            {/* Image badge */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-gray-200 bg-white/95 px-4 py-2 text-xs font-semibold text-[#172033] shadow-sm backdrop-blur">
              <CheckCircle
                size={15}
                className="text-[#2E8B57]"
              />
              Quality checked
            </div>
          </div>

          {/* =========================
              PRODUCT INFORMATION
          ========================== */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2A9D8F]">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[#172033] sm:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-1 rounded-full bg-[#E4F3F0] px-3 py-1.5 text-sm font-semibold text-[#172033]">
                <Star
                  size={16}
                  className="fill-[#2A9D8F] text-[#2A9D8F]"
                />

                <span>{product.rating}</span>
              </div>

              <span className="text-gray-300">
                •
              </span>

              <span className="text-sm text-[#5F6878]">
                Customer rating
              </span>
            </div>

            {/* Price */}
            <div className="mt-7">
              <p className="text-4xl font-extrabold tracking-tight text-[#172033]">
                ₹
                {Number(product.price).toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5F6878]">
              {product.description}
            </p>

            {/* Divider */}
            <div className="my-7 h-px bg-gray-200" />

            {/* Stock */}
            <div>
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-[#2E8B57]">
                  <CheckCircle size={17} />
                  In Stock
                  <span className="font-normal text-[#5F6878]">
                    • {product.stock} available
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Out of Stock
                </div>
              )}
            </div>

            {/* =========================
                QUANTITY
            ========================== */}
            {product.stock > 0 && (
              <>
                <div className="mt-7">
                  <p className="mb-3 text-sm font-semibold text-[#172033]">
                    Quantity
                  </p>

                  <div className="flex w-fit items-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">

                    <button
                      onClick={() =>
                        setQuantity((current) =>
                          Math.max(1, current - 1)
                        )
                      }
                      className="flex h-11 w-11 items-center justify-center text-[#5F6878] transition hover:bg-[#F7F7F5] hover:text-[#172033]"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={17} />
                    </button>

                    <span className="flex h-11 w-12 items-center justify-center border-x border-gray-200 text-sm font-bold text-[#172033]">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity((current) =>
                          Math.min(
                            product.stock,
                            current + 1
                          )
                        )
                      }
                      className="flex h-11 w-11 items-center justify-center text-[#5F6878] transition hover:bg-[#F7F7F5] hover:text-[#172033]"
                      aria-label="Increase quantity"
                    >
                      <Plus size={17} />
                    </button>
                  </div>
                </div>

                {/* =========================
                    ADD TO CART
                ========================== */}
                <button
                  onClick={handleAddToCart}
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#172033] py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24304A] hover:shadow-xl"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>

                {/* =========================
                    BENEFITS
                ========================== */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">

                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                      <Truck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#172033]">
                        Fast delivery
                      </p>

                      <p className="mt-0.5 text-xs text-[#5F6878]">
                        Reliable doorstep delivery
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#172033]">
                        Secure checkout
                      </p>

                      <p className="mt-0.5 text-xs text-[#5F6878]">
                        Safe and protected payments
                      </p>
                    </div>
                  </div>

                </div>
              </>
            )}

            {/* Out of stock message */}
            {product.stock <= 0 && (
              <div className="mt-7 rounded-2xl border border-red-100 bg-red-50 p-5">
                <p className="text-sm font-semibold text-red-700">
                  This product is currently unavailable.
                </p>

                <p className="mt-1 text-sm text-red-600/80">
                  Please explore our other products in the
                  meantime.
                </p>

                <button
                  onClick={() => navigate("/shop")}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-red-700 transition hover:text-red-900"
                >
                  Browse products
                  <ArrowLeft
                    size={16}
                    className="rotate-180"
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* =========================
            LOWER INFORMATION BAR
        ========================== */}
        <section className="mt-16 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="grid gap-6 sm:grid-cols-3">

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                <Truck size={19} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172033]">
                  Convenient delivery
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#5F6878]">
                  Get your order delivered directly to your
                  doorstep.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172033]">
                  Secure shopping
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#5F6878]">
                  Your shopping experience is designed with
                  security in mind.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                <CheckCircle size={19} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#172033]">
                  Quality selection
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#5F6878]">
                  Carefully selected products for everyday
                  style.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetails;