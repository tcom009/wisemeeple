"use client";

import GamesTable from "@/core/components/GamesTable";
import SearchForm from "./SearchForm";
import { useState } from "react";
import { ParsedThing } from "@/core/models/models";
import { Container, Box, Flex, Grid } from "@radix-ui/themes";
import Spinner from "@/core/components/Spinner";
import { useWizard } from "react-use-wizard";

export enum PageStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  NOT_FOUND = "NOT_FOUND",
}

interface SellFormProps {
  setSelectedGame: (game: ParsedThing) => void;
}
type StateI = {
  games: ParsedThing[] | [];
  pageStatus: PageStatus;
  
};

const initialState: StateI = {
  games: [],
  pageStatus: PageStatus.IDLE,
};

export default function SellForm({ setSelectedGame }: SellFormProps) {
  const [state, setState] = useState<StateI>(initialState);
  const { games, pageStatus } = state;
  const { nextStep } = useWizard();
  const setGames = (games: any) => {
    setState((prevState) => ({ ...prevState, games }));
  };

  const handleSelectGame = (game: ParsedThing) => {
    setSelectedGame(game);
    nextStep();
  };
  const setPageStatus = (status: PageStatus) => {
    setState((prevState) => ({ ...prevState, pageStatus: status }));
  };
  return (
    <>
      <Box mt="4">
        <SearchForm setGames={setGames} setPageStatus={setPageStatus} />
      </Box>
      <Box mt="4">
        {pageStatus === PageStatus.SUCCESS && (
          <GamesTable handleSelectGame={handleSelectGame} games={games} />
        )}{" "}
        {pageStatus === PageStatus.IDLE && (
          <Flex width={"100%"} align={"center"} justify={"center"}>
            {" "}
            Busca un juego{" "}
          </Flex>
        )}
        {pageStatus === PageStatus.ERROR && (
          <Flex width={"100%"} align={"center"} justify={"center"}>
            {" "}
            Se ha producido un error en la busqueda
          </Flex>
        )}
        {pageStatus === PageStatus.LOADING && (
          <Flex width={"100%"} align={"center"} justify={"center"}>
            <Spinner notCentered />
          </Flex>
        )}
        {pageStatus === PageStatus.NOT_FOUND && (
          <Flex width={"100%"} align={"center"} justify={"center"}>
            No se han encontrado juegos
          </Flex>
        )}
      </Box>
    </>
  );
}
