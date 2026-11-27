import AdminTable from "@/components/AdminTable";
import prisma from "@/lib/db";
import { getOrders } from "@/server/db/orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description:
    "View customer orders, amounts, and order history on Mercando from the admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

interface OrdersPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { pageNumber } = await searchParams;
  const [orders, count] = await Promise.all([
    getOrders(parseInt(pageNumber || "1")),
    prisma.order.count(),
  ]);

  const columns = [
    { key: "userName", name: "Username" },
    { key: "email", name: "Email" },
    { key: "amount", name: "Amount" },
    { key: "createdAt", name: "Created At" },
    { key: "updatedAt", name: "Updated At" },
  ];

  return (
    <section aria-labelledby="orders-heading" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-end">
          <h1
            id="orders-heading"
            className="text-2xl font-semibold text-gray-900"
          >
            Orders
          </h1>
          <div
            aria-hidden="true"
            className="w-14 h-0.5 bg-primary rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600">Total: {count}</p>
      </div>

      <AdminTable
        data={orders}
        columns={columns}
        pageNumber={String(pageNumber)}
        totalCount={count}
        type="orders"
      />
    </section>
  );
};

export default OrdersPage;
