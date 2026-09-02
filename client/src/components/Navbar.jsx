import { Search, ShoppingBag, User } from "lucide-react";

function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">
          ECOMMERCE
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-gray-900">
            Home
          </a>

          <a
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Shop
          </a>

          <a
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Men
          </a>

          <a
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Women
          </a>

          <a
            href="#"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Accessories
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
            className="text-gray-700 transition hover:text-black"
            aria-label="Search"
          >
            <Search size={21} />
          </button>

          <button
            className="text-gray-700 transition hover:text-black"
            aria-label="Account"
          >
            <User size={21} />
          </button>

          <button
            className="relative text-gray-700 transition hover:text-black"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={21} />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
              0
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;