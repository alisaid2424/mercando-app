import { Category, Prisma, Product } from "@prisma/client";

export type productIncloudeCategory = Product & {
  category: Category;
};

export type CartItemWithProduct = Prisma.CartGetPayload<{
  include: {
    product: {
      include: {
        category: true;
      };
    };
  };
}>;

export type OrderWithProduct = Prisma.OrderGetPayload<{
  include: {
    products: {
      include: {
        product: {
          include: {
            category: true;
          };
        };
      };
    };
  };
}>;

export type FlexibleCartItem = Omit<
  CartItemWithProduct,
  "product" | "createdAt" | "updatedAt"
> & {
  createdAt: string | Date;
  updatedAt: string | Date;
  product?: Omit<
    CartItemWithProduct["product"],
    "createdAt" | "updatedAt" | "category"
  > & {
    createdAt: string | Date;
    updatedAt: string | Date;
    category?: Omit<Category, "createdAt" | "updatedAt"> & {
      createdAt: string | Date;
      updatedAt: string | Date;
    };
  };
};

export function serializeFlexibleCartItem(item: FlexibleCartItem) {
  return {
    ...item,
    createdAt:
      item.createdAt instanceof Date
        ? item.createdAt.toISOString()
        : item.createdAt,
    updatedAt:
      item.updatedAt instanceof Date
        ? item.updatedAt.toISOString()
        : item.updatedAt,
    product: item.product
      ? {
          ...item.product,
          createdAt:
            item.product.createdAt instanceof Date
              ? item.product.createdAt.toISOString()
              : item.product.createdAt,
          updatedAt:
            item.product.updatedAt instanceof Date
              ? item.product.updatedAt.toISOString()
              : item.product.updatedAt,
          category: item.product.category
            ? {
                ...item.product.category,
                createdAt:
                  item.product.category.createdAt instanceof Date
                    ? item.product.category.createdAt.toISOString()
                    : item.product.category.createdAt,
                updatedAt:
                  item.product.category.updatedAt instanceof Date
                    ? item.product.category.updatedAt.toISOString()
                    : item.product.category.updatedAt,
              }
            : undefined,
        }
      : undefined,
  };
}
