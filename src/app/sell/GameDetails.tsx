"use client";
import { ParsedThing } from "@/core/models/models";
import { config } from "config";
import { useWizard } from "react-use-wizard";
import {
  Avatar,
  Flex,
  Text,
  Button,
  Grid,
} from "@radix-ui/themes";
import Link from "next/link";
import {
  ExternalLinkIcon,
  PersonIcon,
  CalendarIcon,
  Pencil1Icon,
  StopwatchIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import GameDetailsForm from "@/core/components/GameDetailsForm";

interface GameDetailsFormProps {
  selectedGame: ParsedThing;
  isEditing?: boolean;
}

export default function GameDetails({
  selectedGame,
}: GameDetailsFormProps) {
  const { previousStep } = useWizard();
  const {
    id,
    name,
    yearpublished,
    image,
    minplayers,
    maxplayers,
    boardgamedesigner,
    minplaytime,
    maxplaytime,
    minage,
  } = selectedGame;
  return (
    <>
      <Grid columns={"1"} justify={"center"} align={"center"} gap={"2"} mt="5">
        {/* Title */}
        <Flex justify="start" align={"center"} gap={"2"}>
          <Button variant={"outline"} onClick={() => previousStep()}>
            <ArrowLeftIcon />
          </Button>
          <Text weight={"bold"}>2. Agrega el precio y otros detalles de tu juego.</Text>
        </Flex>
        <Flex justify="center">
          <Text weight={"bold"} size="4">
            {name} - {yearpublished}
          </Text>
        </Flex>
        <Flex justify="center" direction={"row"} gap="2">
          <Avatar
            src={image}
            fallback={name[0]}
            size={{ lg: "9", xl: "9", md: "9", sm:"9", initial: "8" }}
          />
          <Flex
            direction={"column"}
            align={"start"}
            justify={"center"}
            gap={"2"}
          >
            <Flex gap={"2"} align={"center"}>
              <Pencil1Icon />
              <Text weight={"bold"}>{boardgamedesigner.join(", ")}</Text>
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <StopwatchIcon />
              <Text weight={"bold"}>
                {maxplaytime === minplaytime
                  ? maxplaytime
                  : `${minplaytime} - ${maxplaytime}`}
              </Text>
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <PersonIcon />
              <Text weight={"bold"}>
                {minplayers ?? ""}-{maxplayers ?? ""}
              </Text>
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <CalendarIcon />
              <Text weight={"bold"}>{minage ? `+${minage}` : ""}</Text>
            </Flex>
            <Flex gap={"2"}>
              <Link href={`${config.BGG_GAME_URL}/${id}`} target="_blank">
                <Text weight={"bold"}>Link BBG</Text>
                <ExternalLinkIcon />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Grid>
      <GameDetailsForm gameDefaultValues={selectedGame} onClickBack={previousStep}/>
    </>
  );
}
