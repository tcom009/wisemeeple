"use client";
import { Grid, Text, Flex, Box, Avatar } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import { trimText } from "@/core/lib/textUtils";
import { formatMoney } from "@/core/lib/formatMoney";
import Link from "next/link";
import Observations from "./ObservationsSection";
import { config } from "@/config";
import {
  languageMap,
  conditionMap,
  languageDependencyMap,
} from "@/core/data/gameDetails";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { routes } from "@/routes";
export type Config = Record<
  | "showObservations"
  | "showPrice"
  | "showCreationDate"
  | "showCondition"
  | "showLanguage"
  | "showLanguageDependency"
  | "showAcceptsChanges"
  | "showBGGInfo"
  | "hasGameLink"
  | "showUpdatedAt",
  boolean
>;
interface Props {
  game: UserGame;
  configuration?: Partial<Config>;
}

const GridItem = ({ game, configuration = {} }: Props) => {
  const date = new Date(game.created_at);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <Flex key={game.id} width={"100%"} justify={"center"} direction="row" m="2">
      <Box>
        <Flex width={"100%"} justify={"center"} direction={"column"}>
          <Flex justify={"center"} align={"center"} mb="2">
            <Avatar src={game.image} fallback={game.game_name[0]} size={"9"} />
          </Flex>
          <Flex justify={"start"} align={"center"} gap={"2"}>
            <Text title={game.game_name} weight={"bold"} size={"5"}>
              {configuration.hasGameLink !== false ? (
                <Link
                  className="no-underline"
                  href={`${routes.GAME}${game.id}`}
                >
                  {trimText(game.game_name)}
                </Link>
              ) : (
                trimText(game.game_name)
              )}
            </Text>
            {configuration.showBGGInfo !== false && (
              <Link
                href={`${config.BGG_GAME_URL}/${game.bgg_id}`}
                target="_blank"
                className="no-underline"
              >
                <ExternalLinkIcon />
              </Link>
            )}
          </Flex>
          <Flex direction={"column"} justify={"center"}>
            <Grid
              columns={configuration.showLanguage === false ? "1" : "2"}
              align={"center"}
              justify={"center"}
            >
              {configuration.showLanguage !== false && (
                <Text weight={"bold"} size={"2"}>
                  🔤 {languageMap.get(game.language)?.toLocaleUpperCase()}
                </Text>
              )}
              {configuration.showPrice !== false && (
                <Text align={"right"} weight={"bold"} size={"6"}>
                  ${formatMoney(game.price)}
                </Text>
              )}
            </Grid>
            {configuration.showAcceptsChanges !== false && (
              <Text size={"2"} weight={"bold"}>
                {game.accepts_changes && "Acepta Cambios"}
              </Text>
            )}
            {configuration.showCondition !== false && (
              <Text size={"2"}>{conditionMap.get(game.condition)}</Text>
            )}
            {configuration.showLanguageDependency !== false && (
              <Text size={"2"}>
                {languageDependencyMap.get(game.language_dependency)}
              </Text>
            )}
            {configuration.showCreationDate !== false && (
              <Text size={"2"} weight={"bold"}>
                {`Disponible desde:`}
                <Text weight={"medium"}>{` ${formattedDate}`}</Text>
              </Text>
            )}
            {configuration.showObservations !== false && (
              <Observations observations={game.observations} />
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default GridItem;
