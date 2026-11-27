import { Metadata } from "next";
import AdminNavbar from "./_components/AdminNavbar";
import AdminSidebar from "./_components/AdminSidebar";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s — Admin",
  },
  description:
    "Mercando administration dashboard to manage products, categories, orders, and store settings.",
  robots: {
    index: false,
    follow: false,
  },
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <AdminNavbar />
      <div className="flex w-full border-t border-gray-300 flex-1 overflow-hidden">
        <AdminSidebar />

        <div
          aria-label="Admin workspace"
          className="flex-1 overflow-auto px-4 py-8 md:px-10 h-full"
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;
