"use client";
import { useClickOutside } from "core/hooks/useClickOutside";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Card, Flex, Text, Badge } from "@radix-ui/themes";
import { capitalize } from "core/lib/textUtils";
import { useKeyPress } from "@/core/hooks/useKeyPress";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "@/core/reducers/searchListReducer";
import { useRouter } from "next/navigation";

type GameI = {
  id: string;
  name: string;
};

interface PropsI {
  filteredGames: GameI[];
  closeOnClickOutside: () => void;
}

export default function SearchList({
  filteredGames,
  closeOnClickOutside,
}: PropsI) {
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterPressed = useKeyPress("Enter");
  const ref = useClickOutside(closeOnClickOutside);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedIndex } = state;
  const shortList = filteredGames.slice(0, 9);
  const router = useRouter();

  const submitSelected = (id: string) => {
    router.push(`/generate/${id}`);
  };

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "arrowUp", payload: shortList });
    }
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown", payload: shortList });
    }
    if (enterPressed) {
      router.push(`/generate/${filteredGames[selectedIndex].id}`);
    }
  }, [enterPressed, arrowUpPressed, arrowDownPressed]);

  return (
    <Card ref={ref}>
      <Flex direction={"column"}>
        {shortList.map((game: { id: string; name: string }, index: number) => (
          <Flex
            justify={"between"}
            key={game.id}
            className={`clickable search-list ${
              selectedIndex === index ? "isSelected" : ""
            }`}
            onClick={() => submitSelected(game.id)}
          >
            <Text key={game.id} weight={"bold"} as={"div"}>
              {" "}
              {capitalize(game.name)}
            </Text>
            {selectedIndex === index && (
              <Badge variant={"surface"}>
                <PaperPlaneIcon />
                <Text weight={"bold"}>
                  {" "}
                  Enter to Generate
                </Text>
              </Badge>
            )}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
