"use server";
import { Flex, Text, Container, Card, Grid, Button } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import GameCard from "./GameCards";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Paginator from "@/core/components/Paginator";
interface Props {
  games?: UserGame[] | [];
  count: number;
  page: number;
}

const GamesForSale = ({ games, count = 0, page: currentPage }: Props) => {
  const itemsPerPage = 10
  return (
    <>
      <Container>
        <Card>
        <Flex width={"100%"} justify={"end"} align={"center"}>
            {`Página ${currentPage} de ${Math.ceil(count/itemsPerPage)}` }
        </Flex>
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
            <Paginator
              currentPage={currentPage}
              itemsCount={count}
              pageUrl="/games?page"
            />
          </Flex>
        </Card>
      </Container>
    </>
  );
};
export default GamesForSale;
