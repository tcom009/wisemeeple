import {
  Card,
  Flex,
  Grid,
  Box,
  Text,
  Avatar,
  ScrollArea,
} from "@radix-ui/themes";
import { createClient } from "@/utils/supabase/server";
import { trimText, formatNumber } from "@/core/lib/textUtils";
import {
  languageDependencyMap,
  languageMap,
  conditionMap,
} from "@/core/data/gameDetails";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  userId: string;
  currentGame: string;
}
async function GameCarousel({ userId, currentGame }: Props) {
  const supabase = createClient();
  const getUserGames = async () => {
    const { data, error } = await supabase
      .from("user_games")
      .select()
      .eq("owner_id", userId);
    if (error) {
      return null;
    }
    const cleanedData = data.filter((game) => game.id !== currentGame);
    return cleanedData;
  };
  const userGames = await getUserGames();
  if (userGames === null) {
    return null;
  }

  return (
    <Card>
      <ScrollArea
        size={"2"}
        type={userGames.length > 4 ? "always" : "hover"}
        scrollbars="horizontal"
        style={{ height: 250 }}
      >
        <Flex direction={"row"} gap={"4"}>
          {userGames.map((game) => {
            return (
              <Box key={game.id}>
                <Flex width={"100%"} justify={"center"} direction={"column"}>
                  <Flex justify={"center"} align={"center"}>
                  <Link
                        className="no-underline white-link"
                        href={`/game/${game.id}`}
                      >
                    <Avatar
                      src={game.image}
                      fallback={game.game_name[0]}
                      size={"9"}
                    />
                    </Link>
                  </Flex>

                  <Flex justify={"start"} align={"center"} grow={"1"}>
                    <Text weight={"bold"} size={"5"}>
                      <Link
                        className="no-underline white-link"
                        href={`/game/${game.id}`}
                      >
                        {trimText(game.game_name, 25)}
                      </Link>
                    </Text>
                  </Flex>

                  <Flex direction={"column"} justify={"center"}>
                    <Grid columns={"2"}>
                      <Flex width={"100%"} align={"center"} grow={"0"}>
                        <Text weight={"bold"} size={"2"}>
                          🔤{" "}
                          {languageMap.get(game.language)?.toLocaleUpperCase()}
                        </Text>
                      </Flex>
                      <Flex width={"100%"} justify={"end"} grow={"0"}>
                        <Text weight={"bold"} size={"6"}>
                          ${formatNumber(game.price)}
                        </Text>
                      </Flex>
                    </Grid>
                    
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </ScrollArea>
    </Card>
  );
}

export default GameCarousel;
