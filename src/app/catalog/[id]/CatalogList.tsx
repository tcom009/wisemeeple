"use client";

import { createClient } from "@/utils/supabase/client";
import {
  Container,
  Card,
  Grid,
  Text,
  Flex,
  Box,
  Avatar,
  Button,
} from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import {
  languageMap,
  conditionMap,
  languageDependencyMap,
} from "@/core/data/gameDetails";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { trimText } from "@/core/lib/textUtils";
import { useRouter } from "next/navigation";
interface CatalogListProps {
  games: UserGame[];
  user_id: string | undefined;
  param_id: string;
}

export default function CatalogList({
  games,
  user_id,
  param_id,
}: CatalogListProps) {
  const router = useRouter();
  const MAX_TITLE_LENGTH = 30;
  const supabase = createClient();
  const deleteGame = async (id: string) => {
    const { error } = await supabase.from("user_games").delete().eq("id", id);
    if (error) {
      console.error(error);
    }
    router.refresh();
  };
  const formatNumber = (number: number) =>
    (Math.round(number * 100) / 100).toFixed(2);
  return (
    <Card>
      <Grid
        columns={{
          lg: games.length > 3 ? "3" : "2",
          md: games.length > 3 ? "3" : "2",
          sm: games.length > 3 ? "2" : "2",
          initial: "1",
        }}
        gap={"6"}
        px="9"
        py="3"
      >
        {games?.map((game: UserGame) => {
          return (
            <Box key={game.id}>
              <Flex width={"100%"} justify={"center"} direction={"column"}>
                <Flex justify={"center"} align={"center"}>
                  <Avatar
                    src={game.image}
                    fallback={game.game_name[0]}
                    size={"9"}
                  />
                </Flex>
                <Grid columns={"2"}>
                  <Flex justify={"start"} align={"center"} grow={"1"}>
                    <Text weight={"bold"} size={"5"}>
                      {trimText(game.game_name, MAX_TITLE_LENGTH)}
                    </Text>
                  </Flex>
                  <Flex
                    width={"100%"}
                    justify={"center"}
                    align={"center"}
                    grow={"0"}
                  >
                    <Text weight={"bold"} size={"7"}>
                      ${formatNumber(game.price)}
                    </Text>
                  </Flex>
                </Grid>
                <Flex direction={"column"} justify={"center"}>
                  <Text weight={"bold"} size={"2"}>
                    {languageMap.get(game.language)?.toLocaleUpperCase()}
                  </Text>

                  <Text>{conditionMap.get(game.condition)}</Text>
                  <Text>
                    {languageDependencyMap.get(game.language_dependency)}
                  </Text>
                </Flex>
              </Flex>
              <Flex width={"100%"} justify={"center"}>
                {user_id === param_id && (
                  <Button
                    size="1"
                    color="red"
                    onClick={() => deleteGame(game.id)}
                  >
                    {" "}
                    <TrashIcon />
                    Eliminar de mi catalogo
                  </Button>
                )}
              </Flex>
            </Box>
          );
        })}
      </Grid>
    </Card>
  );
}
