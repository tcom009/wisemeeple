import { UserGame } from "@/core/models/models";
import { Grid } from "@radix-ui/themes";
import ListItem from "./ListItem";
interface Props {
  games: UserGame[];
  userMatchsCatalog: boolean;
}

const ListView = ({
  games,
  userMatchsCatalog
}: Props) => {
  return (
    <Grid>
      {games.map((game: UserGame) => (
        <ListItem
          key={game.id}
          game={game}
          userMatchsCatalog={userMatchsCatalog}
        />
      ))}
    </Grid>
  );
};

export default ListView;
