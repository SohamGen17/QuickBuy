import {
  LayoutDashboard,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/shop");
      setMobileMenu(false);
      return;
    }

    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setMobileMenu(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenu(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const navItemClass = (active) =>
    `relative py-2 text-sm font-medium transition ${
      active
        ? "text-gray-950"
        : "text-gray-500 hover:text-gray-950"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-[#F7F7F5]/95 backdrop-blur-xl">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="hidden bg-[#172033] px-6 py-2 text-center text-xs font-medium tracking-wide text-white sm:block">
        Free shipping on orders above ₹5,000
      </div>

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6">
        {/* LOGO */}
        <button
          onClick={() => handleNavigation("/")}
          className="group shrink-0"
          aria-label="QuickBuy Home"
        >
          <span className="text-[25px] font-extrabold tracking-[-0.04em] text-[#172033] transition group-hover:opacity-75">
            QuickBuy
          </span>

          <span className="ml-0.5 text-[25px] font-extrabold text-[#2A9D8F]">
            !
          </span>
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-7 lg:flex">
          <button
            onClick={() => handleNavigation("/")}
            className={navItemClass(isActive("/"))}
          >
            Home

            {isActive("/") && (
              <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-5 rounded-full bg-[#2A9D8F]" />
            )}
          </button>

          <button
            onClick={() => handleNavigation("/shop")}
            className={navItemClass(isActive("/shop"))}
          >
            Shop

            {isActive("/shop") && (
              <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-5 rounded-full bg-[#2A9D8F]" />
            )}
          </button>

          <button
            onClick={() =>
              handleNavigation("/shop?category=Men")
            }
            className="py-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
          >
            Men
          </button>

          <button
            onClick={() =>
              handleNavigation("/shop?category=Women")
            }
            className="py-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
          >
            Women
          </button>

          <button
            onClick={() =>
              handleNavigation(
                "/shop?category=Accessories"
              )
            }
            className="py-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
          >
            Accessories
          </button>

          <button
            onClick={() => handleNavigation("/booking")}
            className={navItemClass(isActive("/booking"))}
          >
            Appointments

            {isActive("/booking") && (
              <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-5 rounded-full bg-[#2A9D8F]" />
            )}
          </button>

          {/* ADMIN */}
          {user?.role === "admin" && (
            <button
              onClick={() => handleNavigation("/admin")}
              className="flex items-center gap-1.5 rounded-full bg-[#E4F3F0] px-3.5 py-2 text-sm font-semibold text-[#172033] transition hover:bg-[#D5ECE8]"
            >
              <LayoutDashboard size={16} />
              Admin
            </button>
          )}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-2 md:flex">
          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="mr-2 flex h-10 items-center rounded-full border border-gray-200 bg-white transition focus-within:border-[#2A9D8F] focus-within:ring-2 focus-within:ring-[#2A9D8F]/10"
          >
            <Search
              size={17}
              className="ml-3.5 shrink-0 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products"
              className="w-32 bg-transparent px-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 lg:w-40"
            />
          </form>

          {/* ACCOUNT */}
          <button
            onClick={() =>
              handleNavigation(
                user ? "/profile" : "/login"
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-white hover:text-[#172033]"
            aria-label="Account"
          >
            <User size={20} />
          </button>

          {/* CART */}
          <button
            onClick={() => handleNavigation("/cart")}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-white hover:text-[#172033]"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#2A9D8F] px-1 text-[9px] font-bold text-white ring-2 ring-[#F7F7F5]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-1 md:hidden">
          {/* SEARCH */}
          <button
            onClick={() => handleNavigation("/shop")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-white hover:text-[#172033]"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* ACCOUNT */}
          <button
            onClick={() =>
              handleNavigation(
                user ? "/profile" : "/login"
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-white hover:text-[#172033]"
            aria-label="Account"
          >
            <User size={20} />
          </button>

          {/* CART */}
          <button
            onClick={() => handleNavigation("/cart")}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-white hover:text-[#172033]"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#2A9D8F] px-1 text-[9px] font-bold text-white ring-2 ring-[#F7F7F5]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* MENU */}
          <button
            onClick={() =>
              setMobileMenu((current) => !current)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-white hover:text-[#172033]"
            aria-label="Menu"
          >
            {mobileMenu ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="border-t border-gray-200/80 bg-[#F7F7F5] px-5 pb-6 md:hidden">
          <nav className="flex flex-col">
            <button
              onClick={() => handleNavigation("/")}
              className="border-b border-gray-200 py-4 text-left text-sm font-semibold text-gray-900"
            >
              Home
            </button>

            <button
              onClick={() => handleNavigation("/shop")}
              className="border-b border-gray-200 py-4 text-left text-sm font-medium text-gray-600"
            >
              Shop
            </button>

            <button
              onClick={() =>
                handleNavigation("/shop?category=Men")
              }
              className="border-b border-gray-200 py-4 text-left text-sm font-medium text-gray-600"
            >
              Men
            </button>

            <button
              onClick={() =>
                handleNavigation("/shop?category=Women")
              }
              className="border-b border-gray-200 py-4 text-left text-sm font-medium text-gray-600"
            >
              Women
            </button>

            <button
              onClick={() =>
                handleNavigation(
                  "/shop?category=Accessories"
                )
              }
              className="border-b border-gray-200 py-4 text-left text-sm font-medium text-gray-600"
            >
              Accessories
            </button>

            <button
              onClick={() =>
                handleNavigation("/booking")
              }
              className="border-b border-gray-200 py-4 text-left text-sm font-medium text-gray-600"
            >
              Appointments
            </button>

            {/* MOBILE ADMIN */}
            {user?.role === "admin" && (
              <button
                onClick={() =>
                  handleNavigation("/admin")
                }
                className="flex items-center gap-2 border-b border-gray-200 py-4 text-left text-sm font-semibold text-[#172033]"
              >
                <LayoutDashboard size={17} />
                Admin Dashboard
              </button>
            )}

            {/* MOBILE SEARCH */}
            <form
              onSubmit={handleSearch}
              className="mt-5 flex h-11 items-center rounded-full border border-gray-200 bg-white transition focus-within:border-[#2A9D8F]"
            >
              <Search
                size={18}
                className="ml-4 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products..."
                className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-gray-400"
              />
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;