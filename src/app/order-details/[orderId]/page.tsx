import OrderItems from "@/components/OrderItems";
import { getOrder } from "@/server/db/orders";
import Link from "next/link";
import { notFound } from "next/navigation";

interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>;
}

const OrderDetailsPage = async ({ params }: OrderDetailsPageProps) => {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) notFound();

  return (
    <>
      <OrderItems order={order} />

      <Link
        href="/"
        className="py-2 px-4 my-7 mx-auto block w-fit text-white rounded-md bg-orange-500"
      >
        Back to Home
      </Link>
    </>
  );
};

export default OrderDetailsPage;
