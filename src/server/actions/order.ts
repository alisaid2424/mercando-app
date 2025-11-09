"use server";

import { Routes } from "@/constants/enums";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

//createNewOrder
export const createNewOrder = async ({
  userName,
  email,
  phone,
  streetAddress,
  postalCode,
  city,
  country,
  amount,
  productItems,
}: {
  userName: string;
  email: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  amount: number;
  productItems: {
    productId: string;
    quantity: number;
    userId: string;
  }[];
}) => {
  try {
    if (productItems.length === 0) {
      throw new Error("No product items provided");
    }

    const userId = productItems[0].userId;

    const newOrder = await prisma.order.create({
      data: {
        userName,
        email,
        phone,
        streetAddress,
        postalCode,
        city,
        country,
        amount,
        user: { connect: { id: userId } },
        products: {
          create: productItems.map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
          })),
        },
      },
      include: {
        products: {
          include: { product: true },
        },
      },
    });

    revalidatePath(Routes.ORDERS);
    revalidatePath(Routes.ROOT);

    return {
      status: 201,
      message: "Order added successfully",
      order: newOrder,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};

//delete Order
export const deleteOrder = async (id: string) => {
  try {
    await prisma.order.delete({
      where: {
        id,
      },
    });

    revalidatePath(Routes.ORDERS);
    revalidatePath(Routes.ROOT);

    return {
      status: 200,
      message: "Order deleted successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};
