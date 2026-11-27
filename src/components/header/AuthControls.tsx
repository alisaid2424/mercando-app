"use client";

import { Pages, Routes } from "@/constants/enums";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { Gift, HeartPlus, HomeIcon, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const AuthControls = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  if (!user) {
    return (
      <Button
        onClick={() =>
          openSignIn({
            appearance: {
              elements: {
                modalContent: "mx-auto my-auto",
              },
            },
          })
        }
        variant="outline"
        className="btn-user"
        aria-label="Sign in"
      >
        <User className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">Sign in</span>
      </Button>
    );
  }

  return (
    <UserButton>
      <UserButton.MenuItems>
        {isMobile && (
          <UserButton.Action
            label="Home"
            labelIcon={<HomeIcon className="w-4 h-4 text-gray-600" />}
            onClick={() => router.push(Routes.ROOT)}
          />
        )}

        {isMobile && (
          <UserButton.Action
            label="Products"
            labelIcon={<Gift className="w-4 h-4 text-gray-600" />}
            onClick={() => router.push(Pages.SHOP)}
          />
        )}

        {isMobile && (
          <UserButton.Action
            label="Favorites"
            labelIcon={<HeartPlus className="w-4 h-4 text-gray-600" />}
            onClick={() => router.push(Pages.FAVORITES)}
          />
        )}

        <UserButton.Action
          label="Cart"
          labelIcon={<ShoppingCart className="w-4 h-4 text-gray-600" />}
          onClick={() => router.push(Pages.CART)}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default AuthControls;
