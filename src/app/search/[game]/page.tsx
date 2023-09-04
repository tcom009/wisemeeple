import { config } from "@config";
import { xmlparser } from "@/core/utils/xmlparser";
import { Container } from "@radix-ui/themes";
import GamesTable from "@/core/components/GamesTable";
import { searchCleaner } from "@/core/utils/searchFormatter";


async function getSearch(query:string){
  const response = await fetch(`${config.BGG_SEARCH_BOARDGAMES}${query}`).then(
    (res) => res
  );
  const XMLString = await response.text();
  const data = xmlparser(XMLString);
  return data
}


const GamesPage = async ({ params }: { params: { game: string } }) => {
  const  data = await getSearch(params.game);
  const items= searchCleaner(data);
  return (
      <Container size={{ lg:"3", md:"3", sm:"1", xs:"1"}} >
        <GamesTable games={items} />
      </Container>
  );
};

export default GamesPage;
