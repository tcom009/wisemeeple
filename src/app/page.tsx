import { Container, Flex, Heading, Text, Button, Grid } from "@radix-ui/themes";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import GamesForSale from "@/core/components/sellers/SellersList";
import RecentGames from "@/core/components/recentGames/RecentGames";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wise Meeple",
  description: "¡Vende tus juegos de mesa más facil!",
  openGraph: {
    type: 'website',
    url: 'https://wisemeeple.com',
    title: 'Wise Meeple',
    description: '¡Vende tus juegos de mesa más facil!',
  }
};
export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <>
      <Container size={{ lg: "2", md: "2", sm: "1", xs: "1" }} mt={"9"}>
        <Flex direction={"column"}>
          <Flex justify={"center"} direction={"column"} gap={"3"}>
            <Heading
              align={"center"}
              size={{ lg: "9", md: "9", sm: "7", xs: "5" }}
              as={"h1"}
            >
              {" "}
              ¡Vende tus juegos de mesa más facil!
            </Heading>
            <Text
              as={"p"}
              color={"gray"}
              align={"center"}
              weight={"bold"}
              size={{ lg: "5", md: "5", sm: "3", xs: "1" }}
            >
              Crea tu catálogo y compartelo con tus amigos y grupos de juegos de
              mesa 🎲
            </Text>
            <Flex align={"center"} justify={"center"} width={"100%"}>
              <Link href={data?.user ? "/sell" : "/login"}>
                <Button size={"4"}>Comenzar</Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <RecentGames  />
      <GamesForSale />
      <Flex height={"9"} width={"100%"} mt={"5"}>
      <Text
          align={"center"}
          color={"gray"}
          size={"2"}
          weight={"bold"}
          className="footer-text"
          >
          {" "}
          © 2024 WiseMeeple. Todos los derechos reservados.
        </Text>
        {/* <Footer /> */}
      </Flex>
    </>
  );
}
