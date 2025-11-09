import { formatCurrency } from "@/lib/formatters";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StarRateing from "@/components/StarRating";
import { Product } from "@prisma/client";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      scroll={true}
      className="flex flex-col items-start gap-0.5 cursor-pointer"
    >
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
        <Image
          src={product.images?.[0]}
          alt={product.name}
          className="group-hover:scale-105 transition object-contain w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <Heart className="w-3 h-3 text-gray-700" />
        </button>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product.name}
      </p>
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate mb-1">
        {product.description}
      </p>

      <StarRateing
        maxRating={7}
        color={"#F97316"}
        size={16}
        onRate={product.rate}
      />

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">
          {formatCurrency(product.offerPrice)}
        </p>
        <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
          Buy now
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
