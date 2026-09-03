import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/admin/dashboard");

        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  const statCards = [
    {
      title: "Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
    },
    {
      title: "Orders",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingCart,
    },
    {
      title: "Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
    },
    {
      title: "Bookings",
      value: stats?.totalBookings ?? 0,
      icon: CalendarDays,
    },
    {
      title: "Revenue",
      value: `₹${Number(
        stats?.totalRevenue ?? 0
      ).toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* HEADER */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              QuickBuy! Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Welcome back, {user.name}.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-black hover:text-black"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>

        {/* ADMIN NAVIGATION */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-black hover:shadow-sm"
          >
            <Package size={22} />

            <h2 className="mt-4 font-semibold text-gray-900">
              Manage Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add, edit and remove products.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-black hover:shadow-sm"
          >
            <ShoppingCart size={22} />

            <h2 className="mt-4 font-semibold text-gray-900">
              Manage Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View customer orders and status.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-black hover:shadow-sm"
          >
            <Users size={22} />

            <h2 className="mt-4 font-semibold text-gray-900">
              Manage Users
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View registered customers.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/bookings")}
            className="rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-black hover:shadow-sm"
          >
            <CalendarDays size={22} />

            <h2 className="mt-4 font-semibold text-gray-900">
              Manage Bookings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View and manage appointments.
            </p>
          </button>
        </div>

        {/* STATS */}
        <section className="mt-10">
          <div className="flex items-center gap-2">
            <BarChart3 size={21} />

            <h2 className="text-xl font-semibold text-gray-900">
              Store Overview
            </h2>
          </div>

          {loading && (
            <div className="mt-6 flex min-h-[200px] items-center justify-center rounded-2xl bg-white">
              <p className="text-gray-500">
                Loading dashboard...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
              <p className="font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          {!loading && !error && stats && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {statCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-gray-200 bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {card.title}
                      </p>

                      <Icon
                        size={19}
                        className="text-gray-400"
                      />
                    </div>

                    <p className="mt-4 text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;