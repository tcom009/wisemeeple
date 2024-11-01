import { UserGame } from "@/core/models/models";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useState } from "react";
import DeleteGameDialog from "./DeleteGameDialog";
interface State {
  openModal: boolean;
  openMenu: boolean;
}
interface Props {
  game: UserGame;
  menuButton?: React.ReactNode;

}

const initialState = {
  openModal: false,
  openMenu: false,
};
const GameOptionsMenu = ({ game, menuButton }: Props) => {
  const router = useRouter();
  const [state, setState] = useState<State>(initialState);
  const setModalMenu = () =>
    setState((prevState) => ({
      openMenu: !prevState.openMenu,
      openModal: !prevState.openModal,
    }));


  const setOpenMenu = (status: boolean) =>
    setState((prevState) => ({ ...prevState, openMenu: status }));
  const setOpenModal = (status: boolean) =>
    setState((prevState) => ({ ...prevState, openModal: status }));
  const { id } = game;
  const { openMenu, openModal } = state;
  return (
    <>
      <DropdownMenu.Root open={openMenu} onOpenChange={setOpenMenu}>
        <DropdownMenu.Trigger>
          <Button variant="outline" title="Opciones">
            {menuButton ? menuButton : <DotsVerticalIcon />}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onClick={() => router.push(`${routes.EDIT_GAME}${id}`)}
          >
            Editar
          </DropdownMenu.Item>
          <DropdownMenu.Item color="red" onSelect={() => setOpenModal(true)}>
            Eliminar
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DeleteGameDialog
        game={game}
        isOpen={openModal}
        setIsOpen={setModalMenu}
      />
    </>
  );
};

export default GameOptionsMenu;
