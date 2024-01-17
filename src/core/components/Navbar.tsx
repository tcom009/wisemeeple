import { Flex, Grid, Text, Badge, Box } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import GitHubBadge from "./GitHubBadge";
export default function Navbar() {
  return (
    <Grid
      position={"fixed"}
      top={"0"}
      left={"0"}
      className="black-background z-index-1"
      width={"100%"}
      columns={{ lg: "5", xl: "5", md: "5", sm: "3", initial: "3" }}
      height={"9"}
    >
      <Link href={"/"} as={"/"} className="no-underline">
        <Flex
          width={"100%"}
          height={"100%"}
          justify={"center"}
          mt={{ sm: "2", xs: "2", initial: "2" }}
          mr={{ sm: "2", xs: "2", initial: "2" }}
          align={"center"}
          ml={{ xl: "9", lg: "7", md: "5", sm: "5", xs: "5", initial: "3" }}
          gap={"2"}
        >
          <Image src={logo} width={30} height={30} alt="WiseMeeple" />
          <Text
            align={"center"}
            weight={"bold"}
            size={{ lg: "5", md: "5", sm: "5", xs: "3" }}
          >
            WiseMeeple
          </Text>
        </Flex>
      </Link>
      <Flex align={"center"} ml={{ sm: "5", xs: "5", initial: "5" }}>
        <Box>
          <Badge color={"yellow"}>
            <Text weight={"bold"} size={{ lg: "3", md: "3", sm: "1", xs: "1" }}>
              Last Update: Jan, 17th, 2024
            </Text>
          </Badge>
        </Box>
      </Flex>
      <Box></Box>
      <Box></Box>

      <Flex align={"center"} ml={{ sm: "5", xs: "5", initial: "5" }}>
        <GitHubBadge />
      </Flex>
    </Grid>
  );
}
