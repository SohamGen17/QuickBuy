import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

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

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <User size={24} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Join us and start shopping
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <div className="relative mt-2">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-black"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;