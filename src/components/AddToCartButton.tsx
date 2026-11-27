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

  const addProductToCart = async (redirectToCart: boolean = false) => {
    if (!user) {
      openSignIn({
        appearance: {
          elements: {
            modalContent: "mx-auto my-auto",
          },
        },
      });
      return;
    }

    const resultAction = await dispatch(
      addCartItem({
        clerkUserId: user.id,
        productId: product.id,
        quantity: 1,
      }),
    );

    if (addCartItem.rejected.match(resultAction)) {
      toast({
        className: "bg-red-100 text-red-800 border-red-300",
        title: "Failed to add",
        description:
          resultAction.error?.message ||
          "Failed to add product. Try again later.",
      });
      return;
    }

    toast({
      className: "bg-green-100 text-green-800 border-green-300",
      title: "Added to cart",
      description: `${product.name} has been added to your cart successfully. 🎉`,
    });

    if (redirectToCart) router.push("/cart");
  };

  useEffect(() => {
    if (error) {
      toast({
        className: "bg-red-100 text-red-800 border-red-300",
        title: "Error",
        description: error,
      });
    }
  }, [error, toast]);

  return (
    <div className="flex items-center mt-10 gap-4">
      <button
        type="button"
        onClick={() => addProductToCart(false)}
        disabled={loading || product.stock === 0}
        aria-busy={loading}
        aria-label={`Add ${product.name} to cart`}
        className="w-full py-3.5 bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
      >
        Add to Cart
      </button>

      <button
        type="button"
        onClick={() => addProductToCart(true)}
        disabled={loading || product.stock === 0}
        aria-busy={loading}
        aria-label={`Buy ${product.name} now`}
        className="w-full py-3.5 bg-orange-500 font-medium text-white hover:bg-primary transition"
      >
        Buy now
      </button>
    </div>
  );
};

export default AddToCartButton;
