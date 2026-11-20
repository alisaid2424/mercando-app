"use client";

import { Pages, Routes } from "@/constants/enums";
import {
  Gift,
  HeartPlus,
  HomeIcon,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
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
    { title: "Favorite", href: Pages.FAVORITES },
    { title: "About", href: Pages.ABOUT },
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

  // Sub-component for the sign-in button
  const SignInButton = () => (
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
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-4 lg:gap-8 max-md:hidden"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`hover:text-primary transition ${
              isActive(link.href) ? "text-primary" : "text-accent"
            }`}
          >
            {link.title}
          </Link>
        ))}

        <SellerDashboardButton />
      </nav>

      {/* User icons section - desktop view*/}
      <div className="hidden md:flex items-center gap-8">
        <Link href={Pages.SHOP} aria-label="Search products">
          <Search className="w-5 h-5 text-gray-500" aria-hidden="true" />
        </Link>
        <CartButton />
        {user ? <UserMenu /> : <SignInButton />}
      </div>

      {/* Mobile view components*/}
      <div className="flex items-center md:hidden gap-7">
        <SellerDashboardButton />
        <CartButton />
        {user ? <UserMenu /> : <SignInButton />}
      </div>
    </>
  );
};

export default Navbar;
