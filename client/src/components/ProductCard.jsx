import { Star } from "lucide-react";

function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
          <Star size={16} className="fill-current" />
          <span>{product.rating}</span>
        </div>

        <p className="mt-2 text-xl font-bold text-gray-900">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;