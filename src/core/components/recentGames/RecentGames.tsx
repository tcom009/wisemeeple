"use server";
import { createClient } from "@/utils/supabase/server";
import GameCards from "@/app/games/GameCards";
import { Grid, Text, Flex, Container, Button, Card } from "@radix-ui/themes";
import Link from "next/link";
const RecentGames = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_games")
    .select()
    .limit(4)
    .order("created_at", { ascending: false });
  if (error) {
    return null;
  }

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
          <GameCards games={data} showInfo={false} />
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
