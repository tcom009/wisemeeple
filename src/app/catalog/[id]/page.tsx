import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function CatalogPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const response = await supabase.from("user_games").select("*").eq("owner_id", params.id);
  console.log(response.data);
  return (
    <div>
      <h1>Catalog Page</h1>
      <pre>{JSON.stringify(response.data, null, 2)}</pre>
    </div>
  );
}
