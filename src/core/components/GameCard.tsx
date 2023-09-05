"use client";

import { Box, Avatar, Flex, Separator, Text, Dialog, Button } from "@radix-ui/themes";
import { ExternalLinkIcon, Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { config } from "@/config";
import { xmlparser } from "@/core/utils/xmlparser";

interface GameCardI {
  id: string;
  name: string;
  yearpublished: string;
  image?: string;
  isLast?: boolean;
}

const GameCard = ({ id, name, yearpublished, image, isLast }: GameCardI) => {
  const [state, setState] = useState({ description: "", imageFetched: "" });
  const { description, imageFetched } = state;
  const NAME_MAX_LENGTH = 30;
  const DESCRIPTION_MAX_LENGTH = 150;
  const trimText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  const cleanDescription = (text: string) => {
    const newText = text.replace("&#10;", "\n");

    return trimText(newText, DESCRIPTION_MAX_LENGTH);
  };

  useEffect(() => {
    const cleanData = (data: any) => {
      if (!data.items.item) return [];
      const item = data.items.item;
      const cleanItem = {
        imageFetched: item.image?.text ?? "",
        description: item.description?.text ?? "",
      };
      return cleanItem;
    };
    const getGameData = async (id: string) => {
      const url = `${config.BGG_GET_GAME}${id}`;
      const response = await fetch(url);
      const XMLString = await response.text();
      const data = xmlparser(XMLString);
      setState((prevState: any) => ({
        ...prevState,
        ...cleanData(data),
      }));
    };
    getGameData(id);
  }, [id]);

  return (
    <Flex direction={"column"} gap={"4"}>
      <Flex align={"center"} gap={"3"}>
        <Avatar src={image ?? imageFetched} fallback={name[0]} size={"5"} />
        <Flex direction={"column"}>
          <Flex direction={"row"} gap={"1"}>
            <Text as={"span"} weight={"bold"}>
              <div className="text-overflow-clip">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Text>{trimText(name, NAME_MAX_LENGTH)}</Text>
                  </Dialog.Trigger>
                  <Dialog.Content>

                    <Dialog.Title>
                    <Flex align={"center"} gap={"3"} direction={"row"} justify={"between"} > 
                    {name}
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
                      <Avatar
                        src={image ?? imageFetched}
                        fallback={name[0]}
                        size={"9"}
                      />
                    </Flex>
                    <Dialog.Description>
                      {cleanDescription(description)}
                      <Link
                        href={`https://boardgamegeek.com/boardgame/${id}`}
                        target="_blank"
                      >
                        <ExternalLinkIcon />
                      </Link>
                    </Dialog.Description>
                    <Flex direction={"row"} gap={"3"} align={"center"} justify={"center"}>
                    <Button>
                      Get Recommendations
                    </Button>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
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
