import AdminTable from "@/components/AdminTable";
import prisma from "@/lib/db";
import { getOrders } from "@/server/db/orders";

interface OrdersPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { pageNumber } = await searchParams;
  const orders = await getOrders(parseInt(pageNumber || "1"));
  const count = await prisma.order.count();

  const columns = [
    { key: "userName", name: "Username" },
    { key: "email", name: "Email" },
    { key: "amount", name: "Amount" },
    { key: "createdAt", name: "Created At" },
    { key: "updatedAt", name: "Updated At" },
  ];

  return (
    <AdminTable
      data={orders}
      columns={columns}
      pageNumber={String(pageNumber)}
      totalCount={count}
      type="orders"
    />
  );
};

export default OrdersPage;
