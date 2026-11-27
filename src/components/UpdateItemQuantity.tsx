"use client";

import { useAppDispatch } from "@/store/hook";
import { updateCartItem } from "@/store/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";

type Props = {
  cartId: string;
  currentQuantity: number;
  stock: number;
};

const UpdateItemQuantity = ({ cartId, currentQuantity, stock }: Props) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleIncrease = () => {
    if (currentQuantity < stock) {
      dispatch(updateCartItem({ cartId, quantity: currentQuantity + 1 }));

      toast({
        className: "bg-green-100 text-green-800 border-green-300",
        title: "Updated Cart",
        description: "Quantity increased successfully.",
      });
    }
  };

  const handleDecrease = () => {
    if (currentQuantity <= 0) return;

    dispatch(updateCartItem({ cartId, quantity: currentQuantity - 1 }));

    if (currentQuantity > 1) {
      toast({
        className: "bg-green-100 text-green-800 border-green-300",
        title: "Updated Cart",
        description: "Quantity decreased successfully.",
      });
    } else if (currentQuantity === 1) {
      toast({
        className: "bg-red-100 text-red-800 border-red-300",
        title: "Deleted Item",
        description: "Deleted item from cart successfully.",
      });
    }
  };

  return (
    <div
      role="group"
      aria-label="Item quantity controls"
      className="flex items-center justify-center gap-3 md:gap-5"
    >
      <button
        type="button"
        className="btnDecrease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleDecrease}
        disabled={currentQuantity <= 0}
        aria-label={
          currentQuantity === 1
            ? "Remove item from cart"
            : "Decrease item quantity"
        }
      >
        -
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Quantity: ${currentQuantity}`}
        className="text-sm font-medium"
      >
        {currentQuantity}
      </span>

      <button
        type="button"
        className="btnIncrease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleIncrease}
        disabled={currentQuantity >= stock}
        aria-label="Increase item quantity"
      >
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
