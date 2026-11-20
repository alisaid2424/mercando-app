import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import StarRateing from "@/components/StarRating";
import { Product } from "@prisma/client";
import AddToFavoriteButton from "./AddToFavoriteButton";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
}

const ProductCard = async ({
  product,
  isFavorite = false,
}: ProductCardProps) => {
  return (
    <div className="group relative flex flex-col items-start gap-0.5">
      <Link
        href={`/product/${product.id}`}
        scroll={true}
        className="flex w-full flex-col items-start gap-0.5 cursor-pointer"
      >
        <div className="relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
          <Image
            src={product.images?.[0]}
            alt={product.name}
            className="group-hover:scale-105 transition object-contain w-4/5 h-4/5 md:w-full md:h-full"
            width={800}
            height={800}
            sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 18vw"
          />
        </div>

        <p className="md:text-base font-medium pt-2 w-full truncate">
          {product.name}
        </p>
        <p className="w-full text-xs text-gray-600 max-sm:hidden truncate mb-1">
          {product.description}
        </p>

        <StarRateing
          maxRating={7}
          color={"#F97316"}
          size={16}
          onRate={product.rate}
        />
      </Link>

      <AddToFavoriteButton productId={product.id} isFavorite={isFavorite} />

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">
          {formatCurrency(product.offerPrice)}
        </p>
        <Link
          href={`/product/${product.id}`}
          aria-label={`Buy ${product.name} now`}
          className=" max-sm:hidden px-4 py-1.5 text-gray-700 border border-gray-500/30 rounded-full text-xs hover:bg-slate-50 transition"
        >
          Buy now
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
