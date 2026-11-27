import ProductCard from "@/components/ProductCard";
import StarRateing from "@/components/StarRating";
import ProductImageGallary from "@/components/ProductImageGallary";
import AddToCartButton from "@/components/AddToCartButton";
import { getLatestProducts, getProduct } from "@/server/db/products";
import { getUserFavoriteIds } from "@/server/db/favorite";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Pages } from "@/constants/enums";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const productData = await getProduct(productId);

  if (!productData) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: productData.name,
    description:
      productData.description?.slice(0, 160) ||
      `Buy ${productData.name} online at Mercando with fast delivery.`,
  };
}

const Product = async ({ params }: PageProps) => {
  const { productId } = await params;
  const [productData, relatedProducts, userFavoriteIds] = await Promise.all([
    getProduct(productId),
    getLatestProducts(5),
    getUserFavoriteIds(),
  ]);

  if (!productData) {
    return notFound();
  }

  return (
    <div className="wrapper space-y-10 pt-12">
      <section
        aria-labelledby="product-title"
        className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-16 xl:gap-32"
      >
        <ProductImageGallary productData={productData} />

        <div className="flex flex-col">
          <h1
            id="product-title"
            className="text-2xl sm:text-3xl font-medium text-gray-800/90 mb-4"
          >
            {productData.name}
          </h1>

          <div aria-label={`Rated ${productData.rate} out of 7`}>
            <StarRateing
              maxRating={7}
              color={"#F97316"}
              size={18}
              onRate={productData.rate}
            />
          </div>

          <p className="text-gray-600 mt-3">{productData.description}</p>

          <p className="mt-6 text-3xl font-medium">
            <span className="sr-only">Current price: </span>$
            {productData.offerPrice}
            {productData.price > productData.offerPrice && (
              <span className="ml-2 text-base font-normal text-gray-500 line-through">
                <span className="sr-only">Original price: </span>$
                {productData.price}
              </span>
            )}
          </p>

          <hr aria-hidden="true" className="my-6 bg-gray-600" />

          <div className="overflow-x-auto">
            <table className="w-full max-w-72 table-auto border-collapse text-left">
              <caption className="sr-only">Product specifications</caption>
              <tbody>
                <tr>
                  <th scope="row" className="font-medium text-gray-700">
                    Brand
                  </th>
                  <td className="text-gray-600">Generic</td>
                </tr>
                <tr>
                  <th scope="row" className="font-medium text-gray-700">
                    Color
                  </th>
                  <td className="text-gray-600">Multi</td>
                </tr>
                <tr>
                  <th scope="row" className="font-medium text-gray-700">
                    Category
                  </th>
                  <td className="text-gray-600">{productData.category.name}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <AddToCartButton product={productData} />
        </div>
      </section>

      <section
        aria-labelledby="featured-products-heading"
        className="flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-4 mt-16">
          <h2 id="featured-products-heading" className="text-3xl font-medium">
            Featured
            <span className="ms-1 font-medium text-primary">Products</span>
          </h2>
          <div aria-hidden="true" className="mt-2 h-0.5 w-28 bg-primary" />
        </div>

        <ul
          aria-label="Featured products list"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full"
        >
          {relatedProducts.map((product) => (
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
          aria-label="See more products in shop"
          className="mb-16 px-12 py-2.5 border border-gray-700 rounded text-gray-700 hover:border-primary hover:text-primary  transition-all duration-300"
        >
          See More
        </Link>
      </section>
    </div>
  );
};

export default Product;
