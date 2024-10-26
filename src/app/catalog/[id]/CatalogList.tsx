"use client";
import { config } from "config";
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
import { TrashIcon, ExternalLinkIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { trimText } from "@/core/lib/textUtils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SmallSpinner from "@/core/components/SmallSpinner";
import Link from "next/link";
import { formatMoney } from "@/core/lib/formatMoney";
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
      setIsLoading(false);
    }
    router.refresh();
    setInterval(() => setIsLoading(false), 3000);
  };

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
        px={{ xl: "9", md: "9", sm: "4", lg: "9", xs: "4" }}
        py="3"
      >
        {games?.map((game: UserGame) => {
          const date = new Date(game.created_at);
          const formattedDate = date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
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

                <Flex justify={"start"} align={"center"} grow={"1"}>
                  <Text weight={"bold"} size={"5"}>
                    {trimText(game.game_name, MAX_TITLE_LENGTH)}
                    <Link
                      href={`${config.BGG_GAME_URL}/${game.bgg_id}`}
                      target="_blank"
                      className="no-underline"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </Text>
                </Flex>

                <Flex direction={"column"} justify={"center"}>
                  <Grid columns={"2"}>
                    <Flex width={"100%"} align={"center"} grow={"0"}>
                      <Text weight={"bold"} size={"2"}>
                        🔤 {languageMap.get(game.language)?.toLocaleUpperCase()}
                      </Text>
                    </Flex>
                    <Flex width={"100%"} justify={"end"} grow={"0"}>
                      <Text weight={"bold"} size={"6"}>
                        ${formatMoney(game.price)}
                      </Text>
                    </Flex>
                  </Grid>
                  <Text size={"2"} weight={'bold'}>
                    {game.accepts_changes && "Acepta Cambios"}
                  </Text>
                  <Text size={"2"}>{conditionMap.get(game.condition)}</Text>
                  <Text size={"2"}>
                    {languageDependencyMap.get(game.language_dependency)}
                  </Text>
                  <Text size={"2"} weight={"bold"}>
                    {`Disponible desde:`}
                    <Text weight={"medium"}>{` ${formattedDate}`}</Text>
                  </Text>

                  {game.observations && (
                    <>
                      <Text size={"2"} weight={"bold"}>Observaciones: </Text>
                      <Text size={"2"}>{game.observations}</Text>
                    </>
                  )}
                </Flex>
              </Flex>
              <Flex width={"100%"} justify={"center"}>
                {userMatchsCatalog && (
                  <Flex gap={"2"}>
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
                            disabled={isLoading}
                          >
                            <TrashIcon />{" "}
                            {isLoading ? <SmallSpinner /> : "Eliminar"}
                          </Button>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                    <Link href={`/catalog/edit/${game.id}`}>
                    <Button size="1" color="blue">
                          {" "}
                          <Pencil2Icon />
                          Editar
                        </Button>
                    </Link>
                  </Flex>
                )}
              </Flex>
            </Box>
          );
        })}
      </Grid>
    </Card>
  );
}
