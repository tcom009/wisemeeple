import { config } from "@config";
import { xmlparser } from "@/core/utils/xmlparser";
import { Container } from "@radix-ui/themes";
import GamesTable from "@/core/components/GamesTable";
import { searchCleaner } from "@/core/utils/searchFormatter";
import { CleanCollectionItem } from "@/core/models/models";
import { fullGameParser as cleanSingleGame } from "@/core/utils/fullGameParser";

async function getSearch(query:string){
  const response = await fetch(`${config.BGG_SEARCH_BOARDGAMES}${query}`).then(
    (res) => res
  );
  const XMLString = await response.text();
  const data = xmlparser(XMLString);
  return data
}

// const cleanSingleGame = (item: any) => {
//   const cleanItem = {
//     id:item?.attr.id,
//     name:  Array.isArray(item.name) ? item?.name[0]?.attr.value : item?.name?.attr.value,
//     yearpublished: item?.yearpublished?.attr?.value ?? "",
//     image: item.image?.text ?? "",
//     description: item.description?.text ?? "",
//   };
//   return cleanItem;
// }

const getGames = async (games: CleanCollectionItem[]|[]) => {
  const gamesId= games.map (game => game.id);
  const stringId = gamesId.join(",");
  const response = await fetch(`${config.BGG_GET_GAME}${stringId}`);
  const XMLString = await response.text()
  const data = xmlparser(XMLString);
  const items = data?.items?.item ?? [];
  return Array.isArray(items) ? items : items
}


const GamesPage = async ({ params }: { params: { game: string } }) => {
  const searchData = await getSearch(params.game);
  const items= searchCleaner(searchData);
  const games= await getGames(items);
  const cleanGames = games.map(cleanSingleGame);

  return (
      <Container size={{ lg:"3", md:"3", sm:"1", xs:"1"}} >
        <GamesTable games={cleanGames} />
      </Container>
  );
};

export default GamesPage;
