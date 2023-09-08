"use client";

import { Avatar, Flex, Separator, Text } from "@radix-ui/themes";
import { ExternalLinkIcon, Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import GameDialog from "./GameDialog";
import { ParsedThing } from "../models/models";

interface GameCardI {
  game: ParsedThing;
  isLast?: boolean;
}

const GameCard = ({ game, isLast }: GameCardI) => {
  const { id, name, yearpublished, image } = game;
  return (
    <Flex direction={"column"} gap={"4"}>
      <Flex align={"center"} gap={"3"}>
        <Avatar src={image} fallback={name[0]} size={"5"} />
        <Flex direction={"column"}>
          <Flex direction={"row"} gap={"1"}>
            <Text as={"span"} weight={"bold"}>
              <div className="text-overflow-clip">
                <GameDialog
                  game={game}
                />
              </div>
            </Text>
            
          </Flex>
          <Text>{yearpublished}</Text>
        </Flex>
      </Flex>
      {!isLast && <Separator orientation="horizontal" size={"4"} mb={"4"} />}
    </Flex>
  );
};
export default GameCard;
