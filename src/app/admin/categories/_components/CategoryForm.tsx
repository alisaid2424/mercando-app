"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CategoryFormType, CategorySchema } from "@/zod-schemas/category";
import { Routes } from "@/constants/enums";
import { Form } from "@/components/ui/form";
import UploadImage from "@/components/UploadImage";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { categoryAction } from "@/server/actions/category";

interface CategoryFormProps {
  category?: Category;
}

const CategoryForm = ({ category }: CategoryFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: CategoryFormType = {
    id: category?.id ?? undefined,
    name: category?.name ?? "",
    description: category?.description ?? "",
    image: category?.image ?? "",
  };

  const form = useForm<CategoryFormType>({
    mode: "onBlur",
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = form;

  const submitForm = async (data: CategoryFormType) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await categoryAction(data);

      if (res.status && res.message) {
        if (res.status === 200 || res.status === 201) {
          toast({
            title: "Success! 🎉",
            description: res.message,
            className: "bg-green-100 text-green-600",
          });
          router.push(`${Routes.CATEGORIES}?pageNumber=1`);
        } else if (res.status === 400 && res.error) {
          Object.entries(res.error).forEach(([field, message]) => {
            form.setError(field as keyof CategoryFormType, {
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
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        className: "bg-red-100 text-red-600",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto">
      <h1 className="text-primary text-center font-bold text-2xl sm:text-4xl italic mb-10">
        {category ? "Update Category" : "Create New Category"}
      </h1>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-10 items-center md:items-start w-full"
        >
          <UploadImage<CategoryFormType>
            currentImage={category?.image ?? ""}
            altImage={category?.name ?? "Category image"}
            setValue={setValue}
            errors={errors}
            name="image"
          />

          <div className="flex flex-col space-y-4 flex-1 w-full">
            <InputWithLabel<CategoryFormType>
              fieldTitle="Title"
              nameInSchema="name"
              placeholder="Enter Title"
            />

            <TextAreaWithLabel<CategoryFormType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-40"
              placeholder="Enter Description"
            />

            <Button type="submit" title="Save" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                `${category ? "Edit Category" : "Create Category"}`
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
