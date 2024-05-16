"use client";
import { useClickOutside } from "core/hooks/useClickOutside";
import { MagnifyingGlassIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Card, Flex, Text, Badge } from "@radix-ui/themes";
import { capitalize } from "core/lib/textUtils";
import { useKeyPress } from "@/core/hooks/useKeyPress";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "@/core/reducers/searchListReducer";

type GameI = {
  id: string;
  name: string;
};

interface PropsI {
  filteredGames: GameI[];
  closeOnClickOutside: () => void;
  handleSubmit: (data?: any) => void;
}

export default function SearchList({
  filteredGames,
  closeOnClickOutside,
  handleSubmit,
}: PropsI) {
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterPressed = useKeyPress("Enter");
  const ref = useClickOutside(closeOnClickOutside);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedIndex } = state;
  const shortList = filteredGames.slice(0, 9);

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "arrowUp", payload: shortList });
    }
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown", payload: shortList });
    }
    if (enterPressed) {
      console.log("press");
      handleSubmit(filteredGames[selectedIndex].id);
    }
  }, [enterPressed, arrowUpPressed, arrowDownPressed]);

  return (
    <Card ref={ref}>
      <Flex direction={"column"}>
        {shortList.map((game: { id: string; name: string }, index: number) => (
          <LinkItem
            key={game.id}
            game={game}
            index={index}
            selectedIndex={selectedIndex}
            handleSubmit={handleSubmit}
          />
        ))}
      </Flex>
    </Card>
  );
}

interface ListItemProps {
  game: GameI;
  selectedIndex: number;
  handleSubmit: (id?: string) => void;
  index: number;
}
const LinkItem = ({
  game,
  selectedIndex,
  handleSubmit,
  index,
}: ListItemProps) => {
  return (
    <Flex
      justify={"between"}
      key={game.id}
      className={`clickable search-list ${
        selectedIndex === index ? "isSelected" : ""
      }`}
      onClick={() => handleSubmit(game.id)}
    >
      <Text key={game.id} weight={"bold"} as={"div"}>
        {" "}
        <MagnifyingGlassIcon/>
        
        {capitalize(game.name)}
      </Text>
      {selectedIndex === index && (
        <Badge variant={"surface"}>
          <PaperPlaneIcon />
        </Badge>
      )}
    </Flex>
  );
};
