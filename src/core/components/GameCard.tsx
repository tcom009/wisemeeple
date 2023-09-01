import { Card, Avatar, Flex } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface GameCardI {
  id: string;
  name: string;
  yearpublished: string;
  image: string;
  thumbnail: string;
}

const GameCard = ({ id, name, yearpublished, image, thumbnail }: GameCardI) => (
  <Card variant="surface">
    <Flex gap="3" direction={"column"}>
      <Avatar src={image} fallback={name[0]} size={"9"} />
      <h1> {name} </h1>
      <h2> {yearpublished} </h2>
      <Link href={`https://boardgamegeek.com/boardgame/${id}`} target="_blank">
        <ExternalLinkIcon />
      </Link>
    </Flex>
  </Card>
);
export default GameCard;
