import { Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { createClient } from "@/utils/supabase/server";
import Menu from "./menu/Menu";
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
            {profile ? `Hola, ${profile.first_name}` : '¡Hola!'}
            <Flex ml="2">
              <Menu profileId={data.user.id} catalogId={catalogId} />
            </Flex>
            
          </>
        )}
      </Flex>
    </Grid>
  );
}
