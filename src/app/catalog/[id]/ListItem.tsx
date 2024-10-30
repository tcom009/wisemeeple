import { UserGame } from "@/core/models/models";
import {  Flex, Separator, Text, Avatar } from "@radix-ui/themes";
import { formatMoney } from "@/core/lib/formatMoney";
import {
  languageMap,
  conditionMap,
  languageDependencyMap,
} from "@/core/data/gameDetails";

interface Props {
  game: UserGame;
  userMatchsCatalog: boolean;
}
import GameOptionsMenu from "./GameOptionsMenu";

const ListItem = ({ game, userMatchsCatalog }: Props) => {
  const {
    game_name,
    image,
    language,
    price,
    condition,
    language_dependency,
    accepts_changes,
    created_at,
  } = game;
  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <>
      <Flex direction={"row"} gap={"4"} className="clickable" width="100%">
        <Flex align={"center"} gap={"3"} width="100%">
          <Avatar
            src={image}
            fallback={game_name[0]}
            size={{ lg: "8", xl: "8", md: "8", initial: "6" }}
          />
          <Flex direction={"column"} className="clickable">
            <Text weight={"bold"}>
              {game_name}
              <Text size={"2"} weight={"light"}>
                {" "}
                - {conditionMap.get(condition)}
              </Text>
            </Text>
            <Text weight={"bold"} size={"6"}>
              ${formatMoney(price)}
            </Text>
            <Text weight={"bold"} size={"1"}>
              🔤 {languageMap.get(language)?.toLocaleUpperCase()}
            </Text>
            <Text size={"1"} weight={"bold"}>
              {accepts_changes && "Acepta Cambios"}
            </Text>
            <Text size={"1"}>
              {languageDependencyMap.get(language_dependency)}
            </Text>
            <Text size={"1"} weight={"bold"}>
              {`Disponible desde:`}
              <Text weight={"medium"}>{` ${formattedDate}`}</Text>
            </Text>
          </Flex>
        </Flex>
        {userMatchsCatalog && (
          <Flex justify={"end"} width={"100%"} align={"center"}>
            <GameOptionsMenu game={game} />
          </Flex>
        )}
      </Flex>
      <Separator orientation="horizontal" size={"4"} my={"3"} />
    </>
  );
};

export default ListItem;
