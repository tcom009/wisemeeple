import { config } from "@config";
import { xmlparser } from "@/core/utils/xmlparser";
import { FoundGameI } from "@/core/models/models";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

async function searchBoardgames(query: string) {
  const response = await fetch(`${config.BGG_SEARCH_BOARDGAMES}${query}`);
  const XMLString = await response.text();
  const data = xmlparser(XMLString);
  return data;
}

const GamesPage = async () => {
  const data = await searchBoardgames("battleship");
  console.log(data);
  const items = data && data.items.item;
  console.log(items[0])
  return (
    <div>
      <h1>Games </h1>
      {items.length !== 0 ? (
        <GamesList games={items} />
      ) : (
        <div> No games found</div>
      )}
    </div>
  );
};

export default GamesPage;

interface GamesListProps {
  games: FoundGameI[];
}
const GamesList = ({ games }: GamesListProps) => {
  return (
    <ul>
      {games.map((game: FoundGameI) => (
        <div key={game?.attr?.id}>
          {game?.name?.attr?.value}-{game?.yearpublished?.attr?.value}
          <Link href={`${config.BGG_GAME_URL}${game.attr.id}`} target="_blank">
            <ExternalLinkIcon />
          </Link>
        </div>
      ))}
    </ul>
  );
};
