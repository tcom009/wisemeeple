import { config } from "@config";
import { xmlparser } from "@/core/lib/xmlparser";

export async function searchGames(query: string) {
  const url = `${config.BGG_SEARCH_BOARDGAMES}${query}`;
  try {
    const response = await fetch(url);
    const XMLString = await response.text();
    const data = xmlparser(XMLString);
    return data;
  } catch (error) {
    throw error;
  }
}
