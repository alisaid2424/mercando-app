import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  if (pages <= 1) return null;

  const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  const isPrevDisabled = prev < 1;
  const isNextDisabled = next > pages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-7 flex max-w-full items-center justify-center"
    >
      <ul className="flex items-center gap-3">
        <li>
          {isPrevDisabled ? (
            <span
              aria-disabled="true"
              aria-label="Previous page"
              className="inline-flex cursor-not-allowed font-light text-gray-400"
            >
              <ChevronLeft size={35} aria-hidden="true" />
            </span>
          ) : (
            <Link
              href={`${route}?pageNumber=${prev}`}
              aria-label="Previous page"
              className="inline-flex rounded font-light text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ChevronLeft size={35} aria-hidden="true" />
            </Link>
          )}
        </li>

        {pagesArray.map((page) => {
          const isCurrent = pageNumber === page;

          return (
            <li key={page}>
              <Link
                href={`${route}?pageNumber=${page}`}
                aria-label={`Page ${page}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`btn-link text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isCurrent ? "active-btn" : ""
                }`}
              >
                {page}
              </Link>
            </li>
          );
        })}

        <li>
          {isNextDisabled ? (
            <span
              aria-disabled="true"
              aria-label="Next page"
              className="inline-flex cursor-not-allowed font-light text-gray-400"
            >
              <ChevronRight size={35} aria-hidden="true" />
            </span>
          ) : (
            <Link
              href={`${route}?pageNumber=${next}`}
              aria-label="Next page"
              className="inline-flex rounded font-light text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ChevronRight size={35} aria-hidden="true" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
