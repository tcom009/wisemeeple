import { Flex, Grid, Text, Button, Box } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { createClient } from "@/utils/supabase/server";
import Menu from "./menu/Menu";
import NavSearchBar from "./NavSearchBar";
import KofiButton from "./KofiButton";
export default async function Navbar() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const getCatalogId = async () => {
    const result = await supabase
      .from("catalog")
      .select()
      .eq("user", data?.user?.id)
      .single();
    if (result.data) {
      return result.data.id;
    }
    if (result.error) {
      return null;
    }
  };

  const getProfile = async () => {
    const profile = await supabase
      .from("profiles")
      .select()
      .eq("profile_id", data?.user?.id)
      .single();
    if (profile.data) {
      return profile.data;
    }
    return null;
  };
  const catalogId = await getCatalogId();
  const profile = await getProfile();
  return (
    <Grid
      gap={"1"}
      position={"fixed"}
      top={"0"}
      left={"0"}
      className="black-background z-index-1"
      width={"100%"}
      columns={{ lg: "4", xl: "4", md: "4", sm: "2", initial: "2" }}
      rows={{ lg: "0", xl: "0", md: "0", sm: "2", initial: "2" }}
      height={{
        lg: "4em",
        xl: "4em",
        md: "4em",
        sm: "4.5em",
        initial: "4.5em",
      }}
    >
      <Box>
        <Link href={"/"} as={"/"} className="no-underline">
          <Flex
            width={"100%"}
            height={"100%"}
            justify={"center"}
            align={"center"}
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
      </Box>
      <Flex
        align={"center"}
        justify={"center"}
        direction={"row"}
        mt={{ initial: "1", xs: "1", sm: "1" }}
        p={{ initial: "1", xs: "1", sm: "1" }}
      >
        <NavSearchBar />
      </Flex>

      <Flex
        align={"center"}
        justify={{
          lg: "end",
          xl: "end",
          md: "end",
          sm: "center",
          initial: "center",
        }}
        direction={"row"}
      >
        {data?.user && !error ? (
          <>
            <Text
              size={{
                xl: "5",
                lg: "5",
                md: "1",
                sm: "1",
                xs: "1",
                initial: "1",
              }}
            >
              {profile ? `Hola, ${profile.first_name}` : "¡Hola!"}
            </Text>
            <Flex ml="2">
              <Menu profileId={data.user.id} catalogId={catalogId} />
            </Flex>
          </>
        ) : (
          <>
            <Link href={"/login"} className="no-underline">
              <Button
                size={{
                  xl: "2",
                  lg: "2",
                  md: "2",
                  sm: "2",
                  xs: "1",
                  initial: "1",
                }}
              >
                Vender juego
              </Button>
            </Link>
          </>
        )}
      </Flex>

      <Flex
        justify={{
          lg: "start",
          xl: "start",
          md: "start",
          sm: "center",
          initial: "center",
        }}
        align={"center"}
      >
        <KofiButton />
      </Flex>
    </Grid>
  );
}
