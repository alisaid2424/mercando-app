import ProductCard from "@/components/ProductCard";
import LottieHandler from "@/lib/LottieHandler";
import { getUserFavoriteIds } from "@/server/db/favorite";
import { getAllProducts } from "@/server/db/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse all products available on Mercando. Discover curated items, compare options, and save your favorites.",
};

const AllProducts = async () => {
  const products = await getAllProducts();
  const userFavoriteIds = await getUserFavoriteIds();

  return (
    <section
      aria-labelledby="all-products-heading"
      className="wrapper flex flex-col items-start"
    >
      <div className="flex flex-col items-end pt-12">
        <h1 id="all-products-heading" className="text-2xl font-medium">
          All products
        </h1>

        <div
          aria-hidden="true"
          className="w-16 h-0.5 bg-primary rounded-full"
        />
      </div>

      {products.length ? (
        <ul
          aria-label="All products list"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full"
        >
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard
                product={product}
                isFavorite={userFavoriteIds.includes(product.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="element-center text-center min-h-[60vh] w-full"
          aria-live="polite"
          aria-label="Products status"
        >
          <LottieHandler type="empty" message="No Products Found" />
        </div>
      )}
    </section>
  );
};

export default AllProducts;
