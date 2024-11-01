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
import GridItem from "@/core/components/gamesList/GridItem";
import { UserGame } from "@/core/models/models";
interface Props {
  userId: string;
  currentGame: string;
}
async function GameCarousel({ userId, currentGame }: Props) {
  const supabase = createClient();
  const getUserGames = async () => {
    const { data, error } = await supabase
      .from("random_user_games")
      .select()
      .eq("owner_id", userId)
      .limit(5);
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
        style={{ height: "17em" }}
      >
        <Flex direction={"row"} gap={"6"}>
          {userGames.map((game: UserGame) => (
            <Flex key={game.id} width={"12em"}>
              <GridItem
                game={game}
                configuration={{
                  showObservations: false,
                  showAcceptsChanges: false,
                  showCreationDate: false,
                  showBGGInfo: false,
                  showCondition: false,
                  showLanguageDependency: false,
                }}
              />
            </Flex>
          ))}
        </Flex>
      </ScrollArea>
    </Card>
  );
}

export default GameCarousel;
