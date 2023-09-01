import { config } from "@config";
import { xmlparser, collectionCleaner } from "@/core/utils/xmlparser";
import { CleanCollectionItem } from "@/core/models/models";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import GameCard from "@/core/components/GameCard";

async function getCollection(query: string) {
  let response = await fetch(`${config.BGG_GET_COLLECTION}${query}`);
  const XMLString = await response.text();
  const data = xmlparser(XMLString);
  if (response.status === 200 && data.errors) {
    return { message: "User not found" };
  } else if (response.status === 202) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
    getCollection(query);
  } else if (response.status === 200 && data.items) {
    return data;
  }
}

const GamesPage = async () => {
  const data = await getCollection("tcom009");
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


