import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  currentPage: number;
  itemsCount: number;
  pageUrl: string;
}

const Paginator = ({ currentPage, itemsCount = 0, pageUrl }: Props) => {
  const totalPages = Math.ceil(itemsCount / 10);
  const SHOWING_PAGES = 2;

  const paginationNumbers = () => {
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
    if (currentPage === 2) {
      return paginationNumbers.slice(
        currentPage - 1,
        currentPage + SHOWING_PAGES + 1
      );
    }
    if (currentPage === 1) {
      return paginationNumbers.slice(currentPage, currentPage + SHOWING_PAGES + 2);
    }
    if (totalPages - currentPage < SHOWING_PAGES) {
      return paginationNumbers.slice(currentPage - SHOWING_PAGES, currentPage);
    }
    return paginationNumbers.slice(
      currentPage - 2,
      currentPage + SHOWING_PAGES
    );
  };
  return (
    <>
      {currentPage > 1 && (
        <Link href={`${pageUrl}=${currentPage - 1}`}>
          <Button size={{ xs: "1", sm: "1", initial: "1" }}>
            <ChevronLeftIcon />
          </Button>
        </Link>
      )}
      <Link href={`/games?page=1`}>
        <Button
          size={{ xs: "1", sm: "1", initial: "1" }}
          disabled={currentPage === 1}
        >
          {1}
        </Button>
      </Link>
      ...
      {paginationNumbers().map((number) => (
        <Link href={`${pageUrl}=${number}`} key={number}>
          <Button
            size={{ xs: "1", sm: "1", initial: "1" }}
            disabled={currentPage === number}
          >
            {number}
          </Button>
        </Link>
      ))}
      {currentPage !== totalPages && (
        <>
          ...
          <Link href={`${pageUrl}=${totalPages}`}>
            <Button
              size={{ xs: "1", sm: "1", initial: "1" }}
              disabled={currentPage === totalPages}
            >
              {totalPages}
            </Button>
          </Link>
          <Link href={`${pageUrl}=${currentPage + 1}`}>
            <Button size={{ xs: "1", sm: "1", initial: "1" }}>
              <ChevronRightIcon />
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default Paginator;
