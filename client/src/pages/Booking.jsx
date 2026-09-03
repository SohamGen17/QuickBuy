import { useState } from "react";
import { CalendarDays, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Booking() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState(null);

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];

  const handleBooking = async (event) => {
    event.preventDefault();

    setError("");

    if (!date || !time) {
      setError("Please select a date and time.");
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/bookings", {
        booking_date: date,
        booking_time: time,
      });

      setBookingId(response.data.bookingId);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create booking."
      );
    } finally {
      setLoading(false);
    }
  };

  if (bookingId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-6 py-12">
          <div className="w-full rounded-2xl bg-white p-10 text-center shadow-sm">
            <CheckCircle
              size={64}
              className="mx-auto text-green-600"
            />

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Booking Confirmed!
            </h1>

            <p className="mt-3 text-gray-600">
              Your appointment has been successfully booked.
            </p>

            <div className="mx-auto mt-8 max-w-sm rounded-xl bg-gray-50 p-6 text-left">
              <div className="flex items-center gap-3">
                <CalendarDays
                  size={20}
                  className="text-gray-500"
                />

                <div>
                  <p className="text-sm text-gray-500">
                    Date
                  </p>
                  <p className="font-medium text-gray-900">
                    {date}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Clock
                  size={20}
                  className="text-gray-500"
                />

                <div>
                  <p className="text-sm text-gray-500">
                    Time
                  </p>
                  <p className="font-medium text-gray-900">
                    {time}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-200 pt-5">
                <p className="text-sm text-gray-500">
                  Booking ID
                </p>
                <p className="font-bold text-gray-900">
                  #{bookingId}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-8 rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Back to Home
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
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Appointment
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Book an Appointment
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Choose a convenient date and time for your
            appointment.
          </p>
        </div>

        {!user && (
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 text-center">
            <p className="text-gray-600">
              Please sign in before confirming your booking.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-3 font-medium text-black underline"
            >
              Sign In
            </button>
          </div>
        )}

        <form
          onSubmit={handleBooking}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Date Selection */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarDays size={24} />

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Date
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose your preferred appointment date.
                </p>
              </div>
            </div>

            <input
              type="date"
              min={today}
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              className="mt-8 w-full rounded-lg border border-gray-300 bg-white px-4 py-4 outline-none focus:border-black"
            />

            {date && (
              <div className="mt-5 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Selected Date
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {date}
                </p>
              </div>
            )}
          </div>

          {/* Time Selection */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <Clock size={24} />

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Time
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose an available time slot.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                    time === slot
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-black"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 lg:col-span-2">
              {error}
            </div>
          )}

          {/* Confirm */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black py-4 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Confirming Booking..."
                : "Confirm Booking"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Booking;