import { Grid } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
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
