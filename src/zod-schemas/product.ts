import { z } from "zod";

// Base schema
const BaseProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(2, { message: "Name should be at least 2 characters" })
    .max(200, { message: "Name should be less than 200 characters" }),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description should be a string",
    })
    .min(10, { message: "Description should be at least 10 characters" })
    .max(1000, { message: "Description should be less than 1000 characters" }),

  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0.01, { message: "Price must be more than 0" }),

  offerPrice: z.coerce
    .number({
      required_error: "Offer price is required",
      invalid_type_error: "Offer price must be a number",
    })
    .min(0, { message: "Offer price must be 0 or more" }),

  categoryId: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    })
    .min(1, { message: "Category is required" }),

  images: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .min(1, "At least one image is required"),
});

// Schema for creating a product
export const CreateProductSchema = BaseProductSchema.extend({
  stock: z.coerce
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .int({ message: "Stock must be an integer" })
    .min(0, { message: "Stock must be 0 or more" }),

  rate: z.coerce
    .number({
      invalid_type_error: "Rating must be a number",
    })
    .int({ message: "Rating must be an integer" })
    .min(1, { message: "Minimum rating is 1" })
    .max(7, { message: "Maximum rating is 7" })
    .optional(),
});

// Schema for updating a product
export const UpdateProductSchema = BaseProductSchema.extend({
  id: z.string(),

  stock: z.coerce
    .number({
      invalid_type_error: "Stock must be a number",
    })
    .int({ message: "Stock must be an integer" })
    .min(0, { message: "Stock must be 0 or more" })
    .optional(),

  rate: z.coerce
    .number({
      invalid_type_error: "Rating must be a number",
    })
    .int({ message: "Rating must be an integer" })
    .min(1, { message: "Minimum rating is 1" })
    .max(7, { message: "Maximum rating is 7" })
    .optional(),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;
export type UpdateProductType = z.infer<typeof UpdateProductSchema>;
