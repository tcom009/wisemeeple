"use client";

import {
  Avatar,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { ExternalLinkIcon, Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import GameDialog from "./GameDialog";
interface GameCardI {
  id: string;
  name: string;
  yearpublished: string;
  image?: string;
  description?: string;
  isLast?: boolean;
}

const GameCard = ({
  id,
  name,
  yearpublished,
  image,
  description,
  isLast,
}: GameCardI) => {

  return (
    <Flex direction={"column"} gap={"4"}>
      <Flex align={"center"} gap={"3"}>
        <Avatar src={image} fallback={name[0]} size={"5"} />
        <Flex direction={"column"}>
          <Flex direction={"row"} gap={"1"}>
            <Text as={"span"} weight={"bold"}>
              <div className="text-overflow-clip">
                <GameDialog
                  id={id}
                  name={name}
                  yearpublished={yearpublished}
                  image={image}
                  description={description}
                />
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
  );
};
export default GameCard;
