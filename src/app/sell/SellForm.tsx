"use client";

import GamesTable from "@/core/components/GamesTable";
import SearchForm from "./SearchForm";
import { useState } from "react";
import { ParsedThing } from "@/core/models/models";
import { Container, Box, Flex, Grid } from "@radix-ui/themes";

type StateI = {
  games: ParsedThing[] | [];
};

const initialState: StateI = {
  games: [],
};

export default function SellForm() {
  const [state, setState] = useState<StateI>(initialState);
  const { games } = state;
  const setGames = (games: any) => {
    setState((prevState) => ({ ...prevState, games }));
  };
  return (
    
      <Grid columns={"2"} width={"100%"}>
        <Flex width={"100%"}>
          <Flex width={"100%"} direction={"column"} grow={"1"}>
            <SearchForm setGames={setGames} />
            <Flex width={"100%"} justify={"center"} mt={"2"}>
              {games.length !== 0 ? (
                // <Flex position ={"absolute"}>
                <GamesTable games={games} />
              ) : (
                <Flex> No Games </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex>aqui va el form</Flex>
      </Grid>
    
  );
}
