import {
  ArrowLeft,
  CheckCircle,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const shipping = cartTotal >= 5000 ? 0 : 99;
  const total = cartTotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/payment", {
      state: {
        customer: formData,
        total,
      },
    });
  };

  /* =========================
     EMPTY CART
  ========================== */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F7F5]">
        <Navbar />

        <main className="flex min-h-[75vh] items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
              <Truck size={32} />
            </div>

            <h1 className="mt-7 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Your cart is empty
            </h1>

            <p className="mt-3 leading-7 text-[#5F6878]">
              Add some products before continuing to checkout.
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
            CHECKOUT HEADER
        ========================== */}
        <div className="mb-10">

          <button
            onClick={() => navigate("/cart")}
            className="mb-7 flex items-center gap-2 text-sm font-semibold text-[#5F6878] transition hover:text-[#172033]"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </button>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2A9D8F]">
                Secure checkout
              </p>

              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.03em] text-[#172033] sm:text-5xl">
                Checkout
              </h1>

              <p className="mt-3 text-[#5F6878]">
                Enter your delivery details to continue.
              </p>
            </div>

            {/* Checkout steps */}
            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
              <div className="flex items-center gap-2 text-[#2A9D8F]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E4F3F0]">
                  <CheckCircle size={15} />
                </span>
                Cart
              </div>

              <div className="h-px w-8 bg-[#2A9D8F]/40 sm:w-12" />

              <div className="flex items-center gap-2 text-[#172033]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#172033] text-white">
                  2
                </span>
                Details
              </div>

              <div className="h-px w-8 bg-gray-200 sm:w-12" />

              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                  3
                </span>
                Payment
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            MAIN CHECKOUT
        ========================== */}
        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">

          {/* =========================
              DELIVERY FORM
          ========================== */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                <MapPin size={20} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#172033]">
                  Delivery Information
                </h2>

                <p className="mt-1 text-sm text-[#5F6878]">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#172033]"
                >
                  Full Name
                </label>

                <input
                  required
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 text-sm text-[#172033] outline-none transition placeholder:text-gray-400 focus:border-[#2A9D8F] focus:bg-white focus:ring-4 focus:ring-[#2A9D8F]/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#172033]"
                >
                  Email
                </label>

                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 text-sm text-[#172033] outline-none transition placeholder:text-gray-400 focus:border-[#2A9D8F] focus:bg-white focus:ring-4 focus:ring-[#2A9D8F]/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-[#172033]"
                >
                  Phone
                </label>

                <input
                  required
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 text-sm text-[#172033] outline-none transition placeholder:text-gray-400 focus:border-[#2A9D8F] focus:bg-white focus:ring-4 focus:ring-[#2A9D8F]/10"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="text-sm font-semibold text-[#172033]"
                >
                  Postal Code
                </label>

                <input
                  required
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="411001"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 text-sm text-[#172033] outline-none transition placeholder:text-gray-400 focus:border-[#2A9D8F] focus:bg-white focus:ring-4 focus:ring-[#2A9D8F]/10"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-[#172033]"
                >
                  Address
                </label>

                <textarea
                  required
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., street, area"
                  rows="3"
                  className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition placeholder:text-gray-400 focus:border-[#2A9D8F] focus:bg-white focus:ring-4 focus:ring-[#2A9D8F]/10"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-semibold text-[#172033]"
                >
                  City
                </label>

                <input
                  required
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Pune"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 text-sm text-[#172033] outline-none transition placeholder:text-gray-400 focus:border-[#2A9D8F] focus:bg-white focus:ring-4 focus:ring-[#2A9D8F]/10"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="text-sm font-semibold text-[#172033]"
                >
                  State
                </label>

                <input
                  required
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 text-sm text-[#172033] outline-none transition placeholder:text-gray-400 focus:border-[#2A9D8F] focus:bg-white focus:ring-4 focus:ring-[#2A9D8F]/10"
                />
              </div>
            </div>

            {/* Continue button */}
            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#172033] py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#24304A] hover:shadow-xl"
            >
              Continue to Payment
              <ArrowLeft
                size={17}
                className="rotate-180"
              />
            </button>

            {/* Security notice */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#5F6878]">
              <LockKeyhole
                size={14}
                className="text-[#2A9D8F]"
              />
              Your information is securely handled
            </div>
          </form>

          {/* =========================
              ORDER SUMMARY
          ========================== */}
          <aside className="h-fit lg:sticky lg:top-28">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#172033]">
                  Order Summary
                </h2>

                <span className="rounded-full bg-[#E4F3F0] px-3 py-1 text-xs font-semibold text-[#2A9D8F]">
                  {cart.length}{" "}
                  {cart.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              {/* Products */}
              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >
                    <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F7F7F5]">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#172033]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#5F6878]">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-[#172033]">
                      ₹
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mt-6 space-y-4 border-t border-gray-200 pt-6 text-sm">

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
                      : `₹${shipping}`}
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

              {/* Free shipping */}
              {shipping > 0 && (
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
                        more to unlock free shipping.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {shipping === 0 && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#E4F3F0] p-4">
                  <CheckCircle
                    size={18}
                    className="shrink-0 text-[#2E8B57]"
                  />

                  <p className="text-sm font-semibold text-[#172033]">
                    You've unlocked free shipping!
                  </p>
                </div>
              )}
            </div>

            {/* Trust cards */}
            <div className="mt-4 rounded-3xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={19}
                  className="text-[#2A9D8F]"
                />

                <div>
                  <p className="text-sm font-bold text-[#172033]">
                    Secure checkout
                  </p>

                  <p className="mt-1 text-xs text-[#5F6878]">
                    Your order details are protected.
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

export default Checkout;