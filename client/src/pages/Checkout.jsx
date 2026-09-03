import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>

          <button
            onClick={() => navigate("/shop")}
            className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold tracking-tight"
          >
            QuickBuy!
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your delivery details to continue.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Customer Information */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-8"
          >
            <h2 className="text-xl font-bold text-gray-900">
              Delivery Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Postal Code
                </label>

                <input
                  required
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="411001"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>

                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., street, area"
                  rows="3"
                  className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Pune"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  State
                </label>

                <input
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Continue to Payment
            </button>
          </form>

          {/* Order Summary */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    ₹
                    {(Number(item.price) * item.quantity).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-200 pt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;