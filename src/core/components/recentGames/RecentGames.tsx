"use server";
import { createClient } from "@/utils/supabase/server";
import GridItem from "../gamesList/GridItem";
import { Grid, Text, Flex, Container, Button, Card } from "@radix-ui/themes";
import Link from "next/link";
const RecentGames = async () => {
  const supabase = createClient();
  const { data: games, error } = await supabase
    .from("user_games")
    .select()
    .limit(15)
    .order("created_at", { ascending: false });
  if (error) {
    return null;
  }
  const randomizedGames = games?.sort(() => 0.5 - Math.random());
  const gamesSlice = randomizedGames?.slice(0, 4);
  return (
    <Container my="4" mx="9">
      <Card>
        <Flex width={"100%"} justify={"center"} align={"center"} my="3">
          <Text size={"5"} weight={"bold"} align={"center"}>
            Recién agregados
          </Text>
        </Flex>
        <Grid
          columns={{ sm: "2", md: "2", xs: "2", xl: "4", lg: "4" }}
          align={"center"}
          justify={"center"}
          gapX={"9"}
          mx="3"
        >
          {gamesSlice?.map((game) => (
            <GridItem
              key={game.id}
              game={game}
              configuration={{
                showObservations: false,
                showLanguageDependency: false,
                showBGGInfo: false,
                showAcceptsChanges: false,
                showCreationDate:false
              }}
            />
          ))}
          {games.length === 0 && (
            <div>No se han encontrado juegos recientes</div>
          )}
        </Grid>
        <Flex width={"100%"} justify={"center"} align={"center"} my="3">
          <Link href={"/games?page=1"}>
            <Button size={"3"}>Ver más juegos</Button>
          </Link>
        </Flex>
      </Card>
    </Container>
  );
};

export default RecentGames;
