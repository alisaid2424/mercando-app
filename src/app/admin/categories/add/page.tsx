import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import CategoryForm from "../_components/CategoryForm";
import { Routes } from "@/constants/enums";

const AddCategoryPage = () => {
  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${Routes.CATEGORIES}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-gray-600 hover:bg-gray-500 transition-all duration-300 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <ArrowLeftCircle size={24} /> Back to Categories
          </Link>

          <CategoryForm key="new" />
        </div>
      </section>
    </main>
  );
};

export default AddCategoryPage;
