"use client";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import { removeCartItem } from "@/store/cart/cartSlice";
import LottieHandler from "@/lib/LottieHandler";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Link from "next/link";
import { Routes } from "@/constants/enums";
import { formatCurrency } from "@/lib/formatters";
import Loading from "@/components/Loading";
import UpdateItemQuantity from "@/components/UpdateItemQuantity";
import { deliveryFee, getSubTotal } from "@/lib/cart";

const CartItems = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { items, loading, error } = useAppSelector((state) => state.cart);
  const subTotal = getSubTotal(items);

  const handleDeleteItemfromCart = (id: string) => {
    dispatch(removeCartItem(id));

    toast({
      className: "bg-red-100 text-red-600",
      title: "Deleted Item",
      description: "Deleted Item from cart successfully 🗑️",
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to add",
        description: error,
      });
    }
  }, [error, toast]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!loading && items.length ? (
        <div className="mt-8">
          <ul className="space-y-8 md:space-y-4">
            {items.map((item) => {
              return (
                <li
                  key={item?.id}
                  className="flex items-center justify-between flex-wrap md:flex-nowrap gap-7"
                >
                  <div className="flex items-center gap-4 basis-full sm:basis-1/2">
                    {item.product?.images && (
                      <Image
                        src={item.product.images[0]}
                        alt="img-item-cart"
                        width={300}
                        height={300}
                        className="size-20 rounded-sm object-cover"
                      />
                    )}

                    <div>
                      <h3 className="text-base text-foreground">
                        {item.product?.name}
                      </h3>

                      <dl className="mt-1 space-y-px text-xs text-muted-foreground">
                        <div>
                          <dt className="inline">Category : </dt>
                          <dd className="inline capitalize">
                            {item.product?.category?.name}
                          </dd>
                        </div>
                        <div>
                          <dt className="inline">Unit price :</dt>
                          <dd className="inline">
                            {formatCurrency(Number(item.product?.offerPrice))}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <UpdateItemQuantity
                    cartId={item.id}
                    currentQuantity={item.quantity}
                    stock={item.product?.stock ?? 0}
                  />

                  <div className="flex items-center justify-end gap-5 basis-1/4">
                    <div>
                      <dd className="inline text-sm">
                        {formatCurrency(
                          Number(
                            (
                              (item.product?.offerPrice ?? 0) * item.quantity
                            ).toFixed(2)
                          )
                        )}
                      </dd>
                    </div>

                    <button
                      onClick={() => handleDeleteItemfromCart(item?.id)}
                      className="text-foreground transition hover:text-red-600"
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col justify-end items-end pt-6">
            <span className="text-accent font-medium w-36 flex justify-between">
              Subtotal:
              <strong className="text-black">{formatCurrency(subTotal)}</strong>
            </span>
            <span className="text-accent font-medium w-36 flex justify-between">
              Delivery:
              <strong className="text-black">
                {formatCurrency(deliveryFee)}
              </strong>
            </span>
            <span className="text-accent font-medium w-36 flex justify-between">
              Total:
              <strong className="text-black">
                {formatCurrency(subTotal + deliveryFee)}
              </strong>
            </span>
          </div>

          <h2 className="text-muted-foreground text-sm mt-14">
            Note : All Items will be sent via Email
          </h2>
        </div>
      ) : (
        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <LottieHandler type="empty" message="Cart is empty" />

          <Link
            href={Routes.ROOT}
            className="p-2 mt-6 text-white rounded-md bg-primary block text-center w-fit mx-auto"
          >
            Go Back
          </Link>
        </div>
      )}
    </>
  );
};

export default CartItems;
