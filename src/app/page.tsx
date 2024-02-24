import { Container, Flex, Heading, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {data} = await supabase.auth.getUser();
  return (
    <Container size={{ lg: "2", md: "2", sm: "1", xs: "1" }} mt={"9"}>
      <Flex direction={"column"}>
        <Flex justify={"center"} direction={"column"} gap={"3"}>
          <Heading
            align={"center"}
            size={{ lg: "9", md: "9", sm: "7", xs: "5" }}
            as={"h1"}
          >
            {" "}
            ¡Vende tus boardgames gratis!
          </Heading>
          <Text
            as={"p"}
            color={"gray"}
            align={"center"}
            weight={"bold"}
            size={{ lg: "5", md: "5", sm: "3", xs: "1" }}
          >
            Crea tu catalogo de boardgames y gana dinero
          </Text>
          <Flex align={"center"} justify={"center"} width={"100%"}> 
          <Link href={data?.user ? "/sell" : "/login"}>
            <Button size={"4"}>Comenzar</Button>
          </Link>
            </Flex>  
        </Flex>
      </Flex>
    </Container>
  );
}
