"use client";
import { Card, Flex, IconButton } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import { RowsIcon, Component2Icon } from "@radix-ui/react-icons";
import ListView from "./ListView";
import { useState } from "react";
import GridView from "./GridView";
interface CatalogListProps {
  games: UserGame[];
  userMatchsCatalog: boolean;
}
export enum View {
  LIST = "list",
  GRID = "grid",
}
interface State {
  isLoading: boolean;
  view: View;
}

const initialState: State = { isLoading: false, view: View.GRID };
export default function CatalogList({
  games,
  userMatchsCatalog,
}: CatalogListProps) {
  const [state, setState] = useState<State>(initialState);
  const { view } = state;
  return (
    <Card>
      <Flex width={"100%"} justify={"end"} align={"center"} gap={"2"}>
        <IconButton
          title="Vista de listado"
          variant="outline"
          onClick={() =>
            setState((prevState) => ({ ...prevState, view: View.LIST }))
          }
        >
          <RowsIcon />
        </IconButton>
        <IconButton
          title="Vista de grilla"
          variant="outline"
          onClick={() =>
            setState((prevState) => ({ ...prevState, view: View.GRID }))
          }
        >
          <Component2Icon />
        </IconButton>
      </Flex>
      {view === View.LIST && (
        <ListView games={games} userMatchsCatalog={userMatchsCatalog} />
      )}
      {view === View.GRID && (
        <GridView games={games} userMatchsCatalog={userMatchsCatalog} />
      )}
    </Card>
  );
}
