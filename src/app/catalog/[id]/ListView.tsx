import { UserGame } from "@/core/models/models";
import { Grid, Flex, Separator } from "@radix-ui/themes";
import ListItem from "./ListItem";
import GameOptionsMenu from "./GameOptionsMenu";
import Link from "next/link";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
interface Props {
  games: UserGame[];
  userMatchsCatalog?: boolean;
  isGameList?: boolean;
}

const ListView = ({ games, userMatchsCatalog, isGameList }: Props) => {
  const router = useRouter();
  return (
    <Grid columns={"1"}>
      {games.map((game: UserGame, index: number) => (
        <Flex key={game.id} width="100%" direction="column" p="2">
          <Flex direction="row" width="100%">
            {isGameList ? (
              <Flex
                width={"100%"}
                onClick={() => router.push(`${routes.GAME}${game.id}`)}
                className="clickable"
              >
                <ListItem key={game.id} game={game} />
              </Flex>
            ) : (
              <ListItem key={game.id} game={game} />
            )}
            {userMatchsCatalog && (
              <Flex justify={"end"} width={"100%"} align={"center"}>
                <GameOptionsMenu game={game} />
              </Flex>
            )}
          </Flex>
          {index !== games.length - 1 && (
            <Separator orientation="horizontal" size={"4"} mt="5" mb={"3"} />
          )}
        </Flex>
      ))}
    </Grid>
  );
};

export default ListView;
