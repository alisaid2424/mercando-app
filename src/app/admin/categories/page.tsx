import AdminTable from "@/components/AdminTable";
import prisma from "@/lib/db";
import { getCategoriesByPagenation } from "@/server/db/categories";

type CategoriesPageProps = {
  searchParams: Promise<{
    pageNumber: string;
  }>;
};

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
  const { pageNumber } = await searchParams;

  const categories = await getCategoriesByPagenation(parseInt(pageNumber));
  const count: number = await prisma.category.count();

  const columns = [
    { key: "name", name: "Name" },
    { key: "description", name: "Description" },
    { key: "image", name: "Image" },
    { key: "createdAt", name: "CreatedAt" },
    { key: "updatedAt", name: "UpdatedAt" },
  ];

  return (
    <AdminTable
      data={categories}
      columns={columns}
      pageNumber={pageNumber}
      totalCount={count}
      type="categories"
    />
  );
};

export default CategoriesPage;
