"use server";

import prisma from "@/lib/db";
import { Prisma, User } from "@prisma/client";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { revalidatePath } from "next/cache";
import { Routes } from "@/constants/enums";

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
        status: 200,
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
      status: 200,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
}
