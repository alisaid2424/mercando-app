import { PRODUCTS_PER_PAGE } from "@/constants/enums";
import { cache } from "@/lib/cache";
import prisma from "@/lib/db";

export const getBestSellers = cache(
  (limit?: number | undefined) => {
    const bestSellers = prisma.product.findMany({
      where: {
        orders: {
          some: {},
        },
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      include: {
        category: true,
      },

      take: limit,
    });

    return bestSellers;
  },
  ["best-sellers"],
  { revalidate: 3600 }
);

export const getProducts = cache(
  async (pageNumber: number) => {
    const products = await prisma.product.findMany({
      skip: PRODUCTS_PER_PAGE * (pageNumber - 1),
      take: PRODUCTS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return products;
  },
  ["products"],
  { revalidate: 3600 }
);

export const getAllProducts = cache(
  async () => {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    return products;
  },
  ["all-products"],
  { revalidate: 3600 }
);

export const getProduct = cache(
  (id: string) => {
    const product = prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    return product;
  },
  [`product-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);
