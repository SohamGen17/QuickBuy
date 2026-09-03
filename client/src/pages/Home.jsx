import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Camera,
  Mail,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
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

  const featuredProducts = products.slice(0, 4);

  const categories = [
    {
      name: "Men",
      description: "Modern essentials for every day",
      image: "/images/shirt.png",
    },
    {
      name: "Women",
      description: "Effortless styles made to stand out",
      image: "/images/dress.png",
    },
    {
      name: "Footwear",
      description: "Step into comfort and confidence",
      image: "/images/shoes.png",
    },
    {
      name: "Accessories",
      description: "Complete your look with details",
      image: "/images/watch.png",
    },
  ];

  const testimonials = [
    {
      name: "Aarav Mehta",
      text: "The quality is excellent and the shopping experience feels incredibly smooth.",
      rating: 5,
    },
    {
      name: "Riya Sharma",
      text: "QuickBuy has become my go-to place for modern everyday fashion.",
      rating: 5,
    },
    {
      name: "Kabir Joshi",
      text: "Great products, clean design and a really convenient checkout experience.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-[#F7F7F5] text-[#172033]">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-white/70" />

        {/* Hero content */}
        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">

          {/* LEFT SIDE */}
          <div className="max-w-xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2A9D8F]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2A9D8F] backdrop-blur">
              <CheckCircle size={16} />
              Curated fashion. Made simple.
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#172033] sm:text-6xl lg:text-7xl">
              Style that
              <span className="block text-[#2A9D8F]">
                moves with you.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#5F6878] sm:text-lg">
              Discover thoughtfully selected fashion, footwear and
              accessories designed to make everyday style effortless.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/shop")}
                className="group flex items-center justify-center gap-2 rounded-full bg-[#172033] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#24304A] hover:shadow-lg"
              >
                Shop collection
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => navigate("/booking")}
                className="flex items-center justify-center gap-2 rounded-full border border-[#172033]/15 bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#172033] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                <CalendarDays size={18} />
                Book an appointment
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#5F6878]">
              <div className="flex items-center gap-2">
                <CheckCircle
                  size={17}
                  className="text-[#2E8B57]"
                />
                Secure checkout
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle
                  size={17}
                  className="text-[#2E8B57]"
                />
                Premium quality
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle
                  size={17}
                  className="text-[#2E8B57]"
                />
                Easy returns
              </div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative">

            <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-2xl backdrop-blur-sm">
              <img
                src="/images/dress.png"
                alt="Featured collection"
                className="h-[300px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-1 text-[#2A9D8F]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    className="fill-current"
                  />
                ))}
              </div>

              <p className="mt-2 text-sm font-bold text-[#172033]">
                Loved by shoppers
              </p>

              <p className="mt-0.5 text-xs text-[#5F6878]">
                Quality you can count on
              </p>
            </div>

            {/* Floating collection card */}
            <div className="absolute -right-4 top-8 hidden rounded-2xl border border-white/80 bg-white/90 px-5 py-4 shadow-xl backdrop-blur sm:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5F6878]">
                New collection
              </p>

              <p className="mt-1 text-lg font-bold text-[#172033]">
                Everyday Essentials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORIES
      ========================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2A9D8F]">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
              Shop by category
            </h2>

            <p className="mt-3 max-w-xl text-[#5F6878]">
              Find pieces that fit your style, occasion and everyday routine.
            </p>
          </div>

          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-sm font-semibold text-[#172033] transition hover:text-[#2A9D8F]"
          >
            View all
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() =>
                navigate(
                  `/shop?category=${
                    category.name === "Accessories"
                      ? "Accessories"
                      : category.name
                  }`
                )
              }
              className="group overflow-hidden rounded-3xl bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-72 overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[#172033]">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#5F6878]">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#2A9D8F]">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =========================
          FEATURED PRODUCTS
      ========================== */}
      <section className="border-y border-gray-200/80 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2A9D8F]">
                Curated for you
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
                Featured products
              </h2>

              <p className="mt-3 max-w-xl text-[#5F6878]">
                A few of our most-loved pieces, selected for effortless
                everyday style.
              </p>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 text-sm font-semibold text-[#172033] transition hover:text-[#2A9D8F]"
            >
              Shop all products
              <ArrowRight size={17} />
            </button>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl bg-[#F7F7F5]"
                >
                  <div className="h-64 animate-pulse bg-gray-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                    <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
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
            <div className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-10 text-center">
              <p className="font-semibold text-[#172033]">
                No products available right now.
              </p>

              <p className="mt-2 text-sm text-[#5F6878]">
                Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          APPOINTMENT BANNER
      ========================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#172033] px-7 py-12 sm:px-12 lg:px-16">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2A9D8F]/20 blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-[#2A9D8F]/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-2xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                <CalendarDays size={17} />
                Personal styling
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Want a more personal shopping experience?
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-white/70">
                Book an appointment with our team and get help finding
                pieces that match your style and preferences.
              </p>
            </div>

            <button
              onClick={() => navigate("/booking")}
              className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#172033] transition hover:-translate-y-0.5 hover:bg-[#E4F3F0] hover:shadow-lg"
            >
              Book appointment
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          TESTIMONIALS
      ========================== */}
      <section className="border-y border-gray-200/80 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2A9D8F]">
              Customer stories
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
              What our shoppers say
            </h2>

            <p className="mt-3 text-[#5F6878]">
              Real experiences from people who shop with QuickBuy.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-3xl border border-gray-200 bg-[#F7F7F5] p-7"
              >
                <div className="flex gap-1 text-[#2A9D8F]">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      className="fill-current"
                    />
                  ))}
                </div>

                <p className="mt-5 text-base leading-7 text-[#5F6878]">
                  “{testimonial.text}”
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4F3F0] text-sm font-bold text-[#2A9D8F]">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#172033]">
                      {testimonial.name}
                    </p>

                    <p className="text-xs text-[#5F6878]">
                      Verified shopper
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          NEWSLETTER
      ========================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="rounded-[2rem] border border-gray-200 bg-[#E4F3F0] px-7 py-12 sm:px-12">

          <div className="mx-auto max-w-2xl text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2A9D8F] shadow-sm">
              <Mail size={21} />
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#172033]">
              Stay in the loop
            </h2>

            <p className="mt-3 text-[#5F6878]">
              Get updates about new collections, special offers and
              the latest from QuickBuy.
            </p>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <div className="flex h-12 flex-1 items-center rounded-full border border-gray-200 bg-white px-4">
                <Mail
                  size={17}
                  className="mr-2 shrink-0 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm text-[#172033] outline-none placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="h-12 rounded-full bg-[#172033] px-6 text-sm font-semibold text-white transition hover:bg-[#24304A]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="border-t border-gray-200 bg-[#172033] text-white">

        <div className="mx-auto max-w-7xl px-6 py-14">

          <div className="grid gap-10 md:grid-cols-4">

            {/* Brand */}
            <div className="md:col-span-2">

              <button
                onClick={() => navigate("/")}
                className="group"
              >
                <span className="text-2xl font-extrabold tracking-[-0.04em]">
                  QuickBuy
                </span>

                <span className="text-2xl font-extrabold text-[#2A9D8F]">
                  !
                </span>
              </button>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
                A modern shopping experience built around quality,
                simplicity and everyday style.
              </p>

              <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/15 hover:text-white">
                <Camera size={18} />
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-sm font-semibold">
                Shop
              </h3>

              <div className="mt-4 space-y-3 text-sm text-white/60">
                <button
                  onClick={() => navigate("/shop")}
                  className="block transition hover:text-white"
                >
                  All products
                </button>

                <button
                  onClick={() =>
                    navigate("/shop?category=Men")
                  }
                  className="block transition hover:text-white"
                >
                  Men
                </button>

                <button
                  onClick={() =>
                    navigate("/shop?category=Women")
                  }
                  className="block transition hover:text-white"
                >
                  Women
                </button>

                <button
                  onClick={() =>
                    navigate("/shop?category=Accessories")
                  }
                  className="block transition hover:text-white"
                >
                  Accessories
                </button>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-sm font-semibold">
                Account
              </h3>

              <div className="mt-4 space-y-3 text-sm text-white/60">

                <button
                  onClick={() => navigate("/profile")}
                  className="block transition hover:text-white"
                >
                  Profile
                </button>

                <button
                  onClick={() => navigate("/orders")}
                  className="block transition hover:text-white"
                >
                  My orders
                </button>

                <button
                  onClick={() => navigate("/bookings")}
                  className="block transition hover:text-white"
                >
                  My bookings
                </button>

                <button
                  onClick={() => navigate("/booking")}
                  className="block transition hover:text-white"
                >
                  Appointments
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row">
            <p>
              © 2026 QuickBuy! All rights reserved.
            </p>

            <p>
              Built for the e-commerce hackathon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;