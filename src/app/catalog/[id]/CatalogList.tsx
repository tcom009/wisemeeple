"use client";
import { Card } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import ListView from "./ListView";
import { useState } from "react";
import GridView from "./GridView";
import ViewControls,{ View } from "./ViewControls";
interface CatalogListProps {
  games: UserGame[];
  userMatchsCatalog: boolean;
}

export default function CatalogList({
  games,
  userMatchsCatalog,
}: CatalogListProps) {
  const [view, setView] = useState<View>(View.GRID);
  return (
    <Card>
      <ViewControls view={view} setView={setView} />
      {view === View.LIST && (
        <ListView games={games} userMatchsCatalog={userMatchsCatalog} />
      )}
      {view === View.GRID && (
        <GridView games={games} userMatchsCatalog={userMatchsCatalog} />
      )}
    </Card>
  );
}
