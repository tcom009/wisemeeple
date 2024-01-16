import { config } from "@config";
import { xmlparser } from "@/core/lib/xmlparser";
import { searchCleaner } from "@/core/lib/searchCleaner";
import { Container } from "@radix-ui/themes";
import GamesTable from "@/core/components/GamesTable";
import { CleanCollectionItem } from "@/core/models/models";
import { fullGameParser  } from "@/core/lib/fullGameParser";

async function getSearch(query:string){
  const response = await fetch(`${config.BGG_SEARCH_BOARDGAMES}${query}`).then(
    (res) => res
  );
  const XMLString = await response.text();
  const data = xmlparser(XMLString);
  return data
}


const getGames = async (games: CleanCollectionItem[]|[]) => {
  const gamesId= games.map (game => game.id);
  const stringId = gamesId.join(",");
  const response = await fetch(`${config.BGG_GET_GAME}${stringId}`);
  const XMLString = await response.text()
  const data = xmlparser(XMLString);
  const items = data?.items?.item ?? [];
  return Array.isArray(items) ? items : [items]
}


const GamesPage = async ({ params }: { params: { game: string } }) => {
  const searchData = await getSearch(params.game);
  const items= searchCleaner(searchData, params.game);
  const games= await getGames(items);
  const cleanGames = games.map(fullGameParser);

  return (
      <Container size={{ lg:"3", md:"3", sm:"1", xs:"1"}} >
        <GamesTable games={cleanGames} />
      </Container>
  );
};

export default GamesPage;
