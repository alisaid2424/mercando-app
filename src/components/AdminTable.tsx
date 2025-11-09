"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Image from "next/image";
import { Edit, List } from "lucide-react";
import { UserRole } from "@prisma/client";
import {
  CATEGORIES_PER_PAGE,
  ORDERS_PER_PAGE,
  PRODUCTS_PER_PAGE,
  USERS_PER_PAGE,
} from "@/constants/enums";
import Pagination from "./Pagination";
import LottieHandler from "@/lib/LottieHandler";
import DeleteUserButton from "@/app/admin/users/DeleteUserButton";
import DeleteCategoryButton from "@/app/admin/categories/_components/DeleteCategoryButton";
import DeleteProductButton from "@/app/admin/products/_components/DeleteProductButton";
import DeleteOrderButton from "@/app/admin/orders/_components/DeleteOrderButton";

interface AdminTableProps {
  data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  columns: Array<{ key: string; name: string }>;
  pageNumber: string;
  totalCount: number;
  type: "users" | "categories" | "products" | "orders";
}

const AdminTable: FC<AdminTableProps> = ({
  data,
  columns,
  pageNumber,
  totalCount,
  type,
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const currentPage = parseInt(pageNumber);

  const itemsPerPage =
    type === "users"
      ? USERS_PER_PAGE
      : type === "categories"
        ? CATEGORIES_PER_PAGE
        : type === "products"
          ? PRODUCTS_PER_PAGE
          : ORDERS_PER_PAGE;

  const pages =
    type === "users"
      ? Math.ceil(totalCount / USERS_PER_PAGE)
      : type === "categories"
        ? Math.ceil(totalCount / CATEGORIES_PER_PAGE)
        : type === "products"
          ? Math.ceil(totalCount / PRODUCTS_PER_PAGE)
          : Math.ceil(totalCount / ORDERS_PER_PAGE);

  const handleDeleteSuccess = () => {
    const isLastItemOnPage = data.length === 1;
    if (isLastItemOnPage && currentPage > 1) {
      router.push(`/admin/${type}?pageNumber=${currentPage - 1}`);
    } else {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <main>
      <section className="section-gap  lg:px-5 xl:px-10">
        <div className="container">
          {(type === "categories" || type === "products") && (
            <div className="mb-10">
              <Link
                href={`/admin/${type}/add`}
                className="bg-gray-500 hover:bg-green-600 transition-colors py-2 px-3 rounded-md font-semibold text-lg text-white"
              >
                {type === "categories"
                  ? "Create Category"
                  : type === "products"
                    ? "Create Product"
                    : null}
              </Link>
            </div>
          )}

          {data.length > 0 ? (
            <>
              <div className="overflow-x-auto py-3 mt-5">
                <table className="table text-center w-full min-w-[950px] text-foreground">
                  <thead className="border-t-2 border-b-2 border-border bg-primary text-white text-sm tracking-wider">
                    <tr>
                      <th className="p-5">#</th>
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className={`p-3 text-center align-middle capitalize ${
                            column.key === "createdAt" ||
                            column.key === "updatedAt"
                              ? "hidden lg:table-cell"
                              : column.key === "image"
                                ? "hidden sm:table-cell"
                                : ""
                          }`}
                        >
                          {column.name}
                        </th>
                      ))}
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b border-border odd:bg-orange-50 even:bg-orange-100 hover:bg-orange-200 transition-colors"
                      >
                        <td className="p-3">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        {columns.map((column) => {
                          const value = item[column.key];

                          if (
                            column.key === "image" ||
                            column.key === "images"
                          ) {
                            return (
                              <td
                                key={column.key}
                                className="table-cell p-3 text-center align-middle"
                              >
                                {Array.isArray(value) && value.length > 0 ? (
                                  <div className="flex justify-center flex-wrap gap-1">
                                    {value
                                      .slice(0, 4)
                                      .map((img: string, idx: number) => (
                                        <Image
                                          key={idx}
                                          src={img}
                                          alt={`${item.name} image ${idx + 1}`}
                                          width={50}
                                          height={50}
                                          className="object-cover rounded-md bg-white"
                                        />
                                      ))}
                                  </div>
                                ) : value ? (
                                  <Image
                                    src={value}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="object-cover rounded-md mx-auto"
                                  />
                                ) : (
                                  <Image
                                    className="object-cover rounded-md mx-auto"
                                    src="/box_icon.svg"
                                    alt="box_icon"
                                    width={50}
                                    height={50}
                                  />
                                )}
                              </td>
                            );
                          }

                          if (
                            column.key === "createdAt" ||
                            column.key === "updatedAt"
                          ) {
                            return (
                              <td
                                key={column.key}
                                className="hidden lg:table-cell p-3 text-center align-middle"
                              >
                                {new Date(value).toDateString()}
                              </td>
                            );
                          }

                          return (
                            <td key={column.key} className="p-3">
                              {value}
                            </td>
                          );
                        })}

                        <td className="p-3">
                          <div className="flex items-center justify-center gap-2 md:gap-3">
                            {type !== "orders" ? (
                              <Link
                                href={`/admin/${type}/${
                                  type === "users" ? item.clerkUserId : item.id
                                }/edit`}
                                className="bg-primary text-primary-foreground rounded-lg p-2 hover:bg-accent-hover transition-all duration-300 inline-block"
                              >
                                <Edit size={20} color="white" />
                              </Link>
                            ) : (
                              <Link
                                href={`/admin/${type}/${item.id}`}
                                className="bg-blue-600 text-white rounded-lg p-2 hover:bg-primary transition-all duration-300 inline-block"
                              >
                                <List size={20} />
                              </Link>
                            )}

                            {type === "users" ? (
                              item.role !== UserRole.ADMIN && (
                                <DeleteUserButton
                                  userId={item.clerkUserId}
                                  onSuccess={handleDeleteSuccess}
                                />
                              )
                            ) : type === "categories" ? (
                              <DeleteCategoryButton
                                categoryId={item.id}
                                onSuccess={handleDeleteSuccess}
                              />
                            ) : type === "products" ? (
                              <DeleteProductButton
                                productId={item.id}
                                onSuccess={handleDeleteSuccess}
                              />
                            ) : (
                              <DeleteOrderButton
                                orderId={item.id}
                                onSuccess={handleDeleteSuccess}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination
                  pageNumber={parseInt(pageNumber)}
                  pages={pages}
                  route={`/admin/${type}`}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <LottieHandler type="empty" message={`No ${type} found`} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminTable;
