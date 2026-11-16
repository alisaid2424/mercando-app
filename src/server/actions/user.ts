"use server";

import prisma from "@/lib/db";
import { Prisma, User } from "@prisma/client";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/constants/enums";
import { auth } from "@clerk/nextjs/server";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });

    revalidatePath(Routes.USERS);
    revalidatePath(`${Routes.USERS}/${user.clerkUserId}/edit`);

    return { user };
  } catch (error) {
    return { error };
  }
}

export async function UpdateUser(clerkUserId: string, data: Partial<User>) {
  try {
    if (!clerkUserId) {
      return { error: "Missing user ID" };
    }

    if (!data || Object.keys(data).length === 0) {
      return { error: "No data provided to update." };
    }

    const user = await prisma.user.update({
      where: { clerkUserId },
      data,
    });

    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.USERS);
    revalidatePath(`${Routes.USERS}/${user.clerkUserId}/edit`);

    return { user };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { error: "User not found" };
      }
    }

    console.error("UpdateUser error:", error);
    return { error: "An error occurred while updating the user." };
  }
}

export async function deleteUser(clerkUserId: string) {
  try {
    //Delete from Clerk
    try {
      await clerkClient.users.deleteUser(clerkUserId);
    } catch (clerkError) {
      if (clerkError instanceof Error) {
        console.warn("Clerk deletion skipped or failed:", clerkError.message);
      } else {
        console.warn("Clerk deletion failed with unknown error:", clerkError);
      }
    }

    // Delete from DB
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "User already deleted from DB.",
      };
    }

    await prisma.user.delete({
      where: { clerkUserId },
    });

    revalidatePath(Routes.USERS);
    revalidatePath(Routes.ORDERS);
    revalidatePath(Routes.ROOT);

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
}

export async function updateFavoriteUser(productId: string) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return {
        status: 401,
        message: "Unauthorized",
      };
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!dbUser) {
      return {
        status: 404,
        message: "User not found in database",
      };
    }

    const userId = dbUser.id;
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
    } else {
      await prisma.favorite.create({
        data: {
          userId,
          productId,
        },
      });
    }

    revalidatePath(Routes.ROOT);
    revalidatePath(Pages.SHOP);
    revalidatePath(Pages.FAVORITES);

    return {
      status: 200,
      message: existingFavorite
        ? "Removed from favorites"
        : "Added to favorites",
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "internal server error",
    };
  }
}
