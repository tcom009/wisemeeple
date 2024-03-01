import { createClient } from "@/utils/supabase/server";
import {
  Container,
  Card,
  Grid,
  Text,
  Flex,
  Box,
  Avatar,
  Button,
} from "@radix-ui/themes";
import { UserGame } from "@/core/models/models";
import {
  languageMap,
  conditionMap,
  languageDependencyMap,
} from "@/core/data/gameDetails";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { trimText } from "@/core/lib/textUtils";
import CatalogList from "./CatalogList";
export default async function CatalogPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const getUserProfile = async (id: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("profile_id", id)
      .single();
    return { data, error };
  };

  const userProfile = await getUserProfile(params.id);
  const { data } = await supabase
    .from("user_games")
    .select("*")
    .eq("owner_id", params.id);

  if (data?.length !== 0 && data !== undefined && data !== null) {
    return (
      <Container size={{ lg: "3", md: "3", sm: "2", initial: "1" }}>
        <Flex width={"100%"} justify={"between"} my="4">
          <Text size={"6"} weight={"bold"}>
            {user.data.user?.id
              ? "Mi Catalogo"
              : `Catalogo de ${userProfile.data?.first_name} ${userProfile.data?.last_name}`}
          </Text>
          {user.data?.user?.id === params.id && (
            <Link className="no-underline" href={"/sell"}>
              <Button size={"1"}>
                <PlusIcon /> Agregar
              </Button>
            </Link>
          )}
        </Flex>
        <CatalogList
          games={data}
          user_id={user.data?.user?.id}
          param_id={params.id}
        />
      </Container>
    );
  }
  return (
    <Container>
      <Flex
        width={"100%"}
        justify={"center"}
        mt={"9"}
        direction={"column"}
        gap={"3"}
      >
        <Text weight={"bold"} align={"center"}>
          No se han encontrado juegos
        </Text>
        <Flex align={"center"} justify={"center"} width={"100%"}>
          {user.data?.user?.id === params.id ? (
            <Link className="no-underline" href={"/sell"}>
              <Button>
                <PlusIcon /> Agregar nuevo
              </Button>
            </Link>
          ) : (
            <Link
              className="no-underline"
              href={`/catalog/${user.data?.user?.id}`}
            >
              <Button>Ir a mi catalogo</Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
