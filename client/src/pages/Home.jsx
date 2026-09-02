import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              New Collection
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
              Style that
              <br />
              speaks for you.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Discover carefully selected fashion, footwear and
              accessories designed for your everyday style.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-8 flex items-center gap-3 rounded-full bg-black px-7 py-3.5 font-medium text-white transition hover:bg-gray-800"
            >
              Shop Collection
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex h-[420px] items-center justify-center rounded-2xl bg-gray-200">
            <span className="text-gray-400">
              Hero Image
            </span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Explore
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {["Men", "Women", "Footwear", "Bags", "Watches"].map(
            (category) => (
              <button
                key={category}
                onClick={() => navigate("/shop")}
                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-8 text-center font-semibold transition hover:bg-black hover:text-white"
              >
                {category}
              </button>
            )
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Our Selection
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="hidden text-sm font-semibold md:block"
            >
              View All →
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading products...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">
            Stay in the loop
          </h2>

          <p className="mt-3 text-gray-400">
            Get updates about new collections and exclusive offers.
          </p>

          <div className="mx-auto mt-7 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-lg px-4 py-3 text-black outline-none"
            />

            <button className="rounded-lg bg-white px-5 py-3 font-semibold text-black">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-gray-500 md:flex-row">
          <p>© 2026 E-Commerce Store</p>

          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;