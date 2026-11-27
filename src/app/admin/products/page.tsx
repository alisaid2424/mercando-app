import AdminTable from "@/components/AdminTable";
import prisma from "@/lib/db";
import { getProducts } from "@/server/db/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Manage store products, descriptions, images, and listings on Mercando.",
  robots: {
    index: false,
    follow: false,
  },
};

interface ProductsPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}
const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { pageNumber } = await searchParams;
  const page = Number(pageNumber) || 1;
  const [products, count] = await Promise.all([
    getProducts(page),
    prisma.product.count(),
  ]);

  const columns = [
    { key: "name", name: "Name" },
    { key: "description", name: "Description" },
    { key: "images", name: "Images" },
    { key: "createdAt", name: "CreatedAt" },
    { key: "updatedAt", name: "UpdatedAt" },
  ];

  return (
    <section aria-labelledby="products-heading" className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-end">
          <h1
            id="products-heading"
            className="text-2xl font-semibold text-gray-900"
          >
            Products
          </h1>
          <div
            aria-hidden="true"
            className="w-14 h-0.5 bg-primary rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600">Total: {count}</p>
      </div>

      <AdminTable
        data={products}
        columns={columns}
        pageNumber={pageNumber}
        totalCount={count}
        type="products"
      />
    </section>
  );
};

export default ProductsPage;
