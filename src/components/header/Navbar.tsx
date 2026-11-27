"use client";

import { Pages, Routes } from "@/constants/enums";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import CartButton from "./CartButton";
import dynamic from "next/dynamic";

interface NavbarProps {
  isAdmin?: boolean;
}

const links = [
  { title: "Home", href: Routes.ROOT },
  { title: "Shop", href: Pages.SHOP },
  { title: "Favorite", href: Pages.FAVORITES },
  { title: "About", href: Pages.ABOUT },
  { title: "Contact", href: Pages.CONTACT },
];

const AuthControls = dynamic(() => import("./AuthControls"), {
  ssr: false,
  loading: () => <span className="size-8 rounded-full bg-gray-300" />,
});

const Navbar = ({ isAdmin = false }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

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

  return (
    <>
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

      <div className="hidden md:flex items-center gap-8">
        <Link
          href={Pages.SHOP}
          aria-label="Browse all products"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Search className="w-5 h-5" aria-hidden="true" />
        </Link>

        <CartButton />
        <AuthControls />
      </div>

      <div className="flex items-center md:hidden gap-7">
        <SellerDashboardButton />
        <CartButton />
        <AuthControls />
      </div>
    </>
  );
};

export default Navbar;
