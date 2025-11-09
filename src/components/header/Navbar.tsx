"use client";

import { Pages, Routes } from "@/constants/enums";
import { Gift, HomeIcon, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAuth, useClerk, UserButton, useUser } from "@clerk/nextjs";
import { UserRole } from "@prisma/client";
import { useIsMobile } from "@/hooks/useIsMobile";
import CartButton from "./cart-button";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { clearCart, fetchUserCart } from "@/store/cart/cartSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const links = [
    { title: "Home", href: Routes.ROOT },
    { title: "Shop", href: Pages.SHOP },
    { title: "About Us", href: Pages.ABOUT },
    { title: "Contact", href: Pages.CONTACT },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  const isAdmin = user?.publicMetadata.role === UserRole.ADMIN;

  // Sub-component for the Seller Dashboard button
  const SellerDashboardButton = () =>
    isAdmin ? (
      <Button
        variant="outline"
        onClick={() => router.push("/admin")}
        className={`text-xs rounded-full hover:bg-accent/10  ${
          pathname.startsWith("/admin")
            ? "!text-primary border !border-primary"
            : ""
        }`}
      >
        Admin
      </Button>
    ) : null;

  const isMobile = useIsMobile();

  // Sub-component for the user menu (UserButton)
  const UserMenu = () => (
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

        <UserButton.Action
          label="Cart"
          labelIcon={<ShoppingCart className="w-4 h-4 text-gray-600" />}
          onClick={() => router.push(Pages.CART)}
        />
      </UserButton.MenuItems>
    </UserButton>
  );

  // Sub-component for the sign-in button
  const SignInButton = () => (
    <Button onClick={() => openSignIn()} variant="outline" className="btn-user">
      <User className="w-4 h-4" />
    </Button>
  );

  useEffect(() => {
    if (isSignedIn && user?.id) {
      dispatch(fetchUserCart(user.id));
    } else {
      dispatch(clearCart());
    }
  }, [isSignedIn, user?.id, dispatch]);

  return (
    <>
      {/* Navigation links for desktop view*/}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-primary transition ${
              isActive(link.href) ? "text-primary" : "text-accent"
            }`}
          >
            {link.title}
          </Link>
        ))}

        <SellerDashboardButton />
      </div>

      {/* User icons section - desktop view*/}
      <ul className="hidden md:flex items-center gap-5">
        <Search className="w-4 h-4" />
        {user ? <UserMenu /> : <SignInButton />}
        <CartButton />
      </ul>

      {/* Mobile view components*/}
      <div className="flex items-center md:hidden gap-3">
        <SellerDashboardButton />
        {user ? <UserMenu /> : <SignInButton />}
        <CartButton />
      </div>
    </>
  );
};

export default Navbar;
