import { getCategory } from "@/server/db/categories";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryForm from "../../_components/CategoryForm";
import { Routes } from "@/constants/enums";

type PageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

const EditCategoryPage = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);

  if (!category) notFound();

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${Routes.CATEGORIES}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-gray-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <ArrowLeftCircle size={24} /> Back to Categories
          </Link>

          <CategoryForm key={category.id} category={category} />
        </div>
      </section>
    </main>
  );
};

export default EditCategoryPage;
