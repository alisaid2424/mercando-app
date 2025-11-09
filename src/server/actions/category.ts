"use server";

import { revalidatePath } from "next/cache";
import { CategoryFormType, CategorySchema } from "@/zod-schemas/category";
import { getImageUrl } from "./getImageUrl";
import prisma from "@/lib/db";
import { Pages, Routes } from "@/constants/enums";
import { Prisma } from "@prisma/client";

// Create or Update Category
export const categoryAction = async (data: CategoryFormType) => {
  // Validate with Zod
  const result = CategorySchema.safeParse(data);

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

  // Handle image (upload if File)
  const imageUrl =
    typeof formData.image === "string"
      ? formData.image
      : formData.image instanceof File && formData.image.size > 0
      ? await getImageUrl({
          imageFile: formData.image,
          publicId: formData.image.name,
          pathName: "categories_mercando",
        })
      : undefined;

  try {
    if (!formData.id) {
      // Create
      const newCategory = await prisma.category.create({
        data: {
          name: formData.name!,
          description: formData.description!,
          image: imageUrl,
        },
      });

      revalidatePath(Routes.ROOT);
      revalidatePath(`${Routes.PRODUCTS}/add`);
      revalidatePath(Routes.PRODUCTS);
      revalidatePath(Routes.CATEGORIES);
      revalidatePath(Pages.SHOP);
      revalidatePath(`${Routes.CATEGORIES}/${newCategory.id}/edit`);

      return {
        status: 201,
        message: `Category created successfully (ID: ${newCategory.id})`,
      };
    } else {
      // Update
      const updatedCategory = await prisma.category.update({
        where: {
          id: formData.id,
        },
        data: {
          name: formData.name,
          description: formData.description,
          image: imageUrl,
        },
      });

      revalidatePath(Routes.ROOT);
      revalidatePath(`${Routes.PRODUCTS}/add`);
      revalidatePath(Routes.PRODUCTS);
      revalidatePath(Routes.CATEGORIES);
      revalidatePath(Pages.SHOP);
      revalidatePath(`${Routes.CATEGORIES}/${updatedCategory.id}/edit`);

      return {
        status: 200,
        message: `Category updated successfully (ID: ${updatedCategory.id})`,
      };
    }
  } catch (error) {
    console.error(error);

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

//delete Category
export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    revalidatePath(Routes.ROOT);
    revalidatePath(`${Routes.PRODUCTS}/add`);
    revalidatePath(Routes.PRODUCTS);
    revalidatePath(Routes.CATEGORIES);
    revalidatePath(Pages.SHOP);

    return {
      status: 200,
      message: "Category deleted successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};
