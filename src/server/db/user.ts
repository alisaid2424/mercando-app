import { USERS_PER_PAGE } from "@/constants/enums";
import { cache } from "@/lib/cache";
import prisma from "@/lib/db";

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
  { revalidate: 3600 },
);

export const getUser = cache(
  async ({ id, clerkUserId }: { id?: string; clerkUserId?: string }) => {
    if (!id && !clerkUserId) throw new Error("id or clerkUserId is required");
    const query = id ? { id } : { clerkUserId };
    return await prisma.user.findUnique({ where: query });
  },
  [`user-${crypto.randomUUID()}`],
  { revalidate: 3600 },
);

export const getUserFavorites = cache(
  async (clerkUserId: string) => {
    const dbUser = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (!dbUser) {
      return [];
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: dbUser.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return favorites.map((fav) => fav.product);
  },
  ["get-user-favorites"],
  { revalidate: 3600 },
);
