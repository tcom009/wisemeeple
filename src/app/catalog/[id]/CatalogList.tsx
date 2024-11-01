"use client";
import { Card } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import { useState } from "react";
import ListView from "@/core/components/gamesList/ListView";
import GridView from "@/core/components/gamesList/GridView";
import ViewControls,{ View } from "@/core/components/gamesList/ViewControls";
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
