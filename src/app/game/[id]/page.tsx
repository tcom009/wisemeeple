import { createClient } from "@/utils/supabase/server";
import { Avatar, Text, Container, Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import {
  languageDependencyMap,
  languageMap,
  conditionMap,
} from "@/core/data/gameDetails";
import GameCarousel from "./GameCarrousel";
import { formatMoney } from "@/core/lib/formatMoney";
import { formatPhone } from "@/core/lib/formatPhone"; 
import WhatsappLogo from "@/core/components/WhatsappLogo";
import { config } from "@/config";
async function GamePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = createClient();
  const getGame = async () => {
    const { data, error } = await supabase
      .from("user_games")
      .select()
      .eq("id", params.id)
      .single();
    if (error) {
      return null;
    }
    return data;
  };
  const game = await getGame();
  const getUserProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("profile_id", game?.owner_id)
      .single();
    if (error) {
      return null;
    }
    return data;
  };
  const getUserCatalog = async () => {
    const { data, error } = await supabase
      .from("catalog")
      .select()
      .eq("user", game?.owner_id)
      .single();
    if (error) {
      return null;
    }
    return data;
  };

  const userProfile = await getUserProfile();
  const userCatalog = await getUserCatalog();

  if (game === null || userProfile === null) {
    return null;
  }
  return (
    <>
      <Container
        size={{ lg: "3", md: "3", sm: "2", initial: "1" }}
        top={"100%"}
      >
        <Grid columns={"1"} gap={"2"} width={"auto"}>
          <Flex direction={"row"} gap={"3"} align={"center"} justify={"center"}>
            <Avatar
              src={game?.image}
              size={"9"}
              fallback={game?.game_name[0]}
            />
            <Flex direction={"column"}>
              <Text weight={"bold"}>{game?.game_name}</Text>
              <Text weight={"bold"}>{`$${formatMoney(game?.price)}`}</Text>
              <div>
                <Text weight={"bold"} size={"2"}>
                  {" "}
                  Idioma:{" "}
                </Text>
                <Text size={"2"}>{languageMap.get(game?.language)}</Text>
              </div>
              <Text size={"2"}>
                {languageDependencyMap.get(game?.language_dependency)}
              </Text>
              <Text size={"2"}>
                {conditionMap.get(game?.condition)}
                </Text>
                <Text size={"2"}>
                Publicado por:{" "}
                </Text>
              <Text size={"2"}>
                <Link href={`/catalog/${userCatalog?.id}`}>
                  {userProfile?.first_name} {userProfile?.last_name}
                </Link>
              </Text>
              <Flex align={"center"} gap={"2"}>
              <Text size={"2"}>
                  Contactar
              </Text>
                <Link href={`${config.WHATS_APP_LINK}${formatPhone(userProfile?.phone)}`}>
                <WhatsappLogo size={"1em"}/>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Grid columns={"2"}>
            <Flex
              direction={"row"}
              gap={"1"}
              align={"center"}
              justify={"center"}
              mb={"3"}
            >
              {game.observations && (
                <Flex direction={"column"}>
                  <Text weight={"bold"} size={"2"}> Detalles: </Text>
                  <Text size={"2"}>{game.observations}</Text>
                </Flex>
              )}
            </Flex>
          </Grid>
        </Grid>
        <Grid columns={"1"} gap={"2"}>
        <Text weight={"bold"}>Mas Juegos de este vendedor:</Text>
        <GameCarousel userId={userProfile.profile_id} currentGame={game.id} />
        </Grid>
      </Container>
    </>
  );
}

export default GamePage;
