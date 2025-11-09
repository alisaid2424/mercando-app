import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username should be of type string",
    })
    .min(3, { message: "Username should be at least 3 characters long" })
    .max(50, { message: "Username should be less than 50 characters" }),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be of type string",
    })
    .min(3, { message: "Email should be at least 3 characters long" })
    .max(200, { message: "Email should be less than 200 characters" })
    .email({ message: "Email is not valid" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return /^\+?[1-9]\d{1,14}$/.test(value);
      },
      {
        message: "Please enter a valid phone number",
      }
    ),

  streetAddress: z.string({ required_error: "Address is required" }).optional(),

  postalCode: z
    .string({ required_error: "Postal code is required" })
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return /^\d{5,10}$/.test(value);
      },
      {
        message: "Please enter a valid postal code",
      }
    ),

  city: z.string({ required_error: "City is required" }).optional(),

  country: z.string({ required_error: "Country is required" }).optional(),

  image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),

  admin: z.boolean().optional(),
});

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;

export const DeliveryInfoSchema = z.object({
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .refine((value) => /^\+?[1-9]\d{1,14}$/.test(value), {
      message: "Please enter a valid phone number",
    }),

  streetAddress: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(3, { message: "Address is required" }),

  postalCode: z
    .string({ required_error: "Postal code is required" })
    .refine((value) => /^\d{5,10}$/.test(value), {
      message: "Please enter a valid postal code",
    }),

  city: z
    .string({ required_error: "City is required" })
    .trim()
    .min(3, { message: "City is required" }),

  country: z
    .string({ required_error: "Country is required" })
    .trim()
    .min(3, { message: "Country is required" }),
});

export type DeliveryInfoType = z.infer<typeof DeliveryInfoSchema>;
