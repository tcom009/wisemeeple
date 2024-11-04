import { Flex, Grid } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import GridItem from "./GridItem";
import GameOptionsMenu from "./GameOptionsMenu";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { ChevronDownIcon } from "@radix-ui/react-icons";
interface Props {
  games: UserGame[];
  userMatchsCatalog?: boolean;
  isGameList?: boolean;
}

const GridView = ({
  games,
  userMatchsCatalog = false,
  isGameList = false,
}: Props) => {
  const router = useRouter();
  return (
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
      {games?.map((game: UserGame) => (
        <Flex key={game.id} align={"center"} justify={"center"}>
          {isGameList ? (
            <GridItem game={game} configuration={{ showObservations: false }} />
          ) : (
            <GridItem game={game} configuration={{ hasGameLink: false }} />
          )}
          {userMatchsCatalog && (
            <Flex justify={"end"} width={"100%"} align={"center"}>
              <GameOptionsMenu game={game} menuButton={<ChevronDownIcon />} />
            </Flex>
          )}
        </Flex>
      ))}
    </Grid>
  );
};

export default GridView;
