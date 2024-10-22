"use client";
import { Text, Flex, Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSearch } from "@/core/hooks/useSearch";
import SearchList from "@/core/components/SearchList";
import SearchBox from "@/core/components/SearchBox";
import { predicate, gamesList } from "@/core/lib/predicate";
import getSingleGame from "@/core/lib/getGame";
import { searchGames } from "@/core/lib/searchGames";
import { searchCleaner } from "@/core/lib/searchCleaner";
import { fullGameParser } from "@/core/lib/fullGameParser";
import { getMultipleGames } from "@/core/lib/getMultipleGames";

interface StateI {
  isOpen: boolean;
  error: boolean;
  suggestedQuery: {
    id: string;
    name: string;
  };
}

const initalState: StateI = {
  isOpen: false,
  error: false,
  suggestedQuery: {
    id: "",
    name: "",
  },
};
interface SearchFormI {
  setGames: (games: any) => void;
}
// TODO:  refactor onKeyPress for searchbox
export default function SearchForm({ setGames }: SearchFormI) {
  const [state, setState] = useState<StateI>(initalState);
  const { error, isOpen } = state;
  const [filteredGames, query, handleChange, setQuery] = useSearch(
    gamesList,
    predicate,
    { debounce: 200 }
  );

  const onSubmit = async () => {
    if (query) {
      const data = await searchGames(query);
      const cleanData = searchCleaner(data, query);
      const games = await getMultipleGames(cleanData);
      const cleanGames = games.map(fullGameParser);
      setGames(cleanGames);
    } else {
      setState({ ...state, error: true });
    }
  };

  const onListSubmit = async (id: string) => {
    setState({ ...state, isOpen: false });
    const game = await getSingleGame(id);
    const parsedGame = await fullGameParser(game);
    setGames([parsedGame]);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && !isOpen) {
      onSubmit();
    }
    if (event.key === "Escape") {
      setState({ ...state, isOpen: false });
    }
  };

  const closeOnClickOutside = () => setState({ ...state, isOpen: false });

  useEffect(() => {
    if (query.length !== 0) {
      setState((prevState) => ({ ...prevState, isOpen: true, error: false }));
    }
    if (filteredGames.length === 0) {
      setState((prevState) => ({ ...prevState, isOpen: false }));
    }
  }, [query, filteredGames]);

  return (
    <>
      <SearchBox
        onSubmit={onSubmit}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        setQuery={setQuery}
        query={query}
      />
      <Flex position={"relative"}>
        {filteredGames.length !== 0 && isOpen && (
          <Flex
            position={"absolute"}
            align={"center"}
            justify={"center"}
            className="z-index-full"
            width={"100%"}
            top={"100%"}
          >
            <Box width={"100%"}>
              <SearchList
                filteredGames={filteredGames}
                closeOnClickOutside={closeOnClickOutside}
                handleSubmit={onListSubmit}
              />
            </Box>
          </Flex>
        )}
      </Flex>

      {error && (
        <Text as={"span"} color={"crimson"} size={"2"} mt={"2"}>
          Please enter a boardgame name
        </Text>
      )}
    </>
    //</Flex>
    // </Flex>
  );
}
