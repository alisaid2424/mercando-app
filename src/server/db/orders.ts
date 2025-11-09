import { ORDERS_PER_PAGE } from "@/constants/enums";
import { cache } from "@/lib/cache";
import prisma from "@/lib/db";

//getOrders
export const getOrders = cache(
  (pageNumber: number) => {
    return prisma.order.findMany({
      skip: ORDERS_PER_PAGE * (pageNumber - 1),
      take: ORDERS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  },
  ["orders"],
  { revalidate: 3600 }
);

// getOrder
export const getOrder = cache(
  async (orderId: string) => {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
    return order;
  },
  [`order-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);
