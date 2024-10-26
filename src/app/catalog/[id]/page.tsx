import { createClient } from "@/utils/supabase/server";
import {
  Container,
  Flex,
  Text,
  Button,
} from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import CatalogList from "./CatalogList";
import ActionButton from "./ActionButton";
import ContactSection from "./ContactSection";
export default async function CatalogPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const getCatalogOwner = async () => {
    const getCatalogUser = await supabase
      .from("catalog")
      .select("user")
      .eq("id", params.id)
      .single();
    const catalogUser = getCatalogUser.data?.user;
    const { data } = await supabase
      .from("profiles")
      .select("first_name, last_name, phone, city, country")
      .eq("profile_id", catalogUser)
      .single();
    return data;
  };
  const catalogOwner = await getCatalogOwner();
  const getMatchUserCatalog = async () => {
    const { data } = await supabase
      .from("catalog")
      .select()
      .eq("user", user.data.user?.id)
      .single();
    if (data?.id.toString() === params.id) {
      return true;
    }
    return false;
  };
  const matchUserCatalog = await getMatchUserCatalog();
  const { data } = await supabase
    .from("user_games")
    .select("*")
    .eq("catalog_id", params.id)
    .order("created_at", {ascending: false});

  if (data?.length !== 0 && data !== undefined && data !== null) {
    return (
      <Container size={{ lg: "3", md: "3", sm: "2", initial: "1" }}>
        <Flex width={"100%"} justify={"between"} my="4">
          <Text size={"6"} weight={"bold"}>
            {matchUserCatalog
              ? "Mi Catalogo"
              : `Catalogo de ${catalogOwner?.first_name} ${catalogOwner?.last_name}`}
          </Text>
          {!matchUserCatalog && (
            <ContactSection
              phone={catalogOwner?.phone}
              city={catalogOwner?.city}
              country={catalogOwner?.country}
            />
          )}
          {matchUserCatalog && (
            <Flex gap="2">
              <Link className="no-underline" href={"/sell"}>
                <Button size={"1"}>
                  <PlusIcon /> Agregar
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>
        
        <CatalogList games={data} userMatchsCatalog={matchUserCatalog} />
      </Container>
    );
  }
  // No games found
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
          {matchUserCatalog
            ? `Tu catalogo se encuentra vacio 😔`
            : `Este catalogo se encuentra vacio 😔`}
        </Text>
        <Flex align={"center"} justify={"center"} width={"100%"}>
          <ActionButton matchsCatalog={matchUserCatalog} user={user} />
        </Flex>
      </Flex>
    </Container>
  );
}
