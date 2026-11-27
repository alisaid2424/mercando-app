import AdminTable from "@/components/AdminTable";
import prisma from "@/lib/db";
import { getUsers } from "@/server/db/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description:
    "View and manage registered users on Mercando from the admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

interface UsersPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const { pageNumber } = await searchParams;
  const page = Number(pageNumber) || 1;
  const [users, count] = await Promise.all([
    getUsers(page),
    prisma.user.count(),
  ]);

  const columns = [
    { key: "name", name: "UserName" },
    { key: "email", name: "Email" },
    { key: "image", name: "Image" },
    { key: "createdAt", name: "CreatedAt" },
    { key: "updatedAt", name: "UpdatedAt" },
  ];

  return (
    <section aria-labelledby="users-heading" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-end">
          <h1
            id="users-heading"
            className="text-2xl font-semibold text-gray-900"
          >
            Users
          </h1>
          <div
            aria-hidden="true"
            className="w-14 h-0.5 bg-primary rounded-full"
          />
        </div>

        <p className="text-sm text-gray-600">Total: {count}</p>
      </div>

      <AdminTable
        data={users}
        columns={columns}
        pageNumber={pageNumber}
        totalCount={count}
        type="users"
      />
    </section>
  );
};

export default UsersPage;
