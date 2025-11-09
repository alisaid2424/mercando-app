"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { Pages, Routes } from "@/constants/enums";
import {
  CreateProductSchema,
  CreateProductType,
  UpdateProductSchema,
  UpdateProductType,
} from "@/zod-schemas/product";
import { getImageUrl } from "./getImageUrl";

// craete or update product
export const productAction = async (
  data: CreateProductType | UpdateProductType,
  mode: "create" | "update"
) => {
  const result =
    mode === "create"
      ? CreateProductSchema.safeParse(data)
      : UpdateProductSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString() || "form";
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });
    return {
      status: 400,
      message: "Validation failed",
      error: fieldErrors,
    };
  }

  const formData = result.data;
  const price = Number(formData.price);
  const offerPrice = Number(formData.offerPrice ?? 0);
  const rate = Number(formData.rate ?? 1);

  const imageUrls: string[] = [];

  await Promise.all(
    formData.images.map(async (image, index) => {
      if (typeof image === "string") {
        imageUrls[index] = image;
      }

      if (image instanceof File && image.size > 0) {
        const res = await getImageUrl({
          imageFile: image,
          publicId: image.name,
          pathName: "product_mercando",
        });
        if (res) imageUrls[index] = res;
      }
    })
  );

  try {
    if (mode === "create") {
      const newProduct = await prisma.product.create({
        data: {
          name: formData.name,
          description: formData.description,
          price,
          offerPrice,
          rate,
          categoryId: formData.categoryId,
          stock: formData.stock,
          images: imageUrls,
        },
      });

      revalidatePath(Routes.PRODUCTS);
      revalidatePath(Pages.SHOP);
      revalidatePath(Routes.ROOT);

      return {
        status: 201,
        message: `Product created successfully (ID: ${newProduct.id})`,
      };
    } else {
      const updateData = formData as UpdateProductType;

      const existingProduct = await prisma.product.findUnique({
        where: { id: updateData.id },
      });

      if (!existingProduct) {
        return {
          status: 404,
          message: "Product not found",
        };
      }

      const finalImages =
        imageUrls.length > 0 ? imageUrls : existingProduct.images;

      const updatedProduct = await prisma.product.update({
        where: { id: updateData.id },
        data: {
          name: updateData.name,
          description: updateData.description,
          price,
          offerPrice,
          rate,
          categoryId: updateData.categoryId,
          stock:
            updateData.stock !== undefined
              ? updateData.stock
              : existingProduct.stock,
          images: finalImages,
        },
      });

      revalidatePath(Routes.PRODUCTS);
      revalidatePath(Pages.SHOP);
      revalidatePath(`${Routes.PRODUCTS}/${updatedProduct.id}/edit`);
      revalidatePath(Routes.ROOT);

      return {
        status: 200,
        message: `Product updated successfully (ID: ${updatedProduct.id})`,
      };
    }
  } catch (error) {
    console.error("Server Error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const targets = error.meta?.target as string[];
      const errorObject = Object.fromEntries(
        targets.map((field) => [field, `${field} must be unique.`])
      );
      return {
        status: 400,
        message: "Some fields must be unique.",
        error: errorObject,
      };
    }

    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

//delete Product
export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath(Routes.PRODUCTS);
    revalidatePath(Pages.SHOP);
    revalidatePath(Routes.ROOT);

    return {
      status: 200,
      message: "Product deleted successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};
