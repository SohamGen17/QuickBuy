import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

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

    setMobileMenu(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="shrink-0 text-2xl font-bold tracking-tight text-gray-900"
        >
          QuickBuy!
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <button
            onClick={() => handleNavigation("/")}
            className="text-sm font-medium text-gray-900 transition hover:text-gray-500"
          >
            Home
          </button>

          <button
            onClick={() => handleNavigation("/shop")}
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Shop
          </button>

          <button
            onClick={() =>
              handleNavigation("/shop?category=Men")
            }
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Men
          </button>

          <button
            onClick={() =>
              handleNavigation("/shop?category=Women")
            }
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Women
          </button>

          <button
            onClick={() =>
              handleNavigation(
                "/shop?category=Accessories"
              )
            }
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Accessories
          </button>

          <button
            onClick={() =>
              handleNavigation("/booking")
            }
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Book Appointment
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <form
            onSubmit={handleSearch}
            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 transition focus-within:border-gray-400"
          >
            <Search
              size={18}
              className="ml-3 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search"
              className="w-28 bg-transparent px-3 py-2 text-sm outline-none lg:w-40"
            />
          </form>

          <button
            onClick={() =>
              handleNavigation(
                user ? "/profile" : "/login"
              )
            }
            className="relative text-gray-700 transition hover:text-black"
            aria-label="Account"
          >
            <User size={21} />
          </button>

          <button
            onClick={() => handleNavigation("/cart")}
            className="relative text-gray-700 transition hover:text-black"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => handleNavigation("/shop")}
            className="text-gray-700 transition hover:text-black"
            aria-label="Search"
          >
            <Search size={21} />
          </button>

          <button
            onClick={() =>
              handleNavigation(
                user ? "/profile" : "/login"
              )
            }
            className="text-gray-700 transition hover:text-black"
            aria-label="Account"
          >
            <User size={21} />
          </button>

          <button
            onClick={() => handleNavigation("/cart")}
            className="relative text-gray-700 transition hover:text-black"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() =>
              setMobileMenu((current) => !current)
            }
            className="text-gray-700 transition hover:text-black"
            aria-label="Menu"
          >
            {mobileMenu ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col">
            <button
              onClick={() => handleNavigation("/")}
              className="border-b border-gray-100 py-4 text-left text-sm font-medium text-gray-900"
            >
              Home
            </button>

            <button
              onClick={() =>
                handleNavigation("/shop")
              }
              className="border-b border-gray-100 py-4 text-left text-sm font-medium text-gray-700"
            >
              Shop
            </button>

            <button
              onClick={() =>
                handleNavigation(
                  "/shop?category=Men"
                )
              }
              className="border-b border-gray-100 py-4 text-left text-sm font-medium text-gray-700"
            >
              Men
            </button>

            <button
              onClick={() =>
                handleNavigation(
                  "/shop?category=Women"
                )
              }
              className="border-b border-gray-100 py-4 text-left text-sm font-medium text-gray-700"
            >
              Women
            </button>

            <button
              onClick={() =>
                handleNavigation(
                  "/shop?category=Accessories"
                )
              }
              className="border-b border-gray-100 py-4 text-left text-sm font-medium text-gray-700"
            >
              Accessories
            </button>

            <button
              onClick={() =>
                handleNavigation("/booking")
              }
              className="border-b border-gray-100 py-4 text-left text-sm font-medium text-gray-700"
            >
              Book Appointment
            </button>

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="mt-4 flex items-center rounded-lg border border-gray-200 bg-gray-50"
            >
              <Search
                size={18}
                className="ml-3 text-gray-400"
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
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;