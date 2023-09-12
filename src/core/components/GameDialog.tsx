import React from "react";
import { Flex, Text, Avatar, Dialog, Button } from "@radix-ui/themes";
import {
  Cross2Icon,
  ExternalLinkIcon,
  TimerIcon,
  PersonIcon,
  CalendarIcon
} from "@radix-ui/react-icons";
import { trimText, trimAndClean } from "@/core/lib/textUtils";
import { ParsedThing } from "@/core/models/models";
import { createPrompt } from "core/lib/createPrompt";
import Link from "next/link";

interface Props {
  game: ParsedThing;
}

export default function GameDialog({ game }: Props) {
  const NAME_MAX_LENGTH = 30;
  const DESCRIPTION_MAX_LENGTH = 300;
  const {
    id,
    name,
    yearpublished,
    image,
    description,
    minplayers,
    maxplayers,
    playingtime,
    minplaytime,
    maxplaytime,
    minage,
  } = game;
  const getPrompt = () => console.log(createPrompt(game));
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Text>{trimText(name, NAME_MAX_LENGTH)}</Text>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          <Flex
            align={"center"}
            gap={"3"}
            direction={"row"}
            justify={"between"}
          >
            {name} - {yearpublished}
            <Dialog.Close>
              <Cross2Icon />
            </Dialog.Close>
          </Flex>
        </Dialog.Title>

        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          gap={"5"}
        >
          <Avatar src={image} fallback={name[0]} size={"9"} />
        </Flex>
        <Flex
          direction={"row"}
          align={"center"}
          justify={"center"}
          gap={"4"}
          p={"4"}
        >
          <Flex gap={"2"} align={"center"}>

          <TimerIcon/>{maxplaytime === minplaytime ? "--" : `${minplaytime} - ${maxplaytime}`}
          </Flex>
          <Flex gap={"2"} align={"center"}>

          <PersonIcon/>{minplayers ?? ""}-{maxplayers ?? ""}
          </Flex>
          <Flex gap={"2"} align={"center"}>

          <CalendarIcon/>{`+${minage}` ?? ""}
          </Flex>
        </Flex>
        <Dialog.Description>
          {trimAndClean(description ?? "", DESCRIPTION_MAX_LENGTH)}
          <Link
            href={`https://boardgamegeek.com/boardgame/${id}`}
            target="_blank"
          >
            <ExternalLinkIcon />
          </Link>
        </Dialog.Description>
        <Flex direction={"row"} gap={"3"} align={"center"} justify={"center"}>
          <Link href={`/generate/${id}`}>
          <Button>Get Recommendations</Button>
          </Link>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
