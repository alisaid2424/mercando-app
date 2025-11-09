"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  type = "text",
  ...props
}: Props<S>) {
  const form = useFormContext();
  const isPasswordField = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <FormControl>
            <div className="relative flex items-center">
              <Input
                id={nameInSchema}
                type={
                  isPasswordField ? (showPassword ? "text" : "password") : type
                }
                autoComplete={props.autoComplete ?? "off"}
                className={`w-full pr-10 border-2 border-accent focus:!border-primary focus:!outline-none focus:!ring-0 disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75 ${className}`}
                {...props}
                {...field}
              />
              {isPasswordField && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
