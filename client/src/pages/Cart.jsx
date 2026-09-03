import {
  ArrowLeft,
  CheckCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const shipping =
    cartTotal >= 5000 || cartTotal === 0 ? 0 : 99;

  const total = cartTotal + shipping;

  /* =========================
     EMPTY CART
  ========================== */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] text-[#172033]">
        <Navbar />

        <main className="flex min-h-[75vh] items-center justify-center px-6">
          <div className="max-w-md text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
              <ShoppingBag size={34} />
            </div>

            <h1 className="mt-7 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Your cart is empty
            </h1>

            <p className="mt-3 leading-7 text-[#5F6878]">
              Looks like you haven't added anything yet.
              Explore our collection and find something you'll love.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#172033] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24304A] hover:shadow-lg"
            >
              Continue Shopping
              <ArrowLeft
                size={17}
                className="rotate-180"
              />
            </button>

            <div className="mt-10 flex flex-wrap justify-center gap-5 text-xs text-[#5F6878]">
              <div className="flex items-center gap-1.5">
                <CheckCircle
                  size={15}
                  className="text-[#2E8B57]"
                />
                Quality products
              </div>

              <div className="flex items-center gap-1.5">
                <ShieldCheck
                  size={15}
                  className="text-[#2A9D8F]"
                />
                Secure checkout
              </div>
            </div>
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
            HEADER
        ========================== */}
        <div className="mb-10">

          <button
            onClick={() => navigate("/shop")}
            className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#5F6878] transition hover:text-[#172033]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2A9D8F]">
                Your selection
              </p>

              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.03em] text-[#172033] sm:text-5xl">
                Your Cart
              </h1>
            </div>

            <p className="text-sm text-[#5F6878]">
              <span className="font-semibold text-[#172033]">
                {cartCount}
              </span>{" "}
              {cartCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        {/* =========================
            MAIN CART
        ========================== */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* =========================
              CART ITEMS
          ========================== */}
          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="flex gap-4 sm:gap-5">

                  {/* Product image */}
                  <button
                    onClick={() =>
                      navigate(`/product/${item.id}`)
                    }
                    className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#F7F7F5] sm:h-36 sm:w-32"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </button>

                  {/* Product information */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">

                    <div className="flex justify-between gap-3">

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#2A9D8F]">
                          {item.category}
                        </p>

                        <button
                          onClick={() =>
                            navigate(`/product/${item.id}`)
                          }
                          className="mt-1 block text-left text-base font-bold text-[#172033] transition hover:text-[#2A9D8F] sm:text-lg"
                        >
                          {item.name}
                        </button>
                      </div>

                      {/* Price */}
                      <p className="shrink-0 text-base font-bold text-[#172033] sm:text-lg">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3">

                      {/* Quantity */}
                      <div>
                        <p className="mb-2 text-xs font-medium text-[#5F6878]">
                          Quantity
                        </p>

                        <div className="flex w-fit items-center overflow-hidden rounded-full border border-gray-200 bg-[#F7F7F5]">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-[#5F6878] transition hover:bg-white hover:text-[#172033]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="flex h-9 w-10 items-center justify-center border-x border-gray-200 bg-white text-sm font-bold text-[#172033]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-[#5F6878] transition hover:bg-white hover:text-[#172033]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#5F6878] transition hover:text-red-600 sm:text-sm"
                      >
                        <Trash2 size={15} />
                        <span className="hidden sm:inline">
                          Remove
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Unit price */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-xs text-[#5F6878]">
                    ₹
                    {Number(item.price).toLocaleString(
                      "en-IN"
                    )}{" "}
                    each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* =========================
              ORDER SUMMARY
          ========================== */}
          <aside className="h-fit lg:sticky lg:top-28">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#172033]">
                  Order Summary
                </h2>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                  <ShoppingBag size={17} />
                </div>
              </div>

              {/* Free shipping message */}
              {cartTotal < 5000 && (
                <div className="mt-6 rounded-2xl bg-[#E4F3F0] p-4">
                  <div className="flex items-start gap-3">

                    <Truck
                      size={18}
                      className="mt-0.5 shrink-0 text-[#2A9D8F]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#172033]">
                        Free shipping on ₹5,000+
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#5F6878]">
                        Add ₹
                        {(
                          5000 - cartTotal
                        ).toLocaleString("en-IN")}{" "}
                        more to unlock free delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {cartTotal >= 5000 && (
                <div className="mt-6 rounded-2xl bg-[#E4F3F0] p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={18}
                      className="shrink-0 text-[#2E8B57]"
                    />

                    <p className="text-sm font-semibold text-[#172033]">
                      You've unlocked free shipping!
                    </p>
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="mt-6 space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-[#5F6878]">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#172033]">
                    ₹
                    {cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#5F6878]">
                    Shipping
                  </span>

                  <span
                    className={`font-semibold ${
                      shipping === 0
                        ? "text-[#2E8B57]"
                        : "text-[#172033]"
                    }`}
                  >
                    {shipping === 0
                      ? "Free"
                      : `₹${shipping.toLocaleString(
                          "en-IN"
                        )}`}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <div className="flex items-end justify-between">
                    <span className="text-base font-semibold text-[#172033]">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold tracking-tight text-[#172033]">
                      ₹
                      {total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout */}
              <button
                onClick={() => navigate("/checkout")}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#172033] py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24304A] hover:shadow-xl"
              >
                Proceed to Checkout
                <ArrowLeft
                  size={17}
                  className="rotate-180"
                />
              </button>

              {/* Security */}
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#5F6878]">
                <ShieldCheck
                  size={15}
                  className="text-[#2A9D8F]"
                />
                Secure checkout
              </div>
            </div>

            {/* Additional reassurance */}
            <div className="mt-4 rounded-3xl border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <Truck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#2A9D8F]"
                />

                <div>
                  <p className="text-sm font-bold text-[#172033]">
                    Reliable delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#5F6878]">
                    Your order will be processed and delivered
                    securely.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Cart;