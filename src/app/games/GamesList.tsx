"use client"
import { Flex, Text, Container, Card } from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import Paginator from "@/core/components/Paginator";
import ViewControls, { View } from "@/core/components/gamesList/ViewControls";
import ListView from "@/core/components/gamesList/ListView";
import GridView from "@/core/components/gamesList/GridView";
import { useViewControls } from "@/core/components/gamesList/useViewControls";
interface Props {
  games?: UserGame[] | [];
  count: number;
  page: number;
}

const GamesList = ({ games, count = 0, page: currentPage }: Props) => {
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
export default GamesList;
