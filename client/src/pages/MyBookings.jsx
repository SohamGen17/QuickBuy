import { useEffect, useState } from "react";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyBookings() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          "/bookings/my-bookings"
        );

        setBookings(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <CalendarDays
              size={48}
              className="mx-auto text-gray-300"
            />

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Sign in to view your bookings
            </h1>

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

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/profile")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
          >
            <ArrowLeft size={18} />
            Back to Profile
          </button>

          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Appointments
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            My Bookings
          </h1>

          <p className="mt-3 text-gray-600">
            View your upcoming and previous appointments.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-gray-500">
              Loading bookings...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <CalendarDays
              size={52}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-2xl font-semibold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't booked an appointment yet.
            </p>

            <button
              onClick={() => navigate("/booking")}
              className="mt-6 rounded-lg bg-black px-7 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Book an Appointment
            </button>
          </div>
        )}

        {/* Booking List */}
        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  {/* Booking Info */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                        <CalendarDays size={21} />
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Booking #{booking.id}
                        </p>

                        <h2 className="font-semibold text-gray-900">
                          Appointment
                        </h2>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={18}
                          className="text-gray-500"
                        />

                        <div>
                          <p className="text-xs text-gray-500">
                            Date
                          </p>

                          <p className="text-sm font-medium text-gray-900">
                            {new Date(
                              booking.booking_date
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock
                          size={18}
                          className="text-gray-500"
                        />

                        <div>
                          <p className="text-xs text-gray-500">
                            Time
                          </p>

                          <p className="text-sm font-medium text-gray-900">
                            {booking.booking_time
                              ?.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-medium capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Booking */}
        {!loading && user && (
          <button
            onClick={() => navigate("/booking")}
            className="mt-8 w-full rounded-lg border border-gray-300 bg-white py-4 font-medium text-gray-800 transition hover:border-black hover:text-black"
          >
            + Book Another Appointment
          </button>
        )}
      </main>
    </div>
  );
}

export default MyBookings;