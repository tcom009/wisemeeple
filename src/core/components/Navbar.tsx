import { Flex, Grid, Text, Button, Box } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { logout } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
export default async function Navbar() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <Grid
      position={"fixed"}
      top={"0"}
      left={"0"}
      className="black-background z-index-1"
      width={"100%"}
      columns={{ lg: "2", xl: "2", md: "2", sm: "2", initial: "2" }}
      height={"9"}
    >
      <Link href={"/"} as={"/"} className="no-underline">
        <Flex
          width={"100%"}
          height={"100%"}
          justify={"center"}
          align={"center"}
          ml={{ xl: "9", lg: "7", md: "5", sm: "5", xs: "5", initial: "0" }}
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

      <Flex
        align={"center"}
        justify={"center"}
        direction={{
          lg: "row",
          md: "row",
          sm: "row",
          xs: "row",
          initial: "column",
        }}
      >
        {data?.user && !error && (
          <>
            {/* <Flex align={"center"}>
              <Text size={"1"}>¡Hola, {data.user.email}!</Text>
            </Flex> */}
            <Grid gap="2" align={"center"}>
              <form>
                <Button
                  ml="1"
                  formAction={logout}
                  color={"red"}
                  variant="outline"
                  size={"1"}
                >
                  Cerrar sesion
                </Button>
              </form>
              <Link href={`/catalog/${data.user.id}`}>
                <Button variant="outline" size="1">
                  {" "}
                  Mi catálogo
                </Button>
              </Link>
            </Grid>
          </>
        )}
      </Flex>
    </Grid>
  );
}
