import { CATEGORIES_PER_PAGE } from "@/constants/enums";
import { cache } from "@/lib/cache";
import prisma from "@/lib/db";

export const getCategoriesByPagenation = cache(
  async (pageNumber: number = 1) => {
    const categoriesByPagenation = await prisma.category.findMany({
      skip: CATEGORIES_PER_PAGE * (pageNumber - 1),
      take: CATEGORIES_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return categoriesByPagenation;
  },
  ["categoriesByPagenation"],
  { revalidate: 3600 }
);

export const getCategories = cache(
  async () => {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });
    return categories;
  },
  ["categories"],
  { revalidate: 3600 }
);

export const getCategory = cache(
  (CategoryId: string) => {
    const category = prisma.category.findUnique({ where: { id: CategoryId } });
    return category;
  },
  [`category-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);
