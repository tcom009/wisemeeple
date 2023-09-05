import { config } from "config";
import OpenAI from "openai";
import { xmlparser } from "@/core/utils/xmlparser";
function page() {
  const getGame = async (id: string) => {
    try {
      const response = await fetch(`${config.BGG_GET_GAME}${id}`);
      const XMLString = await response.text();
      const data = xmlparser(XMLString);
      return data;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return <div>page</div>;
}

export default page;
