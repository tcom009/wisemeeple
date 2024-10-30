import { UserGame } from "@/core/models/models";
import { config } from "@/config";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { trimText } from "@/core/lib/textUtils";
import { formatMoney } from "@/core/lib/formatMoney";
import {
  languageDependencyMap,
  languageMap,
  conditionMap,
} from "@/core/data/gameDetails";
import { routes } from "@/routes";
import { Box, Flex, Text, Grid, Avatar } from "@radix-ui/themes";

interface Props {
  games?: UserGame[];
  showInfo?: boolean;
}
const GameCards = ({ games, showInfo = true }: Props) => {
  const MAX_TITLE_LENGTH = 25;
  if (!games) return null;
  return (
    <>
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

              <Flex justify={"start"} align={"baseline"} grow={"1"} gap={"1"}>
                <Link href={`${routes.GAME}${game.id}`} className="no-underline">
                  <Text weight={"bold"} size={"5"}>
                    {trimText(game.game_name, MAX_TITLE_LENGTH)}
                  </Text>
                </Link>
                <Link
                    href={`${config.BGG_GAME_URL}/${game.bgg_id}`}
                    target="_blank"
                    className="no-underline"
                  >
                    <ExternalLinkIcon />
                  </Link>
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
                <Text>{conditionMap.get(game.condition)}</Text>
                {showInfo && (
                  <>
                    <Text>
                      {languageDependencyMap.get(game.language_dependency)}
                    </Text>
                    <Text size="2" weight={"bold"}>
                      {game.accepts_changes && 'Acepta Cambios'}
                    </Text>
                    {game.created_at && (
                      <>
                        <Text weight={"bold"}>Disponible desde: </Text>
                        <Text size={"2"}>{formattedDate}</Text>
                      </>
                    )}
                  </>
                )}
              </Flex>
            </Flex>
          </Box>
        );
      })}
    </>
  );
};

export default GameCards;
