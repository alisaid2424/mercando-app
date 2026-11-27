import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import StarRateing from "@/components/StarRating";
import { Product } from "@prisma/client";
import AddToFavoriteButton from "./AddToFavoriteButton";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
}

const ProductCard = ({ product, isFavorite = false }: ProductCardProps) => {
  return (
    <article
      aria-label={product.name}
      className="group relative flex flex-col items-start gap-0.5"
    >
      <Link
        href={`/product/${product.id}`}
        aria-label={product.name}
        className="flex w-full cursor-pointer flex-col items-start gap-0.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-500/10">
          <Image
            src={product.images?.[0] || "/box_icon.svg"}
            alt={product.name}
            className="h-4/5 w-4/5 object-contain transition group-hover:scale-105 md:h-full md:w-full"
            width={800}
            height={800}
            sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 18vw"
          />
        </div>

        <h3 className="w-full truncate pt-2 font-medium md:text-base">
          {product.name}
        </h3>
      </Link>

      <p className="mb-1 w-full truncate text-xs text-gray-600 max-sm:hidden">
        {product.description}
      </p>

      <StarRateing
        maxRating={7}
        color="#F97316"
        size={16}
        onRate={product.rate}
      />

      <AddToFavoriteButton productId={product.id} isFavorite={isFavorite} />

      <div className="mt-1 flex w-full items-end justify-between">
        <p className="text-base font-medium">
          {formatCurrency(product.offerPrice)}
        </p>
        <Link
          href={`/product/${product.id}`}
          aria-label={`Buy ${product.name} now`}
          className="rounded-full border border-gray-500/30 px-4 py-1.5 text-xs text-gray-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 max-sm:hidden"
        >
          Buy now
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
