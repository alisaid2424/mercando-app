import { Routes } from "@/constants/enums";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={Routes.ROOT}
      aria-label="Mercando home"
      className="rounded text-2xl font-extrabold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span aria-hidden="true">
        <span className="text-primary">M</span>ercando
      </span>
    </Link>
  );
};

export default Logo;
