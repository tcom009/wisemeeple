"use client";
import { Flex, Text, Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSearch } from "core/hooks/useSearch";
import games from "@/core/data/games.json";
import SearchBox from "@/core/components/SearchBox";
import SearchList from "@/core/components/SearchList";
import { useRouter } from "next/navigation";
import { predicate, gamesList } from "@/core/lib/predicate";

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

export default function SearchForm() {
  const router = useRouter();
  const [state, setState] = useState<StateI>(initalState);
  const { error, isOpen } = state;
  const [filteredGames, query, handleChange, setQuery] = useSearch(
    gamesList,
    predicate,
    { debounce: 200 }
  );

  const onSubmit = () =>
    !query
      ? setState({ ...state, error: true })
      : router.push(`/search/${query}`);

  const handleListSubmit = (id: string) => {
    router.push(`/generate/${id}`);
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && 
        (filteredGames.length === 0 || !isOpen)) {
      console.log('hola');
      onSubmit();
    }
    if (event.key === "Escape") {
      setState({ ...state, isOpen: false });
    }
  };

  const closeOnClickOutside = () => setState({ ...state, isOpen: false });

  useEffect(() => {
    if (query.length !== 0) {
      setState((prevState) => ({ ...prevState, isOpen: true }));
    }
    if (query.length !== 0) {
      setState((prevState) => ({ ...prevState, error: false }));
    }
  }, [query]);

  return (
    <>
      <SearchBox
        onSubmit={onSubmit}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        setQuery={setQuery}
        query={query}
      />
      {filteredGames.length !== 0 && isOpen && (
        <SearchList
          filteredGames={filteredGames}
          closeOnClickOutside={closeOnClickOutside}
          handleSubmit={handleListSubmit}
        />
      )}

      {error && (
        <Text as={"span"} color={"crimson"} size={"2"} mt={"2"}>
          Please enter a boardgame name
        </Text>
      )}
      {(filteredGames.length === 0 || (!isOpen && query.length !== 0)) && (
        <Flex align={"center"} justify={"center"} mt={"3"}>
          <Button size={"2"} onClick={onSubmit}>
            Search Game
          </Button>
        </Flex>
      )}
    </>
  );
}
