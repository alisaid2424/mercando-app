import { Routes } from "@/constants/enums";
import Link from "next/link";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="border-b border-gray-300 text-gray-700">
      <div className="!container max-w-7xl flex items-center justify-between py-3 ">
        <Link
          href={Routes.ROOT}
          className="text-2xl font-extrabold tracking-wide"
        >
          <span className="text-primary">M</span>ercando
        </Link>

        <Navbar />
      </div>
    </header>
  );
};

export default Header;
