import { useNavigate } from "react-router-dom";
import { CalendarDays, LogOut, Package, User } from "lucide-react";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <User
              size={48}
              className="mx-auto text-gray-300"
            />

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Sign in to your account
            </h1>

            <p className="mt-2 text-gray-500">
              View your profile, orders and bookings.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
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

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            My Profile
          </h1>
        </div>

        {/* User Information */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <User size={30} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {user.name}
              </h2>

              <p className="mt-1 text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {/* Orders */}
          <button
            onClick={() => navigate("/orders")}
            className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Package
              size={28}
              className="text-gray-700 transition group-hover:text-black"
            />

            <h3 className="mt-5 font-semibold text-gray-900">
              My Orders
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              View your order history.
            </p>
          </button>

          {/* Bookings */}
          <button
            onClick={() => navigate("/bookings")}
            className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <CalendarDays
              size={28}
              className="text-gray-700 transition group-hover:text-black"
            />

            <h3 className="mt-5 font-semibold text-gray-900">
              My Bookings
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              View your appointments.
            </p>
          </button>

          {/* Book Appointment */}
          <button
            onClick={() => navigate("/booking")}
            className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <CalendarDays
              size={28}
              className="text-gray-700 transition group-hover:text-black"
            />

            <h3 className="mt-5 font-semibold text-gray-900">
              Book Appointment
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Schedule a new appointment.
            </p>
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-4 font-medium text-gray-700 transition hover:border-red-300 hover:text-red-600"
        >
          <LogOut size={19} />
          Logout
        </button>
      </main>
    </div>
  );
}

export default Profile;