import { formatCurrency } from "@/lib/formatters";
import { CartItemWithProduct } from "@/types/product";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartitems: CartItemWithProduct[];
};

const CartListIcon = ({ onSetOpen, cartitems }: Props) => {
  return (
    <div
      className="h-[400px] w-[350px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 -right-8 sm:right-20 
      md:right-24
    lg:right-20 xl:right-28 top-16 p-5 overflow-auto"
    >
      <button
        onClick={() => onSetOpen(false)}
        className="absolute end-4 top-4 text-gray-600 hover:scale-110 hover:text-red-600 hover:rotate-180 transition-all duration-300"
      >
        <span className="sr-only">Close cart</span>
        <X className="size-5" aria-hidden="true" />
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cartitems?.map((item) => {
            return (
              <li key={item?.id} className="flex items-center gap-4">
                <Image
                  src={item.product.images[0]}
                  width={300}
                  height={300}
                  alt="img-item-cart"
                  className="size-16 rounded-sm object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-sm text-gray-900 line-clamp-1">
                    {item.product.name}
                  </h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div className="flex gap-2">
                      <dt className="inline">Category :</dt>
                      <dd className="inline">{item.product?.category?.name}</dd>
                    </div>

                    <div className="flex gap-2">
                      <dt className="inline">Unit price :</dt>
                      <dd className="inline">
                        {formatCurrency(item.product.offerPrice)}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 ">
                        <dt className="inline">Quantity :</dt>
                        <dd className="inline">{item.quantity}</dd>
                      </div>
                      <div className="flex gap-2 ">
                        <dt className="inline">totalPrice :</dt>
                        <dd className="inline">
                          {formatCurrency(
                            Number(
                              (item.product.offerPrice * item.quantity).toFixed(
                                2
                              )
                            )
                          )}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            onClick={() => onSetOpen(false)}
            className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            View my cart ( {cartitems.length} )
          </Link>

          <a
            href="#"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartListIcon;
