"use server";
import { Flex, Text, Container, Card, Grid, Button } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import GameCard from "./GameCards";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
interface Props {
  games?: UserGame[] | [];
  count: number;
  page: number;
}

const GamesForSale = ({ games, count = 0, page: currentPage }: Props) => {
  const totalPages = Math.ceil(count / 10);
  const SHOWING_PAGES = 5;
  const paginationNumbers = () => {
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
    if (currentPage === 1) {
      return paginationNumbers.slice(currentPage, currentPage + SHOWING_PAGES);
    }
    if (totalPages - currentPage < SHOWING_PAGES) {
      return paginationNumbers.slice(currentPage - SHOWING_PAGES, currentPage);
    }
    return paginationNumbers.slice(
      currentPage - 1,
      currentPage + SHOWING_PAGES
    );
  };

  return (
    <>
      <Container>
        <Card>
          <Flex width={"100%"} justify={"center"} align={"center"} my="5">
            <Text weight={"bold"} size={"5"}>
              {" "}
              Juegos Recientes
            </Text>
          </Flex>
          <Grid
            columns={{
              lg: "3",
              md: "3",
              sm: "2",
              initial: "1",
            }}
            gap={"6"}
            px={{ xl: "9", md: "9", sm: "4", lg: "9", xs: "4" }}
            py="3"
          >
            <GameCard games={games} />
          </Grid>
          {/* Pagination controls */}
          <Flex gap={"2"} align={"center"} justify={"center"}>
            {currentPage > 1 && (
              <Link href={`/games?page=${currentPage - 1}`}>
                <ChevronLeftIcon />
              </Link>
            )}
            <Link href={`/games?page=1`}>
              <Button
                disabled={currentPage === 1}
                variant={currentPage === 1 ? "soft" : "classic"}
              >
                {1}
              </Button>
            </Link>
            ...
            {paginationNumbers().map((number) => (
              <Link href={`/games?page=${number}`} key={number}>
                <Button
                  disabled={currentPage === number}
                  variant={currentPage === number ? "soft" : "classic"}
                >
                  {number}
                </Button>
              </Link>
            ))}
            {currentPage !== totalPages && (
              <>
                ...
                <Link href={`/games?page=${totalPages}`}>
                  <Button
                    disabled={currentPage === totalPages}
                    variant={currentPage === totalPages ? "soft" : "classic"}
                  >
                    {totalPages}
                  </Button>
                </Link>
                <Link href={`/games?page=${currentPage + 1}`}>
                  <ChevronRightIcon />
                </Link>
              </>
            )}
          </Flex>
        </Card>
      </Container>
    </>
  );
};
export default GamesForSale;
