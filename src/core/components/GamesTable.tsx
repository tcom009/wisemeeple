"use client";

import { ParsedThing } from "@/core/models/models";
import GameCard from "@/core/components/GameCard";
import { Card, Flex, ScrollArea, Button, Text, Grid } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { TriangleLeftIcon, TriangleRightIcon } from "@radix-ui/react-icons";

interface GamesTableProps {
  games: ParsedThing[] | [];
}

interface StateI {
  currentPage: number;
  totalPages: number;
  showingGames: ParsedThing[] | [];
  elementsPerPage: number;
}

const scrollHeight = { height: "75vh" };

const GamesTable = ({ games }: GamesTableProps) => {
  const initialState = {
    currentPage: 1,
    totalPages: games.length <= 10 ? 1 : Math.ceil(games.length / 10),
    elementsPerPage: 10,
    showingGames: games.length <= 10 ? games : games.slice(0, 10),
  };
  const [state, setState] = useState<StateI>(initialState);
  const { currentPage, totalPages, showingGames, elementsPerPage } = state;

  useEffect(() => {
    const showingGames = games.slice(
      currentPage * elementsPerPage - elementsPerPage,
      currentPage * elementsPerPage
    );
    setState((prevState) => ({ ...prevState, totalPages, showingGames }));
  }, [currentPage, elementsPerPage, games, totalPages]);

  const nextPage = () => {
    setState({ ...state, currentPage: currentPage + 1 });
  };

  const previousPage = () => {
    setState({ ...state, currentPage: currentPage - 1 });
  };

  return (
    <Card>
      <Grid columns={"2"} align={"center"}>
        <Flex align={"center"} mb={"3"} height={"9"}>
          <Text weight={"bold"} size={"4"} align={"left"}>
            Now, choose a game from the results:
          </Text>
        </Flex>
      { totalPages > 1 &&
        <Flex
          gap="3"
          direction={"row"}
          align={"center"}
          justify={"end"}
          mb={"2"}
          mr={{ initial: "0", md: "4" }}
        >
          <Text weight={"bold"} >
            Page {currentPage} of {totalPages}
          </Text>

          <Button onClick={previousPage} disabled={currentPage === 1}>
            <TriangleLeftIcon />
          </Button>

          <Button onClick={nextPage} disabled={currentPage === totalPages}>
            <TriangleRightIcon />
          </Button>
        </Flex>}
      </Grid>
      <ScrollArea
        type="always"
        scrollbars="vertical"
        style={scrollHeight}
        size={{ initial: "1", lg: "2" }}
      >
        {showingGames.length !== 0 ? (
          <Flex direction={"column"}>
            {showingGames.map((game: ParsedThing, index: number) => (
              <GameCard
                key={game?.id}
                isLast={index === showingGames.length - 1}
                game={game}
              />
            ))}
          </Flex>
        ) : (
          <div> Colection has no games or user doesn&apos;t exist</div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default GamesTable;
