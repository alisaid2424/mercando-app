"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataObj = {
  id: string;
  name: string;
  description?: string;
};

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  className?: string;
};

export function SelectWithLabel<S>({
  fieldTitle,
  nameInSchema,
  data,
  className,
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => {
        const selectedItem = data.find((item) => item.id === field.value);

        return (
          <FormItem>
            <FormLabel className="text-base" htmlFor={nameInSchema}>
              {fieldTitle}
            </FormLabel>

            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger
                  id={nameInSchema}
                  className={`w-full border-2 border-accent uppercase focus:!outline-none focus:!ring-0 focus:!border-primary ${className}`}
                >
                  <SelectValue placeholder="Selected...">
                    {selectedItem ? selectedItem.name : "Selected..."}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>

              <SelectContent className="z-50 bg-gray-100 border-none">
                <SelectGroup>
                  {data.map((item) => {
                    const isSelected = item.id === field.value;
                    return (
                      <SelectItem
                        key={`${nameInSchema}_${item.id}`}
                        value={item.id}
                        className={`uppercase text-accent hover:!text-white hover:!bg-primary ${
                          isSelected
                            ? "bg-primary text-white font-semibold"
                            : ""
                        }`}
                      >
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
