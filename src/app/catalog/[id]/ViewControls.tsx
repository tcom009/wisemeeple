import { Flex, IconButton } from "@radix-ui/themes";
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
    <IconButton
      title="Vista de listado"
      variant={view === View.LIST ? "outline" : "soft"}
      onClick={() =>setView(View.LIST)}
    >
      <RowsIcon />
    </IconButton>
    <IconButton
      title="Vista de grilla"
      variant={view === View.GRID ? "outline" : "soft"}
      onClick={() =>setView(View.GRID)}
    >
      <Component2Icon />
    </IconButton>
  </Flex>
);

export default ViewControls