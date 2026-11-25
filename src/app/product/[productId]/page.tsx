import ProductCard from "@/components/ProductCard";
import StarRateing from "@/components/StarRating";
import ProductImageGallary from "@/components/ProductImageGallary";
import AddToCartButton from "@/components/AddToCartButton";
import { getLatestProducts, getProduct } from "@/server/db/products";
import { getUserFavoriteIds } from "@/server/db/favorite";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Pages } from "@/constants/enums";

type PageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const Product = async ({ params }: PageProps) => {
  const { productId } = await params;
  const [productData, relatedProducts, userFavoriteIds] = await Promise.all([
    getProduct(productId),
    getLatestProducts(5),
    getUserFavoriteIds(),
  ]);

  if (!productData) {
    notFound();
  }

  return (
    <div className="container max-w-7xl space-y-10 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <ProductImageGallary productData={productData} />

        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-800/90 mb-4">
            {productData.name}
          </h2>

          <StarRateing
            maxRating={7}
            color={"#F97316"}
            size={18}
            onRate={productData.rate}
          />

          <p className="text-gray-600 mt-3">{productData.description}</p>
          <p className="text-3xl font-medium mt-6">
            ${productData.offerPrice}
            <span className="text-base font-normal text-gray-500 line-through ml-2">
              ${productData.price}
            </span>
          </p>
          <hr className="bg-gray-600 my-6" />
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                <tr>
                  <td className="text-gray-600 font-medium">Brand</td>
                  <td className="text-gray-600">Generic</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Color</td>
                  <td className="text-gray-600">Multi</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-600">{productData.category.name}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <AddToCartButton product={productData} />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-16">
          <p className="text-3xl font-medium">
            Featured
            <span className="ms-1 font-medium text-primary">Products</span>
          </p>
          <div className="w-28 h-0.5 bg-primary mt-2"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={userFavoriteIds.includes(product.id)}
            />
          ))}
        </div>

        <Link
          href={Pages.SHOP}
          className="mb-16 px-12 py-2.5 border border-gray-700 rounded text-gray-700 hover:border-primary hover:text-primary  transition-all duration-300"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default Product;
