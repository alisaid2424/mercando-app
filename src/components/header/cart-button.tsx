"use client";

import { selectCartItems } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/hook";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CartListIcon from "./CartListIcon";
import { CartItemWithProduct } from "@/types/product";

const CartButton = () => {
  const [quantity, setQuantity] = useState(0);
  const [isAnimateCart, setIsAnimateCart] = useState(false);
  const [openCartList, setOpenCartList] = useState(false);
  const cartItems = useAppSelector(selectCartItems) as CartItemWithProduct[];

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity!, 0);
    setQuantity(total);
  }, [cartItems]);

  useEffect(() => {
    if (!quantity) {
      return;
    }
    setIsAnimateCart(true);

    const deponceCart = setTimeout(() => {
      setIsAnimateCart(false);
    }, 300);

    return () => clearTimeout(deponceCart);
  }, [quantity]);

  return (
    <>
      <button
        onClick={() => setOpenCartList((prev) => !prev)}
        className="flex relative outline-none bg-transparent"
      >
        <ShoppingCartIcon className="text-3xl font-bold text-gray-500" />

        {quantity > 0 && (
          <span
            className={`absolute w-6 h-6 -right-5 -top-4 rounded-full bg-primary flex items-center justify-center text-sm text-white ${
              isAnimateCart ? "animate-pumping" : ""
            } `}
          >
            {quantity}
          </span>
        )}
      </button>

      {openCartList && cartItems.length > 0 && (
        <CartListIcon onSetOpen={setOpenCartList} cartitems={cartItems} />
      )}
    </>
  );
};

export default CartButton;
