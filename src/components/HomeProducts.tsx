import Link from "next/link";
import { Pages } from "@/constants/enums";
import ProductCard from "./ProductCard";
import LottieHandler from "@/lib/LottieHandler";
import { getBestSellers } from "@/server/db/products";

const HomeProducts = async () => {
  const Products = await getBestSellers(10);
  return (
    <div className="container max-w-7xl element-center flex-col pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      {Products.length ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
            {Products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <Link
            href={Pages.SHOP}
            className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
          >
            See more
          </Link>
        </>
      ) : (
        <div className="w-full max-w-xs mx-auto">
          <LottieHandler type="empty" message="No Popular products Found" />
        </div>
      )}
    </div>
  );
};

export default HomeProducts;
