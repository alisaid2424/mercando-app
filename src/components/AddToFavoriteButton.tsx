"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateFavoriteUser } from "@/server/actions/user";
import { useClerk, useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const AddToFavoriteButton = ({
  productId,
  initialFavorite,
}: {
  productId: string;
  initialFavorite: boolean;
}) => {
  const { user } = useUser();
  const { toast } = useToast();
  const { openSignIn } = useClerk();

  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleAddToFavoriteButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (!user) {
        openSignIn();
        return;
      }

      const res = await updateFavoriteUser(productId, user.id);

      if (res.status === 200) {
        setIsFavorite((res.favorites ?? []).includes(productId));
        toast({
          title: "Success! 🎉",
          description: res.message,
          className: "bg-green-100 text-green-600",
        });
      } else {
        toast({
          title: "Error",
          description: res.message,
          className: "bg-red-100 text-red-600",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Unexpected error occurred",
        className: "bg-red-100 text-red-600",
      });
    }
  };

  return (
    <Button
      size="icon"
      onClick={handleAddToFavoriteButton}
      data-hover-icon
      className="
    absolute top-2 right-2 bg-white p-2 rounded-full shadow-md 
    active:scale-95 transition
    hover:bg-primary
  "
    >
      <Heart
        className={`
      w-3 h-3 
      ${isFavorite ? "fill-primary stroke-primary" : "stroke-gray-600"}
      [button[data-hover-icon]:hover_&]:stroke-white
      [button[data-hover-icon]:hover_&]:fill-white transition
    `}
      />
    </Button>
  );
};

export default AddToFavoriteButton;
