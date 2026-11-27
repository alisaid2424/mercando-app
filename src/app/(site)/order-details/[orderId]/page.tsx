import OrderItems from "@/components/OrderItems";
import { getOrder } from "@/server/db/orders";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({
  params,
}: OrderDetailsPageProps): Promise<Metadata> {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    return {
      title: "Order Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `Order #${order.id}`,
    description: `View order details, items, and status for order #${order.id} on Mercando.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const OrderDetailsPage = async ({ params }: OrderDetailsPageProps) => {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    return notFound();
  }

  return (
    <section aria-label={`Order ${order.id} details`}>
      <OrderItems order={order} />

      <Link
        href="/"
        className="py-2 px-4 my-7 mx-auto block w-fit text-white rounded-md bg-orange-500"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default OrderDetailsPage;
