import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Camera,
  Mail,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

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

  const featuredProducts = products.slice(0, 4);

  const categories = [
    {
      name: "Men",
      description: "Modern essentials",
      image: "/images/shirt.png",
      link: "/shop?category=Men",
    },
    {
      name: "Women",
      description: "Effortless style",
      image: "/images/dress.png",
      link: "/shop?category=Women",
    },
    {
      name: "Footwear",
      description: "Step into style",
      image: "/images/shoes.png",
      link: "/shop?category=Footwear",
    },
    {
      name: "Accessories",
      description: "Complete your look",
      image: "/images/watch.png",
      link: "/shop?category=Accessories",
    },
  ];

  const testimonials = [
    {
      name: "Ananya Sharma",
      rating: 5,
      text: "Beautiful products, smooth shopping experience, and fast delivery.",
    },
    {
      name: "Rahul Mehta",
      rating: 5,
      text: "The quality is excellent and the overall experience feels premium.",
    },
    {
      name: "Priya Kapoor",
      rating: 5,
      text: "I loved the collection. Finding and ordering products was very easy.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-100">
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              New Collection 2026
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Style that
              <br />
              speaks for
              <br />
              itself.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Discover thoughtfully designed essentials,
              premium footwear and timeless accessories
              made for everyday living.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center justify-center gap-2 rounded-lg bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Shop Collection
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/booking")}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-7 py-4 text-sm font-semibold text-gray-900 transition hover:border-black"
              >
                <CalendarDays size={18} />
                Book Appointment
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle size={17} />
                Premium Quality
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle size={17} />
                Secure Checkout
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle size={17} />
                Easy Shopping
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white">
              <img
                src="/images/dress.png"
                alt="Featured collection"
                className="h-[520px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 p-5 shadow-lg backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
                Featured
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                Discover the collection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
          </div>

          <button
            onClick={() => navigate("/shop")}
            className="hidden items-center gap-2 text-sm font-semibold text-gray-900 sm:flex"
          >
            View All
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate(category.link)}
              className="group text-left"
            >
              <div className="overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>

                <ArrowRight
                  size={19}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-black"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                Curated for you
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Products
              </h2>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="hidden items-center gap-2 text-sm font-semibold text-gray-900 sm:flex"
            >
              View All
              <ArrowRight size={17} />
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-gray-500">
                Loading products...
              </p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-12 text-center">
              <p className="text-gray-500">
                No products available.
              </p>
            </div>
          )}

          <button
            onClick={() => navigate("/shop")}
            className="mx-auto mt-10 flex items-center gap-2 rounded-lg bg-black px-7 py-3 font-medium text-white transition hover:bg-gray-800 sm:hidden"
          >
            View All Products
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* APPOINTMENT BANNER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl bg-black">
          <div className="grid items-center lg:grid-cols-2">
            <div className="p-8 text-white sm:p-12 lg:p-16">
              <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                Personal Experience
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Need help finding the perfect style?
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-gray-300">
                Book an appointment and get personalized
                assistance from our team.
              </p>

              <button
                onClick={() => navigate("/booking")}
                className="mt-8 flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Book an Appointment
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="hidden h-full min-h-[360px] lg:block">
              <img
                src="/images/bag.png"
                alt="Personal shopping experience"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              Customer Stories
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What our customers say
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                <div className="flex gap-1">
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      className="fill-current text-black"
                    />
                  ))}
                </div>

                <p className="mt-5 leading-7 text-gray-600">
                  "{testimonial.text}"
                </p>

                <p className="mt-6 font-semibold text-gray-900">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center sm:p-12">
          <Mail
            size={30}
            className="mx-auto text-gray-700"
          />

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
            Stay in the loop
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Get updates about new collections, exclusive
            offers and the latest arrivals.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              alert("Thank you for subscribing!");
            }}
            className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />

            <button
              type="submit"
              className="rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* BRAND */}
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                QuickBuy!
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
                Thoughtfully designed products for modern
                everyday living.
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  aria-label="Instagram"
                  className="rounded-full border border-gray-200 p-2.5 text-gray-600 transition hover:border-black hover:text-black"
                >
                  <Camera size={18} />
                </button>
              </div>
            </div>

            {/* SHOP */}
            <div>
              <h4 className="font-semibold text-gray-900">
                Shop
              </h4>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <button
                  onClick={() => navigate("/shop")}
                  className="block transition hover:text-black"
                >
                  All Products
                </button>

                <button
                  onClick={() =>
                    navigate("/shop?category=Men")
                  }
                  className="block transition hover:text-black"
                >
                  Men
                </button>

                <button
                  onClick={() =>
                    navigate("/shop?category=Women")
                  }
                  className="block transition hover:text-black"
                >
                  Women
                </button>

                <button
                  onClick={() =>
                    navigate(
                      "/shop?category=Accessories"
                    )
                  }
                  className="block transition hover:text-black"
                >
                  Accessories
                </button>
              </div>
            </div>

            {/* ACCOUNT */}
            <div>
              <h4 className="font-semibold text-gray-900">
                Account
              </h4>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <button
                  onClick={() => navigate("/profile")}
                  className="block transition hover:text-black"
                >
                  My Profile
                </button>

                <button
                  onClick={() => navigate("/orders")}
                  className="block transition hover:text-black"
                >
                  My Orders
                </button>

                <button
                  onClick={() => navigate("/bookings")}
                  className="block transition hover:text-black"
                >
                  My Bookings
                </button>

                <button
                  onClick={() => navigate("/booking")}
                  className="block transition hover:text-black"
                >
                  Book Appointment
                </button>
              </div>
            </div>

            {/* SUPPORT */}
            <div>
              <h4 className="font-semibold text-gray-900">
                Support
              </h4>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <p>Customer Support</p>
                <p>Shipping & Returns</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
            © 2026 QuickBuy!. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;