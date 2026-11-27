import { BackButton } from "@/components/BackButton";
import Logo from "@/components/Logo";

const AdminNavbar = () => {
  return (
    <header className="w-full">
      <nav
        aria-label="Admin top navigation"
        className="flex items-center justify-between px-6 py-3 md:px-10"
      >
        <Logo />

        <BackButton
          title="Go Back"
          variant="default"
          className="rounded-full text-white"
        />
      </nav>
    </header>
  );
};

export default AdminNavbar;
