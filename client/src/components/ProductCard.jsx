import { Star } from "lucide-react";

function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-4 flex h-56 items-center justify-center rounded-lg bg-gray-100">
        <span className="text-gray-400">
          Product Image
        </span>
      </div>

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
  );
}

export default ProductCard;