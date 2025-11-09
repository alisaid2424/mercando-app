import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories } from "@/server/db/categories";
import { getProduct } from "@/server/db/products";
import { Routes } from "@/constants/enums";
import ProductForm from "../../_components/ProductForm";
import { ArrowLeftCircle } from "lucide-react";

interface EditProductPageProps {
  params: Promise<{ productId: string }>;
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { productId } = await params;
  const categories = await getCategories();
  const product = await getProduct(productId);

  if (!product) notFound();

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${Routes.PRODUCTS}?pageNumber=1`}
            className="flex items-center gap-2 mb-5 bg-gray-600 hover:bg-gray-500 transition-all duration-300 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <ArrowLeftCircle size={24} /> Back to Products List
          </Link>

          <ProductForm
            key={product.id}
            product={product}
            categories={categories}
          />
        </div>
      </section>
    </main>
  );
};

export default EditProductPage;
