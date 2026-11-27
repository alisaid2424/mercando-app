import Link from "next/link";
import { Pages } from "@/constants/enums";
import ProductCard from "./ProductCard";
import LottieHandler from "@/lib/LottieHandler";
import { getBestSellers } from "@/server/db/products";
import { getUserFavoriteIds } from "@/server/db/favorite";

const BestSellers = async () => {
  const [Products, userFavoriteIds] = await Promise.all([
    getBestSellers(10),
    getUserFavoriteIds(),
  ]);

  return (
    <section
      aria-labelledby="popular-products-heading"
      className="wrapper element-center flex-col pt-14"
    >
      <h2
        id="popular-products-heading"
        className="text-2xl font-medium text-left w-full"
      >
        Popular products
      </h2>

      {Products.length ? (
        <>
          <ul
            aria-label="Popular products list"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full"
          >
            {Products.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  isFavorite={userFavoriteIds.includes(product.id)}
                />
              </li>
            ))}
          </ul>

          <Link
            href={Pages.SHOP}
            aria-label="See more popular products"
            className="px-12 py-2.5 border border-gray-700 rounded text-gray-700 hover:border-primary hover:text-primary transition-all duration-300"
          >
            See More
          </Link>
        </>
      ) : (
        <div
          aria-live="polite"
          aria-label="popular Products status"
          className="w-full max-w-xs mx-auto py-20"
        >
          <LottieHandler type="empty" message="No Popular products Found" />
        </div>
      )}
    </section>
  );
};

export default BestSellers;
