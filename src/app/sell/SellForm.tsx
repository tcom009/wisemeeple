"use client";

import { Flex, Grid, Text, Container } from "@radix-ui/themes";
import GamesTable from "@/core/components/GamesTable";
import BGGUserForm from "@/core/components/SearchBox";
import { useState } from "react";
import { ParsedThing } from "@/core/models/models";

type StateI = {
  games: ParsedThing[] | [];
};

const initialState: StateI = {
  games: [],
};

export default function SellForm() {
  const [state, setState] = useState<StateI>(initialState);
  const { games } = state;
  return (
    <>
      <BGGUserForm />
      {games.length !== 0 && <GamesTable games={games} />}
    </>
  );
}
