import { Flex, Grid, Text} from "@radix-ui/themes";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar">
    <Grid width={"100%"} columns={"3"} height={"9"}>
      <Flex width={"100%"} align={"center"} ml={"3"}>
        <Link href={"/"} as={"/"} className="no-underline">
        <Text align={"center"} weight={"bold"} size={{lg:"5", md:"5", sm:"3", xs:"1"}}>BG Recomendations</Text>
        </Link>
      </Flex>
    </Grid>
    </div>
  );
}
