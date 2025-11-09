import Link from "next/link";
import { redirect } from "next/navigation";
import ProductForm from "../_components/ProductForm";
import { ArrowLeftCircle } from "lucide-react";
import { Routes } from "@/constants/enums";
import { getCategories } from "@/server/db/categories";

const AddProductPage = async () => {
  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    redirect(`${Routes.CATEGORIES}/add`);
  }

  return (
    <main>
      <section className="section-gap w-full lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${Routes.PRODUCTS}?pageNumber=1`}
            className="flex items-center gap-2 mb-5 bg-gray-500 hover:bg-gray-600 transition-all text-white text-sm sm:text-base rounded-full w-fit py-2 px-3"
          >
            <ArrowLeftCircle size={24} /> Back to Products
          </Link>

          <ProductForm key="new-product" categories={categories} />
        </div>
      </section>
    </main>
  );
};

export default AddProductPage;
