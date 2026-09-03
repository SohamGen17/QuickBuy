import { useState } from "react";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cart, cartTotal, clearCart } = useCart();

  const customer = location.state?.customer;

  const shipping = cartTotal >= 5000 ? 0 : 99;
  const total = cartTotal + shipping;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCardData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!customer) {
      navigate("/checkout");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: Number(item.price),
      }));

      const response = await api.post("/orders", {
        customer,
        items: orderItems,
        total_amount: total,
        payment_method: paymentMethod,
      });

      clearCart();

      navigate("/order-success", {
        state: {
          orderId: response.data.orderId,
          total,
        },
      });
    }catch (error) {
  console.error("Payment error:", error);

  const message =
    error.response?.data?.message ||
    error.message ||
    "Payment failed. Please try again.";

  alert(message);
}
     finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold">No items to pay for</h1>

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

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock size={16} />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <button
          onClick={() => navigate("/checkout")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Checkout
        </button>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Payment Form */}
          <form
            onSubmit={handlePayment}
            className="rounded-xl border border-gray-200 bg-white p-8"
          >
            <div className="flex items-center gap-3">
              <CreditCard size={24} />

              <h1 className="text-2xl font-bold">
                Payment
              </h1>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Choose your preferred payment method.
            </p>

            {/* Payment Methods */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`rounded-lg border p-4 text-sm font-medium ${
                  paymentMethod === "card"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`rounded-lg border p-4 text-sm font-medium ${
                  paymentMethod === "upi"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                UPI
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`rounded-lg border p-4 text-sm font-medium ${
                  paymentMethod === "cod"
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                Cash on Delivery
              </button>
            </div>

            {/* Card */}
            {paymentMethod === "card" && (
              <div className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-medium">
                    Card Number
                  </label>

                  <input
                    required
                    name="cardNumber"
                    value={cardData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">
                      Expiry Date
                    </label>

                    <input
                      required
                      name="expiry"
                      value={cardData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      CVV
                    </label>

                    <input
                      required
                      name="cvv"
                      value={cardData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="3"
                      type="password"
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Name on Card
                  </label>

                  <input
                    required
                    name="name"
                    value={cardData.name}
                    onChange={handleChange}
                    placeholder="Enter name on card"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>
            )}

            {/* UPI */}
            {paymentMethod === "upi" && (
              <div className="mt-8">
                <label className="text-sm font-medium">
                  UPI ID
                </label>

                <input
                  required
                  placeholder="example@upi"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>
            )}

            {/* COD */}
            {paymentMethod === "cod" && (
              <div className="mt-8 rounded-lg bg-gray-50 p-5 text-sm text-gray-600">
                You will pay for your order when it is delivered.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Processing..."
                : `Place Order • ₹${total.toLocaleString("en-IN")}`}
            </button>
          </form>

          {/* Summary */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-gray-500">
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
                <span>
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
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

export default Payment;