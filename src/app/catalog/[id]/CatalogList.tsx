"use client";

import { createClient } from "@/utils/supabase/client";
import {
  Card,
  Grid,
  Text,
  Flex,
  Box,
  Avatar,
  Button,
  AlertDialog,
} from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import {
  languageMap,
  conditionMap,
  languageDependencyMap,
} from "@/core/data/gameDetails";
import { TrashIcon } from "@radix-ui/react-icons";
import { trimText } from "@/core/lib/textUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SmallSpinner from "@/core/components/SmallSpinner";
interface CatalogListProps {
  games: UserGame[];
  userMatchsCatalog: boolean;
}

export default function CatalogList({
  games,
  userMatchsCatalog,
}: CatalogListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const MAX_TITLE_LENGTH = 30;
  const supabase = createClient();
  const deleteGame = async (id: string) => {
    setIsLoading(true);
    const { error } = await supabase.from("user_games").delete().eq("id", id);
    if (error) {
      console.error(error);
      setIsLoading(false);
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
                    🔤 {languageMap.get(game.language)?.toLocaleUpperCase()}
                  </Text>

                  <Text>{conditionMap.get(game.condition)}</Text>
                  <Text>
                    {languageDependencyMap.get(game.language_dependency)}
                  </Text>
                  {game.observations && (
                    <>
                      <Text weight={"bold"}>Observaciones: </Text>
                      <Text size={"2"}>{game.observations}</Text>
                    </>
                  )}
                </Flex>
              </Flex>
              <Flex width={"100%"} justify={"center"}>
                {userMatchsCatalog && (
                  <>
                    {" "}
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button size="1" color="red">
                          {" "}
                          <TrashIcon />
                          Eliminar
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content>
                        <AlertDialog.Title>
                          Eliminar {game.game_name}
                        </AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          ¿Estás seguro de eliminar {game.game_name} de tu
                          catálogo?
                        </AlertDialog.Description>

                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancelar
                            </Button>
                          </AlertDialog.Cancel>

                          <Button
                            variant="solid"
                            color="red"
                            onClick={() => deleteGame(game.id)}
                          >
                            <TrashIcon />{" "}
                            {isLoading ? <SmallSpinner /> : "Eliminar"}
                          </Button>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </>
                )}
              </Flex>
            </Box>
          );
        })}
      </Grid>
    </Card>
  );
}
