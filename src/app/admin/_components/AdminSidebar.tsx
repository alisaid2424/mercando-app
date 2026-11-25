"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  UserCircle,
  ListOrdered,
  Boxes,
  Users,
  ShoppingCart,
} from "lucide-react";
import { Routes } from "@/constants/enums";

const AdminSidebar = () => {
  const pathname = usePathname();

  const tabs = [
    { title: "Profile", href: Routes.ADMIN, icon: UserCircle },
    { title: "Users", href: Routes.USERS, icon: Users },
    { title: "Categories", href: Routes.CATEGORIES, icon: ListOrdered },
    { title: "Products", href: Routes.PRODUCTS, icon: Boxes },
    { title: "Orders", href: Routes.ORDERS, icon: ShoppingCart },
  ];

  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray.length > 2 ? pathname.startsWith(href) : pathname === href;
  };

  return (
    <nav
      aria-label="Admin navigation"
      className=" md:w-40 lg:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col"
    >
      {tabs.map(({ title, href, icon: Icon }) => {
        const isActive = isActiveTab(href);

        return (
          <Link
            href={`${href}?pageNumber=1`}
            key={title}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center py-3 px-4 gap-3 transition-all ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-orange-200 border-orange-500/90"
                : "hover:bg-orange-200 border-white"
            }`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only md:not-sr-only">{title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminSidebar;
