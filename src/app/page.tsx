import SearchBox from "@/core/components/SearchBox";
import { Container, Flex, Heading, Text, Badge } from "@radix-ui/themes";


export default function Home() {
  return (
    <Container size={{lg:"2", md:"2", sm:"1", xs:"1"}} mt={"9"}>
      <Flex direction={"column"}>
      <Flex justify={"center"} direction={"column"} gap={"3"}>
        <Heading
          align={"center"}
          size={{ lg: "9", md: "9", sm: "7", xs: "5" }}
          as={"h1"}
        >
          {" "}
          Generate AI based recomendations of boardgames!
        </Heading>
        <Text
          as={"p"}
          color={"gray"}
          align={"center"}
          weight={"bold"}
          size={{ lg: "5", md: "5", sm: "3", xs: "1" }}
        >
          First, let&apos;s search a boardgame:
        </Text>
      </Flex>
      <SearchBox />
      </Flex>
    </Container>
  );
}
