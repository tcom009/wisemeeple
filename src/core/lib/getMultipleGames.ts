import { xmlparser } from "@/core/lib/xmlparser";
import { CleanCollectionItem } from "@/core/models/models";
import { config } from "config";

export const getMultipleGames = async (games: CleanCollectionItem[]|[]) => {
    const gamesId= games.map (game => game.id);
    const stringId = gamesId.join(",");
    const response = await fetch(`${config.BGG_GET_GAME}${stringId}`);
    const XMLString = await response.text()
    const data = xmlparser(XMLString);
    const items = data?.items?.item ?? [];
    return Array.isArray(items) ? items : [items]
  }