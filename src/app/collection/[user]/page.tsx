import { config } from "@config";
import { xmlparser } from "@/core/utils/xmlparser";
import { collectionCleaner } from "@/core/utils/collectionFormatter";
import { Container } from "@radix-ui/themes";
import GamesTable from "@/core/components/GamesTable";


async function getCollection(query: string) {
  const url = `${config.BGG_GET_COLLECTION}${query}`
  const response = await fetch(url)
  const XMLString = await response.text();
  const data = xmlparser(XMLString);
  if (response.status === 200 && data.errors) {
    return { message: 'error'};
  } else if (response.status === 202) {
      console.log(response.status)
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      await sleep(7000);
      return getCollection(query);
  } else if (response.status === 200 && data.items) {
    console.log(data)
    return data;
  }
}

const GamesPage = async ({ params }: { params: { user: string } }) => {
  const  data = await getCollection(params.user);
  const items= data?.items?.item ? collectionCleaner(data) : [];
    return (
      <Container size={{ lg:"3", md:"3", sm:"1", xs:"1"}} >
        <GamesTable games={items} />
      </Container>
    );
};

export default GamesPage;
