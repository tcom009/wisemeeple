import React from 'react'
import { Flex, Text, Avatar, Link, Dialog, Button } from '@radix-ui/themes'
import { Cross2Icon, ExternalLinkIcon} from '@radix-ui/react-icons'
import { trimText, trimAndClean } from '@/core/utils/textUtils'


interface Props {
    id: string;
    name: string;
    yearpublished: string;
    image?: string;
    description?: string;
  }


export default function GameDialog({id, name, yearpublished, image, description}: Props) {
    const NAME_MAX_LENGTH = 30;
    const DESCRIPTION_MAX_LENGTH = 300;


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
      <Dialog.Description>
        {trimAndClean(description ?? "", DESCRIPTION_MAX_LENGTH)}
        <Link
          href={`https://boardgamegeek.com/boardgame/${id}`}
          target="_blank"
        >
          <ExternalLinkIcon />
        </Link>
      </Dialog.Description>
      <Flex
        direction={"row"}
        gap={"3"}
        align={"center"}
        justify={"center"}
      >
        <Button>Get Recommendations</Button>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>
  )
}
