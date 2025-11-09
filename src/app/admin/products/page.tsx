import AdminTable from "@/components/AdminTable";
import prisma from "@/lib/db";
import { getProducts } from "@/server/db/products";

interface ProductsPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}
const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { pageNumber } = await searchParams;
  const page = Number(pageNumber) || 1;
  const products = await getProducts(page);
  const count: number = await prisma.product.count();

  const columns = [
    { key: "name", name: "Name" },
    { key: "description", name: "Description" },
    { key: "images", name: "Images" },
    { key: "createdAt", name: "CreatedAt" },
    { key: "updatedAt", name: "UpdatedAt" },
  ];

  return (
    <AdminTable
      data={products}
      columns={columns}
      pageNumber={pageNumber}
      totalCount={count}
      type="products"
    />
  );
};

export default ProductsPage;
