import { createClient } from "@/utils/supabase/server";
import { Container } from "@radix-ui/themes";
export default async function CatalogPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const response = await supabase
    .from("user_games")
    .select("*")
    .eq("owner_id", params.id);
  console.log(response.data);
  return (
    <Container size={{ lg: "3", md: "3", sm: "3", xs: "1" }}>
      <h1>Catalog Page</h1>
      <div>{JSON.stringify(response.data, null, 2)}</div>
    </Container>
  );
}
