"use server";

import prisma from "@/lib/db";
import { serializeFlexibleCartItem } from "@/types/product";

// Add a product to the cart, check the availability.
export async function addToCart(
  clerkUserId: string,
  productId: string,
  quantity: number
) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    throw new Error("User not Found");
  }

  const existingCartItem = await prisma.cart.findFirst({
    where: { userId: user.id, productId },
  });

  const totalQuantity = existingCartItem
    ? existingCartItem.quantity + quantity
    : quantity;

  if (totalQuantity > product.stock) {
    throw new Error("Not enough stock available");
  }

  if (existingCartItem) {
    const updatedItem = await prisma.cart.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: totalQuantity,
        amount: product.offerPrice * totalQuantity,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });
    return serializeFlexibleCartItem(updatedItem);
  }

  const newItem = await prisma.cart.create({
    data: {
      userId: user.id,
      productId,
      quantity,
      amount: product.offerPrice * quantity,
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });

  return serializeFlexibleCartItem(newItem);
}

// Update the quantity of a product on the card (increase or decrease)
export async function updateCart(cartId: string, quantity: number) {
  const cartItem = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { product: true },
  });

  if (!cartItem) throw new Error("Cart item not found");

  if (quantity <= 0) {
    await prisma.cart.delete({ where: { id: cartId } });
    return { id: cartId, deleted: true };
  }

  if (quantity > cartItem.product.stock) {
    throw new Error("Quantity exceeds available stock");
  }

  const updatedItem = await prisma.cart.update({
    where: { id: cartId },
    data: {
      quantity,
      amount: cartItem.product.offerPrice * quantity,
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });

  return serializeFlexibleCartItem(updatedItem);
}

// Remove item from cart
export async function removeFromCart(cartId: string) {
  await prisma.cart.delete({
    where: { id: cartId },
  });

  return { id: cartId };
}

// Fetch user basket
export async function getUserCart(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    throw new Error("User not Found");
  }

  const items = await prisma.cart.findMany({
    where: { userId: user.id },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return items.map(serializeFlexibleCartItem);
}
