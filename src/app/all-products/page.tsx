import ProductCard from "@/components/ProductCard";
import LottieHandler from "@/lib/LottieHandler";
import { getUserFavoriteIds } from "@/server/db/favorite";
import { getAllProducts } from "@/server/db/products";

const AllProducts = async () => {
  const getProducts = await getAllProducts();
  const userFavoriteIds = await getUserFavoriteIds();

  return getProducts.length ? (
    <div className="container max-w-7xl flex flex-col items-start ">
      <div className="flex flex-col items-end pt-12">
        <p className="text-2xl font-medium">All products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {getProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={userFavoriteIds.includes(product.id)}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="element-center text-center min-h-dvh">
      <LottieHandler type="empty" message="No Products Found" />
    </div>
  );
};

export default AllProducts;
