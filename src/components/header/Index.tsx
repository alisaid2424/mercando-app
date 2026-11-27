import Navbar from "./Navbar";
import { auth } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import Logo from "../Logo";

const Header = async () => {
  const { sessionClaims } = await auth();
  const metadata = sessionClaims?.publicMetadata as
    | { role?: string }
    | undefined;
  const role = metadata?.role;
  const isAdmin = role === UserRole.ADMIN;

  return (
    <header className="border-b border-gray-300 text-gray-700">
      <div className="wrapper flex items-center justify-between py-3">
        <Logo />

        <Navbar isAdmin={isAdmin} />
      </div>
    </header>
  );
};

export default Header;
