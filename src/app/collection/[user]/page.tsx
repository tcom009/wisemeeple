import { config } from "@config";
import { xmlparser } from "@/core/utils/xmlparser";
import { collectionCleaner } from "@/core/utils/collectionFormatter";
import { CleanCollectionItem } from "@/core/models/models";
import GameCard from "@/core/components/GameCard";

async function getCollection(query: string) {
  const response = await fetch(`${config.BGG_GET_COLLECTION}${query}`).then((res)=>res);
  const XMLString = await response.text();
  const data = xmlparser(XMLString);
  if (response.status === 200 && data.errors) {
    return { message: "User not found" };
  } else if (response.status === 202) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(7000);
    return getCollection(query)
    
  } else if (response.status === 200 && data.items) {
    return data;
  }
}

const GamesPage = async ({ params }: { params: { user: string}}) => {
  const data = await getCollection(params.user);
  const items = data?.items?.item ? collectionCleaner(data) : [];
  return (
    <div>
      <h1> Your collection </h1>
      {items.length !== 0 ? (
        <ul>
          {items.map((game: CleanCollectionItem) => (
            <GameCard key={game?.id} {...game} />
          ))}
        </ul>
      ) : (
        <div> Colection has no games or user doesn&apos;t exist</div>
      )}
    </div>
  );
};

export default GamesPage;
