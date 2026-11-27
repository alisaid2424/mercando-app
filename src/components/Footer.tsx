import Link from "next/link";
import { Pages, Routes } from "@/constants/enums";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="wrapper flex flex-col items-center justify-center gap-10 border-y border-gray-500/30 py-14 text-gray-600 md:flex-row md:items-start">
        <div className="w-4/5">
          <div className="max-md:text-center">
            <Logo />
          </div>

          <p className="mt-3 text-center text-sm md:text-start leading-6 lg:leading-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>

        <nav
          aria-label="Company links"
          className="flex w-1/2 items-center justify-center text-center md:items-start md:text-start"
        >
          <div>
            <h2 className="mb-5 font-medium text-gray-900">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={Routes.ROOT}
                  className="rounded transition hover:text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={Pages.ABOUT}
                  className="rounded transition hover:text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href={Pages.CONTACT}
                  className="rounded transition hover:text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="rounded transition hover:text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex w-1/2 items-center justify-center text-center md:items-start md:text-start">
          <div>
            <h2 className="mb-5 font-medium text-gray-900">Get in touch</h2>
            <address className="space-y-2 text-sm not-italic">
              <p>
                <a
                  href="tel:+1154879094"
                  className="rounded transition hover:text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  +1-154-879-094
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@aliasy.dev"
                  className="rounded transition hover:text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  contact@aliasy.dev
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs text-gray-600 md:text-sm">
        Copyright &copy; {new Date().getFullYear()} Mercando. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
