import { z } from "zod";

// Unified Schema for Create and Update
export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least 2 characters long" })
    .max(200, { message: "title should be less 200 characters" })
    .optional(),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be of type string",
    })
    .min(10, { message: "description should be at least 10 characters" })
    .max(1000, { message: "description should be less than 1000 characters" })
    .optional(),
  image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),
});

// TypeScript type
export type CategoryFormType = z.infer<typeof CategorySchema>;
