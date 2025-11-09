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
    <div className=" md:w-40 lg:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col">
      {tabs.map(({ title, href, icon: Icon }) => {
        const isActive = isActiveTab(href);

        return (
          <Link href={`${href}?pageNumber=1`} key={title}>
            <div
              className={`flex items-center py-3 px-4 gap-3 transition-all ${
                isActive
                  ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                  : "hover:bg-gray-100/90 border-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <p className="md:block hidden">{title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
