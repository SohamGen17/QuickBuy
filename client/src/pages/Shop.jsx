import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Collection
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Shop
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Discover our collection of carefully selected
            products designed for everyday style.
          </p>
        </div>

        {/* Search + Category */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex w-full items-center rounded-lg border border-gray-300 bg-white lg:max-w-md"
          >
            <Search
              size={19}
              className="ml-4 shrink-0 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products..."
              className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            />

            <button
              type="submit"
              className="mr-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Search
            </button>
          </form>

          {/* Category */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal
              size={19}
              className="text-gray-500"
            />

            <select
              value={category}
              onChange={(event) =>
                handleCategoryChange(event.target.value)
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(search || category !== "All") && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-500">
              Active filters:
            </span>

            {search && (
              <span className="rounded-full bg-black px-4 py-2 text-sm text-white">
                Search: "{search}"
              </span>
            )}

            {category !== "All" && (
              <span className="rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-800">
                Category: {category}
              </span>
            )}

            <button
              onClick={clearFilters}
              className="text-sm font-medium text-gray-600 underline transition hover:text-black"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-gray-500">
              Loading products...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Something went wrong
              </h2>

              <p className="mt-2 text-gray-500">
                {error}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}{" "}
                found
              </p>
            </div>

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
              <div className="flex min-h-[40vh] items-center justify-center rounded-2xl bg-white">
                <div className="text-center">
                  <Search
                    size={40}
                    className="mx-auto text-gray-300"
                  />

                  <h2 className="mt-4 text-xl font-semibold text-gray-900">
                    No products found
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Try a different search or category.
                  </p>

                  <button
                    onClick={clearFilters}
                    className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Shop;