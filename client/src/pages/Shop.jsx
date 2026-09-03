import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

function Shop() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(searchQuery);
  const [category, setCategory] = useState(
    selectedCategory || "All"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update category when URL changes
  useEffect(() => {
    setCategory(selectedCategory || "All");
  }, [selectedCategory]);

  // Update search when URL changes
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  // Categories
  const categories = useMemo(() => {
    return [
      "All",
      "Men",
      "Women",
      "Accessories",
      "Footwear",
      "Bags",
      "Watches",
    ];
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const productCategory =
        product.category?.toLowerCase();

      let matchesCategory = true;

      if (category !== "All") {
        if (category === "Accessories") {
          matchesCategory = [
            "bags",
            "watches",
          ].includes(productCategory);
        } else {
          matchesCategory =
            productCategory === category.toLowerCase();
        }
      }

      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.description
          ?.toLowerCase()
          .includes(query) ||
        productCategory?.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  // Search
  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/shop");
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(query)}`
    );
  };

  // Category
  const handleCategoryChange = (selected) => {
    setCategory(selected);

    if (selected === "All") {
      navigate("/shop");
      return;
    }

    navigate(
      `/shop?category=${encodeURIComponent(selected)}`
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    navigate("/shop");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#172033]">
      <Navbar />

      <main>
        {/* =========================
            SHOP HERO / HEADER
        ========================== */}
        <section
          className="relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/shop-bg.png')",
          }}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-white/75" />

          {/* Decorative blur */}
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#2A9D8F]/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2A9D8F]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2A9D8F] backdrop-blur">
                <SlidersHorizontal size={16} />
                Curated collection
              </div>

              <h1 className="text-5xl font-extrabold tracking-[-0.04em] text-[#172033] sm:text-6xl">
                Shop
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F6878] sm:text-lg">
                Discover carefully selected fashion, footwear and
                accessories designed to make everyday style effortless.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            PRODUCTS AREA
        ========================== */}
        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">

          {/* Search + filters */}
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="flex h-12 w-full items-center rounded-full border border-gray-200 bg-[#F7F7F5] transition focus-within:border-[#2A9D8F] focus-within:ring-4 focus-within:ring-[#2A9D8F]/10 lg:max-w-xl"
              >
                <Search
                  size={18}
                  className="ml-4 shrink-0 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full bg-transparent px-3 text-sm text-[#172033] outline-none placeholder:text-gray-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      navigate("/shop");
                    }}
                    className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-[#172033]"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}

                <button
                  type="submit"
                  className="mr-1.5 rounded-full bg-[#172033] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24304A]"
                >
                  Search
                </button>
              </form>

              {/* Category selector */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                  <SlidersHorizontal size={17} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#5F6878]">
                    Category
                  </p>

                  <select
                    value={category}
                    onChange={(event) =>
                      handleCategoryChange(event.target.value)
                    }
                    className="mt-0.5 cursor-pointer bg-transparent text-sm font-semibold text-[#172033] outline-none"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Category pills */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    onClick={() =>
                      handleCategoryChange(item)
                    }
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-[#172033] text-white shadow-sm"
                        : "bg-[#F7F7F5] text-[#5F6878] hover:bg-[#E4F3F0] hover:text-[#172033]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active filters */}
          {(search || category !== "All") && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-[#5F6878]">
                Active filters:
              </span>

              {search && (
                <span className="flex items-center gap-2 rounded-full bg-[#172033] px-4 py-2 text-sm text-white">
                  Search: "{search}"

                  <button
                    onClick={() => {
                      setSearch("");
                      navigate("/shop");
                    }}
                    className="text-white/60 transition hover:text-white"
                    aria-label="Remove search filter"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}

              {category !== "All" && (
                <span className="flex items-center gap-2 rounded-full bg-[#E4F3F0] px-4 py-2 text-sm font-medium text-[#172033]">
                  Category: {category}

                  <button
                    onClick={() =>
                      handleCategoryChange("All")
                    }
                    className="text-[#5F6878] transition hover:text-[#172033]"
                    aria-label="Remove category filter"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}

              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-[#5F6878] underline underline-offset-4 transition hover:text-[#2A9D8F]"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(
                (item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <div className="h-64 animate-pulse bg-gray-200" />

                    <div className="space-y-3 p-5">
                      <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

                      <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />

                      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />

                      <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-10 flex min-h-[40vh] items-center justify-center rounded-3xl border border-gray-200 bg-white">
              <div className="max-w-md px-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <X size={24} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#172033]">
                  Something went wrong
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#5F6878]">
                  {error}
                </p>

                <button
                  onClick={() =>
                    window.location.reload()
                  }
                  className="mt-6 rounded-full bg-[#172033] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24304A]"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Products */}
          {!loading && !error && (
            <>
              {/* Results header */}
              <div className="mb-6 mt-10 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5F6878]">
                    Showing{" "}
                    <span className="font-semibold text-[#172033]">
                      {filteredProducts.length}
                    </span>{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}
                  </p>
                </div>

                {(search || category !== "All") && (
                  <button
                    onClick={clearFilters}
                    className="hidden items-center gap-1 text-sm font-semibold text-[#5F6878] transition hover:text-[#2A9D8F] sm:flex"
                  >
                    Clear filters
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>

              {/* Product grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
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
                <div className="mt-8 flex min-h-[420px] items-center justify-center rounded-3xl border border-gray-200 bg-white px-6">
                  <div className="max-w-md text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E4F3F0] text-[#2A9D8F]">
                      <Search size={27} />
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-[#172033]">
                      No products found
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#5F6878]">
                      We couldn't find anything matching your
                      current search or category. Try adjusting
                      your filters.
                    </p>

                    <button
                      onClick={clearFilters}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#172033] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#24304A] hover:shadow-lg"
                    >
                      View all products
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default Shop;