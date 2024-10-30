import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import SmallSpinner from "@/core/components/SmallSpinner";
import { UserGame } from "@/core/models/models";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
  game: UserGame;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const DeleteGameDialog = ({ isOpen, game, setIsOpen }: Props) => {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteGame = async (id: string) => {
    setIsLoading(true);
    const { error } = await supabase.from("user_games").delete().eq("id", id);
    if (error) {
      setIsLoading(false);
      setIsOpen(false);
    }
    setIsOpen(false);
    setInterval(() => setIsLoading(false), 3000);
    router.refresh();
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Content>
        <AlertDialog.Title>Eliminar {game.game_name}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          ¿Estás seguro de eliminar {game.game_name} de tu catálogo?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>

          <Button
            variant="solid"
            color="red"
            onClick={() => deleteGame(game.id)}
            disabled={isLoading}
          >
            <TrashIcon /> {isLoading ? <SmallSpinner /> : "Eliminar"}
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteGameDialog;
