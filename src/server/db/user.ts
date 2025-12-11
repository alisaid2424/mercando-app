import { USERS_PER_PAGE } from "@/constants/enums";
import { cache } from "@/lib/cache";
import prisma from "@/lib/db";
import clerkClient from "@clerk/clerk-sdk-node";

export const getUsers = cache(
  async (pageNumber: number) => {
    const users = await prisma.user.findMany({
      skip: USERS_PER_PAGE * (pageNumber - 1),
      take: USERS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });

    return users;
  },
  ["users"],
  { revalidate: 3600 }
);

export const getUser = cache(
  async ({ id, clerkUserId }: { id?: string; clerkUserId?: string }) => {
    if (!id && !clerkUserId) throw new Error("id or clerkUserId is required");
    const query = id ? { id } : { clerkUserId };
    return await prisma.user.findUnique({ where: query });
  },
  [`user-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);

export const getUserFavorites = cache(
  async (userId: string) => {
    const user = await clerkClient.users.getUser(userId);

    const favorites = Array.isArray(user?.privateMetadata?.favorites)
      ? (user.privateMetadata.favorites as string[])
      : [];

    if (!favorites.length) return [];

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: favorites,
        },
      },
    });

    return products;
  },
  ["get-user-favorites"],
  { revalidate: 3600 }
);
