import { Flex, Button } from "@radix-ui/themes";
import { Component2Icon, RowsIcon } from "@radix-ui/react-icons";

export enum View {
    LIST = "list",
    GRID = "grid",
  }

  interface Props {
      view: View
      setView: (view: View) => void
  }
const ViewControls = ({view, setView}:Props) =>(
    <Flex width={"100%"} justify={"end"} align={"center"} gap={"2"}>
    <Button
      title="Vista de listado"
      disabled={view === View.LIST && true}
      variant = "soft"
      onClick={() =>setView(View.LIST)}
    >
      <RowsIcon />
    </Button>
    <Button
      title="Vista de grilla"
      variant = "soft"
      disabled={view === View.GRID && true }
      onClick={() =>setView(View.GRID)}
    >
      <Component2Icon />
    </Button>
  </Flex>
);

export default ViewControls