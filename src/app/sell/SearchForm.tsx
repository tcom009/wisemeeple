"use client";
import { Text } from "@radix-ui/themes";
import { useState } from "react";
import SearchBox from "@/core/components/SearchBox";
import { searchGames } from "@/core/lib/searchGames";
import { searchCleaner } from "@/core/lib/searchCleaner";
import { fullGameParser } from "@/core/lib/fullGameParser";
import { getMultipleGames } from "@/core/lib/getMultipleGames";
import { PageStatus } from "@/core/models/models";

interface StateI {
  isOpen: boolean;
  error: boolean;
  suggestedQuery: {
    id: string;
    name: string;
  };
  query: string;
}

const initalState: StateI = {
  isOpen: false,
  error: false,
  query: "",
  suggestedQuery: {
    id: "",
    name: "",
  },
};
interface SearchFormI {
  setPageStatus: (status: PageStatus) => void;
  setGames: (games: any) => void;
}
// TODO:  refactor onKeyPress for searchbox
export default function SearchForm({ setGames, setPageStatus }: SearchFormI) {
  const [state, setState] = useState<StateI>(initalState);
  const { error, isOpen, query } = state;
  
  const onSubmit = async () => {
    if (query) {
      setPageStatus(PageStatus.LOADING);
      const data = await searchGames(query);
      const cleanData = searchCleaner(data, query);
      const games = await getMultipleGames(cleanData);
      const cleanGames = games.map(fullGameParser);
      setGames(cleanGames);
      setPageStatus(PageStatus.SUCCESS);
      if (data?.items === undefined) {
        setPageStatus(PageStatus.ERROR);
      }
    } else {
      setState({ ...state, error: true });
    }
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      query: event.target.value,
    }));
  };

  const setQuery = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      query: value,
    }));
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && !isOpen) {
      onSubmit();
    }
  };

  return (
    <>
      <SearchBox
        onSubmit={onSubmit}
        handleChange={handleOnChange}
        handleKeyPress={handleKeyPress}
        setQuery={setQuery}
        query={query}
      />
      {error && (
        <Text as={"span"} color={"crimson"} size={"2"} mt={"2"}>
          Por favor, ingresa el nombre de un juego
        </Text>
      )}
    </>
  );
}
