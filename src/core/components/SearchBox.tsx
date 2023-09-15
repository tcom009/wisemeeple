"use client";
import { Flex, TextField, Text, IconButton, Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSearch } from "core/hooks/useSearch";
import games from "@/core/data/games.json";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";
import SearchList from "core/components/SearchList";
import { useRouter } from "next/navigation";

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

const predicate = (
  game: {
    name: string;
    id: string;
  },
  query: string
) => game.name.includes(query.toLowerCase());

const data = games.map((game: { id: string; name: string }) => {
  return {
    id: game.id,
    name: game.name.toLowerCase(),
  };
});

export default function BGGUserForm() {
  const router = useRouter();
  const [state, setState] = useState<StateI>(initalState);
  const { error, isOpen } = state;
  const [filteredGames, query, handleChange, setQuery] = useSearch(
    data,
    predicate,
    { debounce: 200 }
  );

  const onSubmit = () =>
    !query
      ? setState({ ...state, error: true })
      : router.push(`/search/${query}`);

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
      setState((prevState) => ({ ...prevState, isOpen: true }));
    }
    if (query.length !== 0) {
      setState((prevState) => ({ ...prevState, error: false }));
    }
  }, [query]);

  return (
    <>
      <TextField.Root size={"3"} mt={"5"}>
        <TextField.Slot>
          <Flex align="center">
            <IconButton size="3" variant={"ghost"} onClick={onSubmit}>
              <MagnifyingGlassIcon width={"20"} height={"20"} />
            </IconButton>
          </Flex>
        </TextField.Slot>
        <TextField.Input
          placeholder="Wingspan... "
          type={"text"}
          name="query"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          autoComplete="off"
          autoFocus
          required
        />
        {query.length !== 0 && (
          <TextField.Slot pr="3">
            <IconButton size="2" variant="ghost" onClick={() => setQuery("")}>
              <Cross2Icon height="16" width="16" />
            </IconButton>
          </TextField.Slot>
        )}
      </TextField.Root>
      {filteredGames.length !== 0 && isOpen && (
        <SearchList
          filteredGames={filteredGames}
          closeOnClickOutside={closeOnClickOutside}
        />
      )}

      {error && (
        <Text as={"span"} color={"crimson"} size={"2"} mt={"2"}>
          Please enter a boardgame name
        </Text>
      )}
      {(filteredGames.length === 0 || !isOpen && query.length !== 0)&& (
        <Flex align={"center"} justify={"center"} mt={"3"}>

          <Button size={"2"} onClick={onSubmit}>Search Game</Button>
        </Flex>
      )}
    </>
  );
}
