import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function getUserFavoriteIds(): Promise<string[]> {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) return [];

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId },
    select: {
      favorites: { select: { productId: true } },
    },
  });

  return dbUser ? dbUser.favorites.map((fav) => fav.productId) : [];
}
