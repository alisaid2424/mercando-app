"use client";

import {
  clearCart,
  fetchUserCart,
  selectCartItems,
} from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { CartItemWithProduct } from "@/types/product";
import { useAuth } from "@clerk/nextjs";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CartListIcon from "./CartListIcon";

const CartButton = () => {
  const dispatch = useAppDispatch();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [isAnimateCart, setIsAnimateCart] = useState(false);
  const [openCartList, setOpenCartList] = useState(false);

  const cartItems = useAppSelector(selectCartItems) as CartItemWithProduct[];

  const quantity = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.quantity ?? 0), 0),
    [cartItems],
  );

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && userId) {
      dispatch(fetchUserCart(userId));
    } else {
      dispatch(clearCart());
      setOpenCartList(false);
    }
  }, [isLoaded, isSignedIn, userId, dispatch]);

  useEffect(() => {
    if (quantity <= 0) {
      setIsAnimateCart(false);
      return;
    }

    setIsAnimateCart(true);

    const debounceCart = setTimeout(() => {
      setIsAnimateCart(false);
    }, 300);

    return () => clearTimeout(debounceCart);
  }, [quantity]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenCartList((prev) => !prev)}
        aria-label={quantity > 0 ? `Open cart, ${quantity} items` : "Open cart"}
        aria-expanded={openCartList}
        className="flex relative outline-none bg-transparent"
      >
        <ShoppingCartIcon
          className="text-3xl font-bold text-gray-500"
          aria-hidden="true"
        />

        {quantity > 0 && (
          <span
            className={`absolute w-6 h-6 -right-5 -top-4 rounded-full bg-primary flex items-center justify-center text-sm text-white ${
              isAnimateCart ? "animate-pumping" : ""
            }`}
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
