import { Flex, Grid, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { createClient } from "@/utils/supabase/server";
import Menu from "./menu/Menu";
import NavSearchBar from "./NavSearchBar";
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
      position={"fixed"}
      top={"0"}
      left={"0"}
      className="black-background z-index-1"
      width={"100%"}
      columns={{ lg: "3", xl: "3", md: "3", sm: "3", initial: "2" }}
      rows={{ lg: "0", xl: "0", md: "0", sm: "0", initial: "1" }}
      height={"4em"}
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
      <Flex align={"center"} justify={"center"} direction={"row"} mt={{ xl: "0", lg: "0", md: "0", sm: "0", xs: "6", initial:"6"}}>
      <NavSearchBar />
      </Flex>
      <Flex align={"center"} justify={"center"} direction={"row"}>
        {data?.user && !error ? (
          <>
            <Text size={{ xl: "5", lg: "5", md: "1", sm: "1", xs: "1", initial:"1"}}>
              {profile ? `Hola, ${profile.first_name}` : "¡Hola!"}
            </Text>
            <Flex ml="2">
              <Menu profileId={data.user.id} catalogId={catalogId} />
            </Flex>
          </>
        ):(
        <>
        <Link href={"/login"} className="no-underline">
        <Button size={{ xl: "2", lg: "2", md: "2", sm: "2", xs: "1", initial:"1"}}>
          Vender juego 
        </Button>  
        </Link>
        </>
      )}
      </Flex>
    </Grid>
  );
}
