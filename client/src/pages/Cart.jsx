import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  const shipping = cartTotal >= 5000 || cartTotal === 0 ? 0 : 99;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-20 max-w-7xl items-center px-6">
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-bold tracking-tight"
            >
              QuickBuy!
            </button>
          </div>
        </header>

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag size={32} className="text-gray-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-3 text-gray-500">
              Add some products to your cart and they will appear here.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-8 rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
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
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
          <p className="mt-2 text-gray-500">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <span className="text-sm text-gray-400">
                    Product Image
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {item.category}
                      </p>

                      <h2 className="mt-1 text-lg font-semibold text-gray-900">
                        {item.name}
                      </h2>
                    </div>

                    <p className="text-lg font-bold text-gray-900">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {shipping === 0
                    ? "Free"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-8 w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;