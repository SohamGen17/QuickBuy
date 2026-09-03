import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function OrderHistory() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/my-orders");

        setOrders(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <Package
              size={48}
              className="mx-auto text-gray-400"
            />

            <h1 className="mt-5 text-3xl font-bold">
              Sign in to view your orders
            </h1>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 rounded-lg bg-black px-7 py-3 font-medium text-white"
            >
              Sign In
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View your previous purchases.
          </p>
        </div>

        {loading && (
          <div className="py-20 text-center text-gray-500">
            Loading orders...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <Package
              size={48}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-5 text-2xl font-bold">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your completed purchases will appear here.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
            >
              Start Shopping
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order #{order.id}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(
                        order.created_at
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold">
                      ₹
                      {Number(
                        order.total_amount
                      ).toLocaleString("en-IN")}
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center gap-4"
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="font-medium">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderHistory;