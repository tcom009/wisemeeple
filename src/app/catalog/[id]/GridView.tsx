import { Grid, Text, Flex, Box, Avatar, Button } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import { trimText } from "@/core/lib/textUtils";
import { formatMoney } from "@/core/lib/formatMoney";
import Link from "next/link";
import { config } from "@/config";
import { routes } from "@/routes";
import {
  languageMap,
  conditionMap,
  languageDependencyMap,
} from "@/core/data/gameDetails";
import {
  TrashIcon,
  ExternalLinkIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import DeleteGameDialog from "./DeleteGameDialog";
import GridItem from "./GridItem";

interface Props {
  games: UserGame[];
  userMatchsCatalog: boolean;
}

const GridView = ({ games, userMatchsCatalog }: Props) => {
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
        <GridItem
          key={game.id}
          game={game}
          userMatchsCatalog={userMatchsCatalog}
        />
      ))}
    </Grid>
  );
};

export default GridView;
