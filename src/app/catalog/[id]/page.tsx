import { createClient } from "@/utils/supabase/server";
import { Container, Flex, Text, Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import CatalogList from "./CatalogList";
import ActionButton from "./ActionButton";
import ContactSection from "./ContactSection";
import { Metadata, ResolvingMetadata } from "next";
import { config } from "@/config";
import {getCatalogOwnerAvatar, getCatalogOwner, getMatchUserCatalog, getGames } from "./supabase";
import { routes } from "@/routes";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  const  { data, error} = await getCatalogOwner(id)
  const title = data?.profile
    ? `Catalogo de ${data.profile.first_name} ${data.profile.last_name}`
    : 'Wise Meeple - Catálogo'; 
  return {
    title,
    openGraph: {
      title,
      images:[config.OPEN_GRAPH_IMAGE]
    },
  };
}

export default async function CatalogPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const supabase = createClient();
  const catalogId = params.id
  const user = await supabase.auth.getUser();
  const catalogOwner = (await getCatalogOwner(catalogId)).data?.profile;
  const matchUserCatalog = await getMatchUserCatalog(user.data.user?.id, catalogId);
  const  catalogOwnerAvatar = catalogOwner?.avatar 
    ? await getCatalogOwnerAvatar(catalogOwner?.avatar)
    : null;
  const {data, error}  = await getGames(catalogId);
  if (data?.length !== 0 && data !== null) {
    return (
      <>
        <Container size={{ lg: "3", md: "3", sm: "2", initial: "1" }}>
          <Flex width={"100%"} justify={"between"} my="4" 
            direction={{md:"row", sm:"row", xs:"column", initial:"column"}}>
            <Text size={{xl:"6",lg:"6", md:"4", sm:"6", xs:"5", initial:"5"}} weight={"bold"}>
              {matchUserCatalog
                ? "Mi Catalogo"
                : `Catalogo de ${catalogOwner?.first_name} ${catalogOwner?.last_name}`}
            </Text>
            {!matchUserCatalog && (
              <ContactSection
                firstname={catalogOwner?.first_name ?? ""}
                phone={catalogOwner?.phone ?? "0"}
                city={catalogOwner?.city ?? ""}
                country={catalogOwner?.country ?? ""}
                avatar={catalogOwnerAvatar}
              />
            )}
            {matchUserCatalog && (
              <Flex gap="2">
                <Link className="no-underline" href={routes.SELL_GAME}>
                  <Button size={"1"}>
                    <PlusIcon /> Agregar
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
          <CatalogList games={data} userMatchsCatalog={matchUserCatalog} />
        </Container>
      </>
    );
  }
  if(error){
    <Container>
      <Flex
        width={"100%"}
        justify={"center"}
        mt={"9"}
        direction={"column"}
        gap={"3"}
      >
        Ha ocurrido un error
        <Flex align={"center"} justify={"center"} width={"100%"}>
          <ActionButton matchsCatalog={matchUserCatalog} user={user} />
        </Flex>
      </Flex>
    </Container>
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
