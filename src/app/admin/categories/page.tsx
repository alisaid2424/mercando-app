import AdminTable from "@/components/AdminTable";
import prisma from "@/lib/db";
import { getCategoriesByPagenation } from "@/server/db/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Manage product categories, descriptions, and images on Mercando from the admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

type CategoriesPageProps = {
  searchParams: Promise<{
    pageNumber: string;
  }>;
};

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
  const { pageNumber } = await searchParams;
  const [categories, count] = await Promise.all([
    getCategoriesByPagenation(parseInt(pageNumber || "1")),
    prisma.category.count(),
  ]);

  const columns = [
    { key: "name", name: "Name" },
    { key: "description", name: "Description" },
    { key: "image", name: "Image" },
    { key: "createdAt", name: "CreatedAt" },
    { key: "updatedAt", name: "UpdatedAt" },
  ];

  return (
    <section aria-labelledby="categories-heading" className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-end">
          <h1
            id="categories-heading"
            className="text-2xl font-semibold text-gray-900"
          >
            Categories
          </h1>
          <div
            aria-hidden="true"
            className="w-14 h-0.5 bg-primary rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600">Total: {count}</p>
      </div>

      <AdminTable
        data={categories}
        columns={columns}
        pageNumber={pageNumber}
        totalCount={count}
        type="categories"
      />
    </section>
  );
};

export default CategoriesPage;
