import AdminSidebar from "./_components/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-x-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
