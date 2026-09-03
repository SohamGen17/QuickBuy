import { CheckCircle, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;
  const total = location.state?.total;

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

      <main className="flex min-h-[75vh] items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle
              size={44}
              className="text-green-600"
            />
          </div>

          <h1 className="mt-7 text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for your purchase. Your order has been
            confirmed.
          </p>

          <div className="mt-8 rounded-xl bg-gray-50 p-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Order ID
              </span>

              <span className="font-semibold text-gray-900">
                #{orderId || "N/A"}
              </span>
            </div>

            {total && (
              <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
                <span className="text-gray-500">
                  Amount Paid
                </span>

                <span className="font-bold text-gray-900">
                  ₹{Number(total).toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/")}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-900 transition hover:bg-gray-50"
            >
              Browse Products
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSuccess;