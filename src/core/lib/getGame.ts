import { config } from "config";
import { xmlparser } from "core/lib/xmlparser";


export default async function getSingleGame(id: string) {    
    const response = await fetch(`${config.BGG_GET_GAME}${id}`);
    const XMLString = await response.text()
    const data = xmlparser(XMLString);
    const items = data?.items?.item ?? {};
    return items
}


// const getGames = async (games: CleanCollectionItem[]|[]) => {
//     const gamesId= games.map (game => game.id);
//     const stringId = gamesId.join(",");
//     const response = await fetch(`${config.BGG_GET_GAME}${stringId}`);
//     const XMLString = await response.text()
//     const data = xmlparser(XMLString);
//     const items = data?.items?.item ?? [];
//     return Array.isArray(items) ? items : [items]
//   }
  