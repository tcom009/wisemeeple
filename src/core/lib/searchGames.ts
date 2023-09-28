
import { config } from "@config";
import { xmlparser } from "@/core/lib/xmlparser";

export async function searchGames(query:string){
    const response = await fetch(`${config.BGG_SEARCH_BOARDGAMES}${query}`).then(
      (res) => res
    );
    const XMLString = await response.text();
    const data = xmlparser(XMLString);
    return data
  }
  