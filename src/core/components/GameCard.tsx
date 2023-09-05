import { Box, Avatar, Flex, Separator, Text } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface GameCardI {
  id: string;
  name: string;
  yearpublished: string;
  image?: string;
  isLast?: boolean;
}



const GameCard = ({ id, name, yearpublished, image, isLast }: GameCardI) => {
  
  const trimText = (text: string) => {
    if (text.length > 30) {
      return text.substring(0, 30) + "...";
    }
    return text;
  }

  return(
  <Flex direction={"column"} gap={"4"}>
    <Flex align={"center"} gap={"3"}>
      <Avatar src={image} fallback={name[0]} size={"5"} />
      <Flex direction={"column"}>
        <Flex direction={"row"} gap={"1"}>
          <Text as={"span"} weight={"bold"}>
            <div className="text-overflow-clip">
            {trimText(name)}{" "}
            </div>
          </Text>
          <Link
            href={`https://boardgamegeek.com/boardgame/${id}`}
            target="_blank"
          >
            <ExternalLinkIcon />
          </Link>
        </Flex>
      <Text>{yearpublished}</Text>
      </Flex>
    </Flex>
    {!isLast && <Separator orientation="horizontal" size={"4"} mb={"4"} />}
  </Flex>
)};
export default GameCard;
