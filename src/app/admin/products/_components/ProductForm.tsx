"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import {
  CreateProductSchema,
  UpdateProductSchema,
} from "@/zod-schemas/product";
import { Form } from "@/components/ui/form";
import UploadImage from "@/components/UploadImage";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { productAction } from "@/server/actions/product";
import { useToast } from "@/hooks/use-toast";
import { Routes } from "@/constants/enums";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
}

const ProductForm = ({ product, categories }: ProductFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const ratingOptions = Array.from({ length: 7 }, (_, i) => ({
    id: `${i + 1}`,
    name: `${i + 1} Star${i >= 1 ? "s" : ""}`,
  }));

  const isUpdate = Boolean(product);

  const schema = isUpdate
    ? UpdateProductSchema
    : (CreateProductSchema as unknown as typeof UpdateProductSchema);

  type SchemaType = z.infer<typeof schema>;

  const defaultValues: Partial<SchemaType> = {
    id: product?.id ?? undefined,
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    offerPrice: product?.offerPrice ?? 0,
    rate: product?.rate ?? 1,
    images: product?.images ?? [],
    categoryId: product?.categoryId ?? "",
    stock: product?.stock ?? 0,
  };

  const form = useForm<SchemaType>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    setValue,
    formState: { errors },
    setError,
    handleSubmit,
  } = form;

  const submitForm = async (data: SchemaType) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const res = await productAction(data, isUpdate ? "update" : "create");

      if (res.status === 200 || res.status === 201) {
        toast({
          title: "Success! 🎉",
          description: res.message,
          className: "bg-green-100 text-green-600",
        });

        router.push(`${Routes.PRODUCTS}?pageNumber=1`);
      } else if (res.status === 400 && res.error) {
        Object.entries(res.error).forEach(([field, message]) => {
          setError(field as keyof SchemaType, {
            type: "server",
            message,
          });
        });

        toast({
          title: "Form Errors",
          description: "Please fix the highlighted fields.",
          className: "bg-red-100 text-red-600",
        });
      } else {
        toast({
          title: "Error",
          description: res.message,
          className: "bg-red-100 text-red-600",
        });
      }
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Unexpected error occurred",
        className: "bg-red-100 text-red-600",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-primary text-center font-bold text-2xl sm:text-4xl italic mb-10">
        {isUpdate ? "Update Product" : "Create New Product"}
      </h1>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5"
        >
          <UploadImage<SchemaType>
            currentImage={product?.images ?? []}
            altImage="Product Images"
            setValue={setValue}
            errors={errors}
            name="images"
            multiple
            maxFiles={4}
          />

          <div className="flex flex-col space-y-4 flex-1">
            <InputWithLabel<SchemaType>
              fieldTitle="Product Name"
              nameInSchema="name"
              placeholder="Enter product name"
            />

            <TextAreaWithLabel<SchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              placeholder="Enter description"
              className="h-32"
            />

            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <div className="w-full sm:w-1/3 ">
                <SelectWithLabel<SchemaType>
                  fieldTitle="Category"
                  nameInSchema="categoryId"
                  data={categories}
                />
              </div>

              <div className="w-full sm:w-1/3 ">
                <InputWithLabel<SchemaType>
                  fieldTitle="Price"
                  nameInSchema="price"
                  placeholder="Enter price"
                  type="number"
                />
              </div>

              <div className="w-full sm:w-1/3 ">
                <InputWithLabel<SchemaType>
                  fieldTitle="Offer Price"
                  nameInSchema="offerPrice"
                  placeholder="Enter offer price"
                  type="number"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-full sm:w-1/3 ">
                <InputWithLabel<SchemaType>
                  fieldTitle="Stock"
                  nameInSchema="stock"
                  placeholder="Enter stock"
                  type="number"
                  min="0"
                  step="1"
                />
              </div>

              <div className="w-full sm:w-1/3 ">
                <SelectWithLabel<SchemaType>
                  fieldTitle="Rating"
                  nameInSchema="rate"
                  data={ratingOptions}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : isUpdate ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
