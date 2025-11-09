import ProductCard from "@/components/ProductCard";
import StarRateing from "@/components/StarRating";
import ProductImageGallary from "@/components/ProductImageGallary";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/AddToCartButton";
import { getAllProducts, getProduct } from "@/server/db/products";
import { productIncloudeCategory } from "@/types/product";

type PageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const Product = async ({ params }: PageProps) => {
  const { productId } = await params;
  const productData = (await getProduct(productId)) as productIncloudeCategory;
  const getProducts = await getAllProducts();

  return (
    <div className="container max-w-7xl space-y-10 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <ProductImageGallary productData={productData} />

        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-800/90 mb-4">
            {productData.name}
          </h1>

          <StarRateing
            maxRating={7}
            color={"#F97316"}
            size={18}
            onRate={productData.rate}
          />

          <p className="text-gray-600 mt-3">{productData.description}</p>
          <p className="text-3xl font-medium mt-6">
            ${productData.offerPrice}
            <span className="text-base font-normal text-gray-800/60 line-through ml-2">
              ${productData.price}
            </span>
          </p>
          <hr className="bg-gray-600 my-6" />
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                <tr>
                  <td className="text-gray-600 font-medium">Brand</td>
                  <td className="text-gray-800/50 ">Generic</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Color</td>
                  <td className="text-gray-800/50 ">Multi</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-800/50">
                    {productData.category.name}
                  </td>
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
          {getProducts.slice(0, 5).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          className="mb-16 hover:!bg-transparent hover:text-primary hover:border-primary transition"
        >
          See more
        </Button>
      </div>
    </div>
  );
};

export default Product;
