"use client";

import { useToast } from "@/hooks/use-toast";
import { addCartItem } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { productIncloudeCategory } from "@/types/product";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddToCartButton = ({ product }: { product: productIncloudeCategory }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.cart);

  //Reusable function to handle adding a product to the cart
  const addProductToCart = async (redirectToCart: boolean = false) => {
    if (!user) {
      openSignIn();
      return;
    }

    const resultAction = await dispatch(
      addCartItem({
        clerkUserId: user.id,
        productId: product.id,
        quantity: 1,
      })
    );

    // If the request failed, show an error toast
    if (addCartItem.rejected.match(resultAction)) {
      toast({
        className: "bg-red-100 text-red-600",
        title: "Failed to add",
        description:
          resultAction.error?.message ||
          "Failed to add product. Try again later.",
      });
      return;
    }

    // If successful, show a success toast
    toast({
      className: "bg-green-100 text-green-600",
      title: "Added to cart",
      description: `${product.name} has been added to your cart successfully. 🎉`,
    });

    //If this is a "Buy Now" action, go directly to the cart page
    if (redirectToCart) router.push("/cart");
  };

  useEffect(() => {
    if (error) {
      toast({
        className: "bg-red-100 text-red-600",
        title: "Error",
        description: error,
      });
    }
  }, [error, toast]);

  return (
    <div className="flex items-center mt-10 gap-4">
      <button
        onClick={() => addProductToCart(false)}
        disabled={loading || product.stock === 0}
        className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
      >
        Add to Cart
      </button>

      <button
        onClick={() => addProductToCart(true)}
        disabled={loading || product.stock === 0}
        className="w-full py-3.5 bg-orange-500 text-white hover:bg-primary transition"
      >
        Buy now
      </button>
    </div>
  );
};

export default AddToCartButton;
