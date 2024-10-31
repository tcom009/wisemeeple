"use client"
import { Flex, Text, Container, Card, Grid, Button } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import GameCards from "./GameCards";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Paginator from "@/core/components/Paginator";
import ViewControls, { View } from "../catalog/[id]/ViewControls";
import ListView from "../catalog/[id]/ListView";
import GridView from "../catalog/[id]/GridView";
import { useViewControls } from "../catalog/[id]/useViewControls";
interface Props {
  games?: UserGame[] | [];
  count: number;
  page: number;
}

const GamesForSale = ({ games, count = 0, page: currentPage }: Props) => {
  const itemsPerPage = 10
  const {view, setView} = useViewControls();
  if (games){
    return (
      <>
      <Container>
        <Card>
          <ViewControls view={view} setView={setView} /> 
        <Flex width={"100%"} justify={"end"} align={"center"}>
            {`Página ${currentPage} de ${Math.ceil(count/itemsPerPage)}` }
        </Flex>
          <Flex width={"100%"} justify={"center"} align={"center"} >
            <Text weight={"bold"} size={"5"}>
              {" "}
              Juegos Recientes
            </Text>
          </Flex>
           {view === View.LIST && <ListView games={games} isGameList/>}
           {view === View.GRID && <GridView games={games}isGameList/>}   
          <Flex gap={"2"} align={"center"} justify={"center"}>
            <Paginator
              currentPage={currentPage}
              itemsCount={count}
              pageUrl="/games?page"
            />
          </Flex>
        </Card>
      </Container>
    </>
  );
}
};
export default GamesForSale;
