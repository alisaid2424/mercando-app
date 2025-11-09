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
        className: "bg-green-100 text-green-600",
        title: "Updated Cart",
        description: "Quantity increased successfully ✅",
      });
    }
  };

  const handleDecrease = () => {
    dispatch(updateCartItem({ cartId, quantity: currentQuantity - 1 }));

    if (currentQuantity > 1) {
      toast({
        className: "bg-green-100 text-green-600",
        title: "Updated Cart",
        description: "Quantity decreased successfully ✅",
      });
    } else if (currentQuantity === 1) {
      toast({
        className: "bg-red-100 text-red-600",
        title: "Deleted Item",
        description: "Deleted Item from cart successfully 🗑️",
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 md:gap-5">
      <button
        className="btnDecrease"
        onClick={handleDecrease}
        disabled={currentQuantity <= 0}
      >
        -
      </button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <button
        className="btnIncrease"
        onClick={handleIncrease}
        disabled={currentQuantity >= stock}
      >
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
