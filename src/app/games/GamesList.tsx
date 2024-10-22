"use client";
import {
  Flex,
  Text,
  Container,
  Card,
  Grid,
  Button,
} from "@radix-ui/themes";
import { createClient } from "@/utils/supabase/client";
import { PageStatus, UserGame } from "@/core/models/models";
import GameCard from "./GameCards";
import { useState } from "react";

interface Props {
  games?: UserGame[] | [];
  count: number | null;
}
interface stateI {
  games: UserGame[] | [];
  pageStatus: PageStatus;
  currentPage: number;
  count: number | null;
}
const GamesForSale = ({ games: initialGames, count: initialCount }: Props) => {
  const supabase = createClient();
  const [state, setState] = useState<stateI>({
    games: initialGames ?? [],
    pageStatus: PageStatus.IDLE,
    currentPage: 1,
    count: initialCount ?? 0,
  });
  const { games, pageStatus, currentPage, count } = state;
  const getGames = async (start: number, end: number) =>
    await supabase
      .from("user_games")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(start, end);

  const setNewGames = async () => {
    const start = currentPage * 10  ;
    const end = (currentPage + 1) * 10 - 1;
    const { data, error, count } = await getGames(start, end);
    if (error) {
      return null;
    }
    setState((prevState) => ({
      ...prevState,
      games: [...games, ...data],
      currentPage: currentPage + 1,
      count,
    }));
  };
  return (
    <>
      <Container>
        <Flex width={"100%"} justify={"center"} align={"center"} my="5">
          <Text weight={"bold"} size={"5"}>
            {" "}
            Juegos Recientes
          </Text>
        </Flex>
        <Card>
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
          <Flex width={"100%"} justify={"center"} my="5">
            <Button
              onClick={() => setNewGames()}
            >
              Cargar más
            </Button>
          </Flex>
        </Card>
      </Container>
    </>
  );
};
export default GamesForSale;
