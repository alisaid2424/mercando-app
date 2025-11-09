import { getOrder } from "@/server/db/orders";
import { notFound } from "next/navigation";
import OrderItems from "@/components/OrderItems";

interface OrderDetailsAdminPageProps {
  params: Promise<{ orderId: string }>;
}

const OrderDetailsAdminPage = async ({
  params,
}: OrderDetailsAdminPageProps) => {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) notFound();

  return <OrderItems order={order} />;
};

export default OrderDetailsAdminPage;
