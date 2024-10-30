import GameDetailsForm from "@/core/components/GameDetailsForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Container, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
const EditGamePage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const { data: game, error } = await supabase
    .from("user_games")
    .select()
    .eq("id", params.id)
    .single()
  if (!userData?.user) {
    redirect("/login");
  }
  if (game.owner_id !== userData?.user.id){
    redirect('/');
  }
  if (error) {
    return null;
  }
  return (
    <Container size={{ lg: "3", md: "3", sm: "3", xs: "1" }}>
      <Flex direction={"column"} gap={"3"}>
      <Text weight={"bold"}>
         Editando {game.game_name}
        </Text>
      <Image
        src={game.image}
        alt={game.game_name}
        width={100}   
        height={100}
        style={{ borderRadius: "1em" }}
        objectFit="contain"
        />
        </Flex>
      <GameDetailsForm formDefaultValues={game} gameId={params.id} isEditing />
    </Container>
  );
};
export default EditGamePage;
