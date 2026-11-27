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
    <aside
      aria-label="Admin sidebar"
      className="flex w-16 flex-col overflow-hidden border-r border-gray-300 text-base md:w-40 lg:w-64"
    >
      <nav aria-label="Admin sections">
        <ul className="flex flex-col">
          {tabs.map(({ title, href, icon: Icon }) => {
            const isActive = isActiveTab(href);

            return (
              <li key={title}>
                <Link
                  href={`${href}?pageNumber=1`}
                  aria-label={title}
                  title={title}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-600 ${
                    isActive
                      ? "border-r-4 border-orange-500/90 bg-orange-200 font-medium text-gray-900 md:border-r-[6px]"
                      : "border-white text-gray-700 hover:bg-orange-200"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="sr-only md:not-sr-only">{title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
