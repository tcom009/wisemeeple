import SellFormWizard from "./SellFormWizard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Container, Flex, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function SellPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/login");
  }

  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("profile_id", data.user.id)
    .single();

  if (profile.data?.profile_id) {
    return (
      <Container size={{ lg: "3", md: "3", sm: "3", xs: "1" }}>
        {" "}
        <SellFormWizard />
      </Container>
    );
  }
  return (
    <Container size={{ lg: "3", md: "3", sm: "3", xs: "1" }}>
      <Flex
        width={"100%"}
        justify={"center"}
        mt={"9"}
        direction={"column"}
        gap={"3"}
      >
        <Text weight={"bold"} align={"center"}>
          Antes de comenzar a publicar juegos, crea tu perfil.
        </Text>
        <Text align={"center"}>
          Es la clave para que los compradores interesados se pongan en contacto
          contigo.
        </Text>
        <Text align={"center"}>¡Hazlo ahora y comienza a vender!</Text>
        <Flex align={"center"} justify={"center"} width={"100%"}>
            <Link href={`/profile/${data.user?.id}`} className="no-underline">
          <Button>
              Crear perfil
          </Button>
            </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
