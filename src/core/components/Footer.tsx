import { Grid, Text, Flex } from "@radix-ui/themes";

export default function Footer() {
  return (
    <footer>
      <Flex
        // position={"fixed"}
        // top={"50%"}
        
        className="black-background full-height"
        width={"100%"}
        height={"100%"}
        //columns={{ lg: "3", xl: "3", md: "3", sm: "3", initial: "2" }}
        //rows={{ lg: "0", xl: "0", md: "0", sm: "0", initial: "1" }}
        >
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
      </Flex>
    </footer>
  );
}
