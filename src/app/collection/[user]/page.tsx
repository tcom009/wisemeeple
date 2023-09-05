import { config } from "@config";
import { xmlparser } from "@/core/utils/xmlparser";
import { collectionCleaner } from "@/core/utils/collectionFormatter";
import { Container } from "@radix-ui/themes";
import GamesTable from "@/core/components/GamesTable";


async function getCollection(query: string) {
  const response = await fetch(`${config.BGG_GET_COLLECTION}${query}`)
  const XMLString = await response.text();
  const data = xmlparser(XMLString);
  if (response.status === 200 && data.errors) {
    return { message: "User not found" };
  } else if (response.status === 202) {
    let count = 0
    let data
    const limit = 10
    while (count < limit) {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      await sleep(1000);
      const response = await fetch(`${config.BGG_GET_COLLECTION}${query}`);
      const XMLString = await response.text();
      data = xmlparser(XMLString);
      count++
    }
    return data
  } else if (response.status === 200 && data.items) {
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
