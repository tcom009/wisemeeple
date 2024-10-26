import GameDetailsForm from "@/core/components/GameDetailsForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Container, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
const EditGamePage = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("user_games")
    .select()
    .eq("id", params.id);
  if (error) {
    return null;
  }
  const game = data[0];
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
        />
        </Flex>
      <GameDetailsForm formDefaultValues={data[0]} gameId={params.id} isEditing />
    </Container>
  );
};

export default EditGamePage;
