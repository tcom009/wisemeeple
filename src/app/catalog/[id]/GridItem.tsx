import { Grid, Text, Flex, Box, Avatar } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import { trimText } from "@/core/lib/textUtils";
import { formatMoney } from "@/core/lib/formatMoney";
import Link from "next/link";
import { config } from "@/config";
import {
  languageMap,
  conditionMap,
  languageDependencyMap,
} from "@/core/data/gameDetails";
import {
  ExternalLinkIcon,
} from "@radix-ui/react-icons";


export type Config = Record<'showObservations'| 'showPrice' | 'showCreationDate', boolean>
interface Props {
  game: UserGame;
  configuration?: Partial<Config>
}



const GridItem = ({ game , configuration = {} }: Props) => {
  const date = new Date(game.created_at);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    
      <Flex width={"100%"} justify={"center"} direction="row">
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
                {trimText(game.game_name)}
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
              <Text size={"2"} weight={"bold"}>
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

              {configuration.showObservations !== false && (
                <>
                  <Text size={"2"} weight={"bold"}>
                    Observaciones:{" "}
                  </Text>
                  <Text size={"2"}>{game.observations}</Text>
                </>
              )}
            </Flex>
          </Flex>
        </Box>
      </ Flex>
  );
};

export default GridItem;
