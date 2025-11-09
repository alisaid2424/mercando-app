"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getTotalAmount } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatters";
import { selectCartItems } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/hook";
import { DeliveryInfoSchema, DeliveryInfoType } from "@/zod-schemas/user";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User } from "@prisma/client";

interface DeliveryInfoProps {
  user: User;
}

const DeliveryInformationForm = ({ user }: DeliveryInfoProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const items = useAppSelector(selectCartItems);
  const totalAmount = getTotalAmount(items);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DeliveryInfoType>({
    mode: "onBlur",
    resolver: zodResolver(DeliveryInfoSchema),
    defaultValues: {
      phone: user.phone ?? "",
      streetAddress: user.streetAddress ?? "",
      postalCode: user.postalCode ?? "",
      city: user.city ?? "",
      country: user.country ?? "",
    },
  });

  const submitForm = async (data: DeliveryInfoType) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: user?.clerkUserId,
          ...data,
        }),
      });

      const result = await res.json();

      if (res.ok && result.message) {
        toast({
          title: "Success! 🎉",
          description:
            "Your delivery information has been saved successfully! Redirecting you to checkout...",
          className: "bg-green-100 text-green-600",
        });

        router.push(`/checkout?amount=${totalAmount.toFixed(2)}`);
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong",
          className: "bg-red-100 text-red-600",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    items &&
    items.length > 0 && (
      <div className="grid gap-6 bg-gray-100 rounded-md p-4 mt-14">
        <h2 className="text-xl text-accent-foreground font-semibold uppercase">
          Delivery Information
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <InputWithLabel<DeliveryInfoType>
                  fieldTitle="Phone"
                  nameInSchema="phone"
                  placeholder="+201001234567"
                  className="border-gray-400"
                />
              </div>
              <div className="grid gap-1">
                <InputWithLabel<DeliveryInfoType>
                  fieldTitle="Street Address"
                  nameInSchema="streetAddress"
                  placeholder="Enter Your Address"
                  className="border-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-1">
                  <InputWithLabel<DeliveryInfoType>
                    fieldTitle="Postal Code"
                    nameInSchema="postalCode"
                    placeholder="12345 or 1234567890"
                    className="border-gray-400"
                  />
                </div>
                <div className="grid gap-1">
                  <InputWithLabel<DeliveryInfoType>
                    fieldTitle="City"
                    nameInSchema="city"
                    placeholder="Enter Your City"
                    className="border-gray-400"
                  />
                </div>
              </div>
              <div className="grid gap-1">
                <InputWithLabel<DeliveryInfoType>
                  fieldTitle="Country"
                  nameInSchema="country"
                  placeholder="Enter Your Country"
                  className="border-gray-400"
                />
              </div>

              <Button
                type="submit"
                title="Save"
                disabled={isLoading}
                className="h-10"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  `Pay ${formatCurrency(totalAmount)}`
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    )
  );
};

export default DeliveryInformationForm;
