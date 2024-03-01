import React from "react";
import { Flex, Text, Avatar, Dialog, Button } from "@radix-ui/themes";
import {
  Cross2Icon,
  ExternalLinkIcon,
  TimerIcon,
  PersonIcon,
  CalendarIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { trimText, trimAndClean } from "@/core/lib/textUtils";
import { ParsedThing } from "@/core/models/models";
import { createPrompt } from "core/lib/createPrompt";
import Link from "next/link";

interface Props {
  game: ParsedThing;
  handleSelectGame?: (game:ParsedThing) => void;
}

export default function GameDialog({ game, handleSelectGame }: Props) {
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
    boardgamedesigner,
    minplaytime,
    maxplaytime,
    minage,
  } = game;
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
          gap={"2"}
        >
          <Avatar src={image} fallback={name[0]} size={"9"} />
          <Flex gap={"2"} align={"center"} justify={"center"}>
            <Pencil1Icon />
            <Text weight={"bold"}>{boardgamedesigner.join(", ")}</Text>
          </Flex>
        </Flex>
        <Flex
          direction={"row"}
          align={"center"}
          justify={"center"}
          gap={"4"}
          my="2"
        >
          <Flex gap={"2"} align={"center"}>
            <TimerIcon />
            {maxplaytime === minplaytime
              ? "--"
              : `${minplaytime} - ${maxplaytime}`}
          </Flex>
          <Flex gap={"2"} align={"center"}>
            <PersonIcon />
            {minplayers ?? ""}-{maxplayers ?? ""}
          </Flex>
          <Flex gap={"2"} align={"center"}>
            <CalendarIcon />
            {`+${minage}` ?? ""}
          </Flex>
        </Flex>
        <Dialog.Description>
          <Flex>
            <Text weight={"bold"}>Descripcion desde boardgamegeek.com:</Text>
          </Flex>
          {trimAndClean(description ?? "", DESCRIPTION_MAX_LENGTH)}
          <Link
            href={`https://boardgamegeek.com/boardgame/${id}`}
            target="_blank"
          >
            <ExternalLinkIcon />
          </Link>
        </Dialog.Description>
        <Flex direction={"row"} gap={"3"} align={"center"} justify={"center"}>
          <Dialog.Close>
            <Button onClick={() => handleSelectGame && handleSelectGame(game)}>
              Seleccionar Juego
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
